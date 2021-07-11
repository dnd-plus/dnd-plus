import * as t from 'io-ts'
import React from 'react'
import { DeepReadonly } from 'ts-essentials'
import { BaseFeatureChoiceModel } from 'models/Character/FeatureChoice/BaseFeatureChoice'
import { createKey } from 'models/utils/createKey'

import { feats } from 'models/Character/Feat/feats'
import { useToggle } from 'react-use'
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core'
import { checkFeatConditions, Feat } from 'models/Character/Feat/Feat'
import { AddCircleOutline, CheckCircle, ErrorOutline } from '@material-ui/icons'
import { Markdown } from 'components/Markdown'
import { SBox } from 'components/SBox'

import {
  featureChoiceFactory,
  FeatureChoiceModel,
} from 'models/Character/FeatureChoice/FeatureChoice'
import { FeatEffectModel } from '../../Effect/effects/FeatEffect'
import { observer } from 'mobx-react-lite'
import { computed } from 'mobx'
import { CharacterRace } from 'models/Character/Race/Race'
import { EffectModelTypeMap } from 'models/Character/Effect/Effect'
import { useIsMobile } from 'hooks/useIsMobile'
import { DangerButton } from 'components/DangerButton'

export type SelectFeatFeatureChoice = DeepReadonly<{
  type: 'selectFeat'
}>
const SelectFeatFeatureChoiceState = t.intersection([
  t.readonly(
    t.type({
      selected: t.number,
    }),
  ),
  t.readonly(
    t.partial({
      choices: t.readonly(t.record(t.string, t.readonly(t.unknown))),
    }),
  ),
])

export class SelectFeatFeatureChoiceModel extends BaseFeatureChoiceModel<
  SelectFeatFeatureChoice,
  t.TypeOf<typeof SelectFeatFeatureChoiceState>
> {
  @computed
  get knownState() {
    return SelectFeatFeatureChoiceState.is(this.state) ? this.state : null
  }

  @computed
  get selected() {
    return (
      (this.knownState &&
        feats.find(({ id }) => id === this.knownState?.selected)) ||
      null
    )
  }

  @computed
  get checkOptions() {
    return {
      abilityEffect: this.currentEffectMap.ability,
      equipmentPossessionEffect: this.currentEffectMap.equipmentPossession,
      spellCastingEffect: this.currentEffectMap.spellCasting,
      raceRef: this.characterModel.race.ref,
    }
  }

  @computed
  get choiceModels(): FeatureChoiceModel[] {
    const state = this.knownState
    const selected = this.selected

    if (state && selected?.choices) {
      return selected.choices.flatMap(
        (choice, index) =>
          featureChoiceFactory(
            this.characterModel,
            (this.state as any)?.choices?.[index],
            choice,
            createKey(this.key, selected.id, index),
            ({ value }) =>
              this.setState({
                ...state,
                choices: {
                  ...state?.choices,
                  [index]: value,
                },
              }),
          ) || [],
      )
    }
    return []
  }

  @computed
  protected get choiceEffects() {
    return [
      new FeatEffectModel(
        this.characterModel,
        {
          type: 'feat',
          feats: this.selected
            ? [{ id: this.selected.id, choices: (this.state as any)?.choices }]
            : [],
        },
        createKey(this.key, this.knownState?.selected),
      ),
    ]
  }

  @computed
  get isAvailable() {
    return (
      this.selected && checkFeatConditions(this.selected, this.checkOptions)
    )
  }

  @computed
  get innerChoicesCount() {
    return this.choiceModels.reduce(
      (sum, { choicesCount }) => sum + choicesCount,
      0,
    )
  }

  @computed
  get choicesCount() {
    return (this.isAvailable ? 0 : 1) + this.innerChoicesCount
  }

  @computed
  get node() {
    return <SelectFeat model={this} />
  }
}

