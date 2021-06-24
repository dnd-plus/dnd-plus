import { useCharacterModel } from 'models/Character/CharacterModelContext'
import { useMemo, useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
  Typography,
  useMediaQuery,
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
import { useTheme } from 'styled-components'
import { FeatureItem } from 'pages/CharacterSettings/components/FeatureItem'
import { CharacterModel } from 'models/Character/CharacterModel'
import { useToggle } from 'react-use'
import { ClassFeatureModel } from 'models/Character/Feature/ClassFeature'
import { observer } from 'mobx-react-lite'
import { MAX_CHARACTER_LEVEL } from 'common/types/base/character/Level'

export const CharacterSettingsClassPage = observer(
  function CharacterSettingsClassPage() {
    const character = useCharacterModel()
    const refList = character.class.refList

    const [isSelectClass, toggleIsSelectClass] = useToggle(false)

    if (!refList.length || isSelectClass) {
      return (
        <>
          <SBox my={3}>
            <Typography variant={'h5'}>Выбор класса</Typography>
          </SBox>
          {isSelectClass && (
            <SBox my={2}>
              <Button onClick={() => toggleIsSelectClass()}>Отмена</Button>
            </SBox>
          )}
          <SelectClassList onSelect={() => toggleIsSelectClass(false)} />
        </>
      )
    } else {
      return (
        <>
          <SBox mb={2}>
            <Button
              disabled={character.class.level >= MAX_CHARACTER_LEVEL}
              onClick={() => toggleIsSelectClass()}
            >
              Добавить класс
            </Button>
          </SBox>
          {refList.map(({ type }) => (
            <ClassItem type={type} key={type} />
          ))}
        </>
      )
    }
  },
)

const ClassItem = observer(function ClassItem({
  type,
}: {
  type: CharacterClassName
}) {
  const character = useCharacterModel()
  const data = character.class.dataMap[type]

  if (!data) return null

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <SBox
          display={'flex'}
          alignItems={'center'}
          style={{ width: '100%' }}
          onFocus={(e) => e.stopPropagation()}
        >
          <ClassIcon type={type} fontSize={'large'} />
          &nbsp;&nbsp;&nbsp;
          <Typography variant={'h5'}>{CharacterClassNameDict[type]}</Typography>
          <SBox ml={'auto'}>&nbsp;</SBox>
          <IconButton
            onClick={(e) => {
              e.stopPropagation()
              character.actions.updateClassLevel({ type, to: 'down' })
            }}
          >
            <Remove />
          </IconButton>
          <SBox mx={1}>
            <Typography variant={'h5'}>
              {data.level}{' '}
              <Typography component={'span'} variant={'subtitle1'}>
                ур.
              </Typography>
            </Typography>
          </SBox>
          <IconButton
            disabled={character.class.level >= MAX_CHARACTER_LEVEL}
            onClick={(e) => {
              e.stopPropagation()
              character.actions.updateClassLevel({ type, to: 'up' })
            }}
          >
            <Add />
          </IconButton>
        </SBox>
      </AccordionSummary>
      <AccordionDetails>
        <ClassFeatures features={character.class.featuresMap[type]} />
      </AccordionDetails>
    </Accordion>
  )
})

const SelectClassList = observer(function SelectClassList({
  onSelect,
}: {
  onSelect?: () => void
}) {
  const character = useCharacterModel()
  // const refList = character.class.refList
  const refMap = character.class.refMap
  // const abilityEffect = character.effects.ability

  // const isMulticlass = refList.length > 0
  //
  // const baseRequirements = useMemo(
  //   () =>
  //     getMulticlassDispleasedRequirements(
  //       abilityEffect.abilities,
  //       ...refList.map(({ multiclass: { requirements } }) => requirements),
  //     ),
  //   [abilityEffect.abilities, refList],
  // )

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
        new CharacterModel({
          ...character.state,
          classes: {
            [classInfo?.type || '']: {
              type: classInfo?.type,
              level: Array(20).fill(0),
            },
          },
        }),
      ),
    [character.state, classInfo?.type],
  )

  const classInfoFeaturesMap = classInfoModel.featuresMap

  return (
    <>
      <List>
        {classesList.map((classItem) => {
          const { type } = classItem
          return (
            <ListItem
              key={type}
              button
              disabled={!!refMap[type]}
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
        fullScreen={useMediaQuery(useTheme().breakpoints.down('sm'))}
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

// function getMulticlassDispleasedRequirements(
//   abilityMap: Partial<AbilitiesMap>,
//   ...requirementsList: DeepReadonly<Partial<AbilitiesMap>[]>[]
// ) {
//   for (const requirements of requirementsList) {
//     let displeased: Partial<AbilitiesMap> | undefined
//
//     const isSatisfied = requirements.some((requirement) => {
//       let currentDispleased: Partial<AbilitiesMap> | undefined
//
//       ABILITY_TYPES.forEach((ability) => {
//         if (Number(requirement[ability]) < Number(abilityMap[ability])) {
//           currentDispleased = {
//             ...currentDispleased,
//             [ability]: Number(requirement[ability]),
//           }
//         }
//       })
//
//       if (currentDispleased) {
//         displeased = currentDispleased
//         return false
//       }
//       return true
//     })
//
//     if (!isSatisfied) {
//       return displeased
//     }
//   }
// }
