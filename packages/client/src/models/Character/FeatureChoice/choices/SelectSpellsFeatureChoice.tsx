import { DeepReadonly } from 'ts-essentials'
import * as t from 'io-ts'
import { BaseFeatureChoiceModel } from 'models/Character/FeatureChoice/BaseFeatureChoice'
import { computed } from 'mobx'
import { createKey } from 'models/utils/createKey'
import React, { useEffect, useMemo, useState } from 'react'
import { Spell, SpellLevel } from 'models/Character/Spell/Spell'
import { spells } from 'models/Character/Spell/spells'
import { SpellCastingEffectModel } from 'models/Character/Effect/effects/SpellCastingEffect'
import { CharacterClassName } from 'common/types/base/character/CharacterClassName'
import { differenceBy, find, intersectionBy } from 'lodash-es'
import { useFuse } from 'hooks/useFuse'
import { useToggle } from 'react-use'
import { SBox } from 'components/SBox'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core'
import { SpellItem } from 'components/SpellItem'
import { DangerButton } from 'components/DangerButton'
import { useIsMobile } from 'hooks/useIsMobile'
import { Search } from '@material-ui/icons'

export type SelectSpellsFeatureChoice = DeepReadonly<{
  type: 'selectSpells'
  classType: CharacterClassName
  classOnly: boolean
  maxNumber: number
  maxCantripsNumber?: number
  variant: 'catrips' | 'spells' | 'all'
  maxLevel?: SpellLevel
}>

const SelectFeatureChoiceState = t.readonly(
  t.partial({
    cantrips: t.readonlyArray(t.readonly(t.unknown)),
    spells: t.readonlyArray(t.readonly(t.unknown)),
  }),
)

export class SelectSpellsFeatureChoiceModel extends BaseFeatureChoiceModel<
  SelectSpellsFeatureChoice,
  t.TypeOf<typeof SelectFeatureChoiceState>
> {
  @computed
  get knownState() {
    return SelectFeatureChoiceState.is(this.state) ? this.state : null
  }

  @computed
  get cantrips() {
    return (
      this.knownState?.cantrips
        ?.flatMap((id) => spells.find((spell) => spell.id === id) || [])
        .slice(0, this.ref.maxCantripsNumber ?? this.ref.maxNumber) || []
    )
  }

  @computed
  get spells() {
    return (
      this.knownState?.spells
        ?.flatMap((id) => spells.find((spell) => spell.id === id) || [])
        .slice(0, this.ref.maxNumber) || []
    )
  }

  @computed
  get selectedSpells() {
    return [...this.cantrips, ...this.spells]
  }

  @computed
  get selectedSpellIds() {
    return this.selectedSpells.map(({ id }) => id)
  }

  @computed
  get choicesCount() {
    return Math.max(
      0,
      this.ref.maxNumber +
        (this.ref.maxCantripsNumber || 0) -
        this.cantrips.length -
        this.spells.length,
    )
  }

  @computed
  protected get choiceEffects() {
    return [
      new SpellCastingEffectModel(
        this.characterModel,
        {
          type: 'spellCasting',
          preparedSpellsClassMap: {
            [this.ref.classType]: this.selectedSpellIds,
          },
        },
        createKey(this.key, 'spellCasting'),
      ),
    ]
  }

  handleChange = (spells: Spell[]) => {
    const cantripIds = spells
      .filter((spell) => spell.level === 0)
      .map(({ id }) => id)

    const spellIds = spells
      .filter((spell) => spell.level !== 0)
      .map(({ id }) => id)

    this.setChoiceAction({
      key: this.key,
      value: {
        cantrips: cantripIds,
        spells: spellIds,
      },
    })
  }

  @computed
  get disabledSpells() {
    return this.characterModel.effects.spellCasting.preparedSpells.map(
      ({ spell }) => spell,
    )
  }

  @computed
  get node() {
    return (
      <SpellsSelect
        maxNumber={this.ref.maxNumber}
        maxCantripsNumber={this.ref.maxCantripsNumber}
        variant={this.ref.variant}
        maxLevel={this.ref.maxLevel}
        classType={this.ref.classOnly ? this.ref.classType : undefined}
        selectedSpells={this.selectedSpells}
        onChange={this.handleChange}
        disabledSpells={this.disabledSpells}
        selectInPopup
      />
    )
  }
}

