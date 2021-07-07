import { useCharacterModel } from 'models/Character/CharacterModelContext'
import { useMemo, useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core'
import { classesList } from 'models/Character/Class/classes'
import {
  CharacterClassName,
  CharacterClassNameDict,
} from 'common/types/base/character/CharacterClassName'
import { ClassIcon } from 'models/Character/Class/classIconMap'
import React from 'react'
import { Add, ExpandMore, Info as InfoIcon, Remove } from '@material-ui/icons'
import { CharacterClass, ClassModel } from 'models/Character/Class/Class'
import { SBox } from 'components/SBox'
import { FeatureItem } from 'pages/CharacterSettings/components/FeatureItem'
import { CharacterMockModel } from 'models/Character/CharacterModel'
import { useToggle } from 'react-use'
import { ClassFeatureModel } from 'models/Character/Feature/ClassFeature'
import { observer } from 'mobx-react-lite'
import { MAX_CHARACTER_LEVEL } from 'common/types/base/character/Level'
import { AbilitiesMap, AbilityTypeDict } from 'common/reference/AbilityType'
import { entries, mapValues } from 'common/utils/typesafe'
import { getMulticlassUnmetClaims } from 'models/Character/Class/getMulticlassUnmetClaims'
import { useIsMobile } from 'hooks/useIsMobile'

export const CharacterSettingsClassPage = observer(
  function CharacterSettingsClassPage() {
    const character = useCharacterModel()
    const refList = character.class.refList

    const [isSelectClass, toggleIsSelectClass] = useToggle(false)

    const isMobile = useIsMobile()

    if (!refList.length || isSelectClass) {
      return (
        <>
          <SBox my={3}>
            <Typography variant={'h5'}>Выбор класса</Typography>
          </SBox>
          {isSelectClass && (
            <SBox my={2}>
              <Button color={'primary'} onClick={() => toggleIsSelectClass()}>
                Отмена
              </Button>
            </SBox>
          )}
          <SelectClassList onSelect={() => toggleIsSelectClass(false)} />
        </>
      )
    } else {
      const unmetTextMap = mapValues(character.class.refMap, (type) => {
        const { multiclassUnmetClaimsMap } = character.class
        return getUnmetClaimsText(
          multiclassUnmetClaimsMap[type]?.base,
          multiclassUnmetClaimsMap[type]?.current,
        )
      })

      function renderClass(
        type: CharacterClassName,
        small?: boolean,
        text?: string,
      ) {
        return (
          <>
            <ClassIcon type={type} fontSize={small ? 'small' : 'large'} />
            <SBox mr={'auto'} ml={small ? 1 : 3}>
              <Typography
                variant={small ? 'h6' : 'h5'}
                color={unmetTextMap[type] ? 'error' : 'textPrimary'}
              >
                {CharacterClassNameDict[type]}
                {text}
              </Typography>
              {!small && unmetTextMap[type] && (
                <Typography variant={'caption'} color={'error'}>
                  {unmetTextMap[type]}
                </Typography>
              )}
            </SBox>
          </>
        )
      }

      return (
        <>
          <Typography variant={'h4'}>Классы</Typography>
          {refList.map(({ type }) => {
            const spellCastingChoice =
              character.class.spellCastingChoiceMap[type]
            return (
              <Paper key={type}>
                <SBox
                  display={'flex'}
                  alignItems={'center'}
                  style={{ width: '100%' }}
                  my={2}
                  p={isMobile ? 1 : 2}
                >
                  {renderClass(type)}
                  <IconButton
                    color={'secondary'}
                    onClick={(e) => {
                      e.stopPropagation()
                      character.actions.updateClassLevel({ type, to: 'down' })
                    }}
                  >
                    <Remove />
                  </IconButton>
                  <SBox mx={1}>
                    <Typography variant={'h5'}>
                      {character.class.levelMap[type]}{' '}
                      <Typography component={'span'} variant={'subtitle1'}>
                        ур.
                      </Typography>
                    </Typography>
                  </SBox>
                  <IconButton
                    color={'secondary'}
                    disabled={character.class.level >= MAX_CHARACTER_LEVEL}
                    onClick={(e) => {
                      e.stopPropagation()
                      character.actions.updateClassLevel({ type, to: 'up' })
                    }}
                  >
                    <Add />
                  </IconButton>
                </SBox>
                {spellCastingChoice && (
                  <Accordion>
                    <Badge
                      style={{ width: '100%', display: 'block' }}
                      color={'error'}
                      badgeContent={spellCastingChoice.choicesCount}
                      anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                    >
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant={'h6'}>Заклинания</Typography>
                      </AccordionSummary>
                    </Badge>
                    <AccordionDetails>
                      <div>{spellCastingChoice.node}</div>
                    </AccordionDetails>
                  </Accordion>
                )}
              </Paper>
            )
          })}
          <SBox my={2}>
            <Button
              color={'primary'}
              disabled={character.class.level >= MAX_CHARACTER_LEVEL}
              onClick={() => toggleIsSelectClass()}
            >
              Добавить класс
            </Button>
          </SBox>
          <Typography variant={'h4'}>Классовые умения</Typography>
          {character.class.levelFeaturesList.map(
            ({ level, type, features }, index) => (
              <SBox key={type + level} mt={3} mb={6}>
                <SBox
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  style={{ width: '100%' }}
                >
                  <Typography variant={'h6'} color={'primary'}>
                    {index + 1} уровень
                  </Typography>
                  {character.class.isMulticlass && (
                    <SBox display={'flex'} alignItems={'center'}>
                      {renderClass(type, true, ` ${level} ур.`)}
                    </SBox>
                  )}
                </SBox>
                {unmetTextMap[type] && (
                  <Typography variant={'subtitle1'} color={'error'}>
                    {unmetTextMap[type]}
                  </Typography>
                )}
                {features.map((feature) => (
                  <SBox my={2} key={feature.key}>
                    <FeatureItem feature={feature} />
                  </SBox>
                ))}
                {!unmetTextMap[type] && !features.length && (
                  <Typography variant={'subtitle1'}>Нет умений</Typography>
                )}
              </SBox>
            ),
          )}
        </>
      )
    }
  },
)

const SelectClassList = observer(function SelectClassList({
  onSelect,
}: {
  onSelect?: () => void
}) {
  const character = useCharacterModel()
  const refMap = character.class.refMap

  const baseClaims = useMemo(
    () =>
      character.class.isEmpty
        ? undefined
        : getMulticlassUnmetClaims(
            character.class.effectMap.ability.abilities,
            ...character.class.refList.map(
              ({ multiclass: { requirements } }) => requirements,
            ),
          ),
    [
      character.class.effectMap.ability.abilities,
      character.class.isEmpty,
      character.class.refList,
    ],
  )

  const [classInfo, setClassInfo] = useState<CharacterClass | undefined>()

  function selectClass(type: CharacterClassName) {
    if (refMap[type]) {
      return
    }
    character.actions.setClass({ type })
    onSelect?.()
  }

  const classInfoModel = useMemo(
    () =>
      new ClassModel(
        new CharacterMockModel({
          classes: classInfo?.type
            ? {
                [classInfo.type]: {
                  type: classInfo?.type,
                  level: Array(20).fill(0),
                },
              }
            : undefined,
        }),
      ),
    [classInfo?.type],
  )

  const classInfoFeaturesMap = classInfoModel.featuresMap

  return (
    <>
      <List>
        {classesList.map((classItem) => {
          const { type, multiclass } = classItem
          const isSelected = !!refMap[type]
          const classClaims = character.class.isEmpty
            ? undefined
            : getMulticlassUnmetClaims(
                character.class.effectMap.ability.abilities,
                multiclass.requirements,
              )

          return (
            <ListItem
              key={type}
              button
              disabled={Boolean(isSelected || baseClaims || classClaims)}
              onClick={() => selectClass(type)}
            >
              <ListItemAvatar>
                <ClassIcon type={type} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant={'h6'}>
                    {CharacterClassNameDict[type]}
                  </Typography>
                }
                secondary={
                  isSelected
                    ? 'Выбран'
                    : getUnmetClaimsText(baseClaims, classClaims)
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge={'end'}
                  onClick={() => setClassInfo(classItem)}
                >
                  <InfoIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )
        })}
      </List>
      <Dialog
        open={!!classInfo}
        onClose={() => setClassInfo(undefined)}
        fullWidth
        maxWidth={'md'}
        fullScreen={useIsMobile()}
      >
        {classInfo && (
          <>
            <DialogTitle>
              <SBox display={'flex'} alignItems={'center'}>
                <SBox mr={2}>
                  <ClassIcon type={classInfo.type} height={32} />
                </SBox>
                <div>{CharacterClassNameDict[classInfo.type]}</div>
              </SBox>
            </DialogTitle>
            <DialogContent>
              <ClassFeatures
                features={classInfoFeaturesMap[classInfo.type]}
                noChoices
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setClassInfo(undefined)
                }}
              >
                Закрыть
              </Button>
              <Button
                color={'primary'}
                onClick={() => {
                  selectClass(classInfo.type)
                  setClassInfo(undefined)
                }}
              >
                Выбрать
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  )
})

const ClassFeatures = observer(function ClassFeatures({
  features,
  noChoices,
}: {
  features: ClassFeatureModel[] | undefined
  noChoices?: boolean
}) {
  let level = 0

  return (
    <Grid container direction={'column'} spacing={2}>
      {features?.map((feature, key) => {
        let content
        if (feature.level !== level) {
          level = feature.level
          content = (
            <Grid item>
              <Typography variant={'h5'} color={'primary'}>
                {level} уровень
              </Typography>
            </Grid>
          )
        }
        return (
          <React.Fragment key={key}>
            {content}
            <FeatureItem
              feature={noChoices ? feature.data : feature}
              key={key}
            />
          </React.Fragment>
        )
      })}
    </Grid>
  )
})

function getUnmetClaimsText(
  baseClaims: Partial<AbilitiesMap>[] | undefined,
  classClaims: Partial<AbilitiesMap>[] | undefined,
) {
  if (!baseClaims && !classClaims) return undefined

  const text = baseClaims
    ? 'Не выполнены требования основного класса: '
    : 'Не выполнены требования для этого класса: '
  return (
    text +
    (baseClaims || classClaims || [])
      .map((claim) =>
        entries(claim)
          .map(([ability, value]) => `${AbilityTypeDict[ability]} ${value}`)
          .join(' и '),
      )
      .join(' или ')
  )
}