const SelectFeat = observer(
  ({ model }: { model: SelectFeatFeatureChoiceModel }) => {
    const [isOpen, toggleIsOpen] = useToggle(false)

    return (
      <>
        {model.selected && (
          <Card>
            <CardContent>
              <Typography gutterBottom variant={'h5'}>
                {model.selected.name}
              </Typography>
              <SBox mb={1}>
                <Markdown>{model.selected.description}</Markdown>
              </SBox>
              {!model.isAvailable && (
                <SBox color={'error.dark'}>
                  <Typography variant={'h6'}>Не выполнено условие:</Typography>
                  <Typography variant={'body1'}>
                    {model.selected.demands?.text}
                  </Typography>
                </SBox>
              )}
              {!!model.choiceModels.length && (
                <SBox mt={1}>
                  {model.choiceModels.map(({ node }, key) => (
                    <React.Fragment key={key}>{node}</React.Fragment>
                  ))}
                </SBox>
              )}
            </CardContent>
            <CardActions>
              <Button
                color={model.isAvailable ? 'default' : 'primary'}
                onClick={toggleIsOpen}
              >
                Сменить
              </Button>
            </CardActions>
          </Card>
        )}
        {!model.selected && (
          <DangerButton
            variant={'outlined'}
            color={'inherit'}
            onClick={toggleIsOpen}
          >
            Выбрать черту
          </DangerButton>
        )}
        <FeatsListModal
          open={isOpen}
          value={model.selected}
          onClose={() => toggleIsOpen()}
          onChange={(feat) => model.setState({ selected: feat.id })}
          effectMap={model.currentEffectMap}
          raceRef={model.characterModel.race.ref}
        />
      </>
    )
  },
)

const FeatsListModal = observer(function FeatsListModal<F extends () => void>({
  open,
  onClose,
  onChange,
  value,
  effectMap,
  raceRef,
}: {
  open: boolean
  onClose: F
  onChange: (f: Feat) => void
  value: Feat | null
  effectMap: EffectModelTypeMap
  raceRef: CharacterRace | undefined
}) {
  const featEffect = effectMap.feat
  const abilityEffect = effectMap.ability
  const equipmentPossessionEffect = effectMap.equipmentPossession
  const spellCastingEffect = effectMap.spellCasting

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={'md'}
      fullScreen={useIsMobile()}
    >
      <DialogTitle>Выбор черты</DialogTitle>
      <DialogContent>
        {feats
          .map((feat) => {
            const available = checkFeatConditions(feat, {
              abilityEffect,
              equipmentPossessionEffect,
              spellCastingEffect,
              raceRef,
            })
            const selected = available && feat.id === value?.id
            const active =
              (available && featEffect.featIds.includes(feat.id)) || selected

            return { ...feat, active, available, selected }
          })
          .sort((a, b) => {
            if (a.selected !== b.selected) return +b.selected - +a.selected
            if (a.available !== b.available) return +b.available - +a.available
            return 0
          })
          .map((feat) => {
            return (
              <Accordion key={feat.id}>
                <AccordionSummary>
                  <Grid container alignItems={'center'} wrap={'nowrap'}>
                    <SBox
                      display={'inline-flex'}
                      color={
                        feat.selected
                          ? 'primary.main'
                          : feat.active
                          ? 'success.main'
                          : feat.available
                          ? 'text.main'
                          : 'error.dark'
                      }
                      mr={1}
                    >
                      {React.createElement(
                        feat.active
                          ? CheckCircle
                          : feat.available
                          ? AddCircleOutline
                          : ErrorOutline,
                        { fontSize: 'small', color: 'inherit' },
                      )}
                    </SBox>
                    <Grid
                      item
                      xs={'auto'}
                      container
                      alignItems={'center'}
                      justify={'space-between'}
                    >
                      <Grid item xs={12} md={'auto'}>
                        <Typography variant={'body1'}>{feat.name}</Typography>
                      </Grid>
                      {feat.demands?.text && (
                        <Grid item xs={12} md={'auto'}>
                          <SBox
                            color={
                              feat.available ? 'text.secondary' : 'error.dark'
                            }
                          >
                            Требование: {feat.demands?.text}
                          </SBox>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <Markdown>{feat.description}</Markdown>
                </AccordionDetails>
                {feat.available && !feat.active && (
                  <>
                    <Divider />
                    <AccordionActions>
                      <Button
                        color={'primary'}
                        onClick={() => {
                          onChange(feat)
                          onClose()
                        }}
                      >
                        Выбрать
                      </Button>
                    </AccordionActions>
                  </>
                )}
              </Accordion>
            )
          })}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Закрыть</Button>
      </DialogActions>
    </Dialog>
  )
})