export function SpellsSelect(props: {
  disabledSpells?: Spell[]
  selectedSpells: Spell[]
  onChange(spells: Spell[]): void
  classType?: CharacterClassName
  maxNumber: number
  maxCantripsNumber?: number
  variant: 'catrips' | 'spells' | 'all'
  maxLevel?: SpellLevel
  selectInPopup?: boolean
}) {
  const {
    disabledSpells = [],
    selectedSpells,
    onChange,
    classType,
    maxNumber,
    maxCantripsNumber,
    variant,
    maxLevel = 9,
    selectInPopup,
  } = props

  const MAX_VISIBLE_SPELLS = 50

  const isMobile = useIsMobile()

  const selectedMinLevel = variant === 'spells' ? 1 : 0
  const selectedMaxLevel = Math.min(
    maxLevel,
    variant === 'catrips' ? selectedMinLevel : maxLevel,
  )
  const allSpells = useMemo(
    () =>
      spells.filter(
        (spell) =>
          spell.level <= selectedMaxLevel &&
          spell.level >= selectedMinLevel &&
          (!classType || spell.classes.includes(classType)),
      ),
    [classType, selectedMaxLevel, selectedMinLevel],
  )

  const selected = useMemo(
    () => intersectionBy(allSpells, selectedSpells, 'id'),
    [allSpells, selectedSpells],
  )

  const isSeparateCantrips =
    variant === 'all' && typeof maxCantripsNumber === 'number'

  const sCantrips = useMemo(
    () =>
      isSeparateCantrips
        ? selected
            .filter(({ level }) => level === 0)
            .slice(0, maxCantripsNumber)
        : [],
    [isSeparateCantrips, maxCantripsNumber, selected],
  )

  const sSpells = useMemo(
    () =>
      isSeparateCantrips
        ? selected.filter(({ level }) => level !== 0).slice(0, maxNumber)
        : selected.slice(0, maxNumber),
    [isSeparateCantrips, maxNumber, selected],
  )

  const canPickCantrips =
    variant === 'all' && typeof maxCantripsNumber === 'number'
      ? sCantrips.length < maxCantripsNumber
      : sSpells.length < maxNumber

  const canPick = canPickCantrips || sSpells.length < maxNumber

  const availableMinLevel = Math.max(selectedMinLevel, canPickCantrips ? 0 : 1)
  const availableMaxLevel = Math.min(
    selectedMaxLevel,
    sSpells.length >= maxNumber ? (canPickCantrips ? 0 : -1) : selectedMaxLevel,
  )
  const availableLevels = Math.max(0, availableMaxLevel - availableMinLevel + 1)
  const [filterByLevel, setFilterByLevel] = useState<number | undefined>()
  const levelFilter =
    typeof filterByLevel === 'number' &&
    filterByLevel >= availableMinLevel &&
    filterByLevel <= availableMaxLevel
      ? filterByLevel
      : undefined

  const filteredSpells = useMemo(
    () =>
      allSpells.filter((spell) =>
        typeof levelFilter === 'number'
          ? spell.level === levelFilter
          : spell.level <= availableMaxLevel &&
            spell.level >= availableMinLevel,
      ),
    [allSpells, availableMaxLevel, availableMinLevel, levelFilter],
  )

  const available = useMemo(
    () =>
      differenceBy(filteredSpells, selectedSpells, 'id').slice(
        0,
        typeof levelFilter === 'number' ? undefined : MAX_VISIBLE_SPELLS,
      ),
    [filteredSpells, levelFilter, selectedSpells],
  )

  const { result, search, term } = useFuse(available, {
    keys: [
      { name: 'name', weight: 1 },
      { name: 'nameEn', weight: 1 },
      { name: 'description', weight: 0.5 },
    ],
  })

  const [isOpen, toggleIsOpen] = useToggle(false)
  useEffect(() => {
    if (isOpen && !available.length) {
      toggleIsOpen(false)
    }
  }, [available.length, isOpen, toggleIsOpen])

  return (
    <>
      {isSeparateCantrips && !!maxCantripsNumber && (
        <SBox mb={1}>
          <Typography>
            Заговоры: {sCantrips.length} / {maxCantripsNumber}
          </Typography>
        </SBox>
      )}
      <SBox mb={1}>
        <Typography>
          Заклинания{' '}
          <Typography component={'span'} variant={'subtitle2'}>
            ({maxLevel > 1 && '1 - '}
            {maxLevel} уровень)
          </Typography>
          : {sSpells.length} / {maxNumber}
        </Typography>
      </SBox>
      {selected.length > 0 && (
        <SBox>
          <Typography variant={'h6'}>Подготовленные заклинания:</Typography>
          {selected.map((spell) => (
            <SBox mt={1} key={spell.id}>
              <SpellItem
                spell={spell}
                summary={
                  <Button
                    onClick={() =>
                      onChange(differenceBy(selected, [spell], 'id'))
                    }
                  >
                    удалить
                  </Button>
                }
              />
            </SBox>
          ))}
        </SBox>
      )}
      {canPick && selectInPopup && (
        <SBox mt={2}>
          <DangerButton variant={'outlined'} onClick={toggleIsOpen}>
            Выбрать заклинания
          </DangerButton>
        </SBox>
      )}
      <Dialog
        open={isOpen}
        onClose={() => toggleIsOpen(false)}
        fullWidth
        maxWidth={'md'}
        fullScreen={isMobile}
      >
        <DialogTitle>Выбор заклинаний</DialogTitle>
        <DialogContent>
          <SBox pb={6}>
            <SpellsSelect {...props} selectInPopup={false} />
          </SBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => toggleIsOpen(false)}>Закрыть</Button>
        </DialogActions>
      </Dialog>
      {canPick && !selectInPopup && (
        <>
          <SBox mt={4} mb={1}>
            <Typography variant={'h6'}>Доступные заклинания:</Typography>
          </SBox>
          <SBox mb={1}>
            <TextField
              fullWidth
              variant={'outlined'}
              onChange={(e) => search(e.target.value)}
              value={term}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </SBox>
          <SBox
            mb={2}
            display={'flex'}
            alignItems={'center'}
            flexWrap={'wrap'}
            gap={2}
          >
            {[...Array(availableLevels)].map((_, index) => {
              const level = availableMinLevel + index
              const isActive = levelFilter === level
              return (
                <Button
                  key={level}
                  color={isActive ? 'primary' : 'default'}
                  variant={'contained'}
                  size={isMobile ? 'small' : 'medium'}
                  onClick={() => setFilterByLevel(isActive ? undefined : level)}
                >
                  {level === 0 ? '-0-' : `${level} ур.`}
                </Button>
              )
            })}
          </SBox>
          {result.length === 0 && (
            <Typography variant={'h6'}>Ничего не найдено</Typography>
          )}
          {result.map((spell) => {
            const isDisabled = Boolean(find(disabledSpells, { id: spell.id }))
            return (
              <SBox mt={1} key={spell.id}>
                <SpellItem
                  spell={spell}
                  summary={
                    <Button
                      color={'primary'}
                      disabled={isDisabled}
                      onClick={() => onChange([...selected, spell])}
                    >
                      {isDisabled ? 'есть' : 'добавить'}
                    </Button>
                  }
                />
              </SBox>
            )
          })}
        </>
      )}
    </>
  )
}
