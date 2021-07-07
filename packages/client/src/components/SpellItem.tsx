import { Spell, SpellArea } from 'models/Character/Spell/Spell'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Typography,
} from '@material-ui/core'
import {
  MagicSchool,
  MagicSchoolDict,
} from 'common/types/base/spell/MagicSchool'
import { SvgIconProps } from '@material-ui/core/SvgIcon'
import { ReactElement, ReactNode } from 'react'
import {
  ClassesNecromancer,
  GameUiQuestScroll,
  ItemCrystal,
  SkillControl,
  SkillMagicFireWall,
  SkillMagicIce,
  SkillShieldTripple,
  SkillVision,
} from 'components/DndIcons'
import { SBox } from 'components/SBox'
import { ReactComponent as ConcentrationIcon } from 'images/concentration.svg'
import { ReactComponent as RitualIcon } from 'images/ritual.svg'
import { ExpandMore } from '@material-ui/icons'
import { CastDuration, SpellDuration } from 'common/types/base/Duration'
import { declOfNum } from 'utils/declOfNum'
import { CharacterClassNameDict } from 'common/types/base/character/CharacterClassName'
import { Markdown } from 'components/Markdown'
import styled from 'styled-components'
import theme from 'theme'
import { useIsMobile } from 'hooks/useIsMobile'
import { stopPropagation } from 'utils/events'

export const magicSchoolIconMap: Record<
  MagicSchool,
  (props: SvgIconProps) => ReactElement
> = {
  evocation: SkillMagicFireWall,
  conjuration: SkillMagicIce,
  illusion: SkillVision,
  necromancy: ClassesNecromancer,
  abjuration: SkillShieldTripple,
  enchantment: SkillControl,
  transmutation: ItemCrystal,
  divination: GameUiQuestScroll,
}

function getDurationText(
  duration: SpellDuration | CastDuration,
  genetive?: boolean,
): string {
  switch (duration.type) {
    case 'action':
      return '1 действие'
    case 'bonusAction':
      return '1 бонусное действие'
    case 'reaction':
      return `1 реакция, совершаемая вами, ${duration.to}`
    case 'special':
      return duration.text
    case 'round':
      return declOfNum(
        duration.value,
        genetive
          ? ['раундов', 'раунда', 'раундов']
          : ['раундов', 'раунд', 'раунда'],
      )
    case 'minute':
      return declOfNum(
        duration.value,
        genetive ? ['минут', 'минуты', 'минут'] : ['минут', 'минута', 'минуты'],
      )
    case 'hour':
      return declOfNum(
        duration.value,
        genetive ? ['часов', 'часа', 'часов'] : ['часов', 'час', 'часа'],
      )
    case 'day':
      return declOfNum(
        duration.value,
        genetive ? ['дней', 'дня', 'дней'] : ['дней', 'день', 'дня'],
      )
    default:
      // eslint-disable-next-line unused-imports/no-unused-vars-ts
      const guard: never = duration
      return ''
  }
}

function getAreaText(area: SpellArea) {
  if (area.type === 'squareFeet') {
    return `${area.size} кв. фт.`
  } else {
    return `${area.size} фт. ${
      {
        line: 'линия',
        cone: 'конус',
        cube: 'куб',
        sphere: 'сфера',
        cylinder: 'цилиндр',
        square: 'квадрат',
        squareFeet: '',
      }[area.type]
    }`
  }
}

const SIcon = styled.svg`
  height: 46px;
  width: 46px;
  object-fit: contain;

  ${theme.breakpoints.down('sm')} {
    height: 32px;
    width: 32px;
  }
`

const SInfoIcon = styled.svg`
  height: 16px;
  width: auto;
  margin-left: ${theme.spacing(0.5)}px;
`

export function SpellItem({
  spell,
  summary,
}: {
  spell: Spell
  summary?: ReactNode
}) {
  const Icon = magicSchoolIconMap[spell.school]

  const levelText = spell.level === 0 ? 'Заговор' : `${spell.level} уровень`

  const isMobile = useIsMobile()

  const summaryProps = {
    onFocus: stopPropagation,
    onClick: stopPropagation,
    display: 'flex',
    alignItems: 'center',
  }

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <SBox display={'flex'} alignItems={'center'} flexGrow={1}>
          <SIcon as={Icon} titleAccess={MagicSchoolDict[spell.school]} />
          <SBox ml={2} mr={'auto'} flexGrow={1}>
            <SBox display={'flex'} alignItems={'center'}>
              <Typography variant={'h6'}>{spell.name}</Typography>
              {spell.concentration && (
                <SInfoIcon title={'Концентрация'} as={ConcentrationIcon} />
              )}
              {spell.ritual && <SInfoIcon title={'Ритуал'} as={RitualIcon} />}
            </SBox>
            <Typography variant={'caption'}>
              {levelText}
              {spell.concentration && ' • концентрация'}
              {spell.needComponents &&
                !spell.consumeComponents &&
                ' • обязательные компоненты'}
              {spell.consumeComponents && '  компоненты расходуются'}
            </Typography>
            {isMobile && summary && (
              <SBox {...summaryProps} justifyContent={'flex-end'}>
                {summary}
              </SBox>
            )}
          </SBox>
          {!isMobile && summary && (
            <SBox {...summaryProps} ml={1}>
              {summary}
            </SBox>
          )}
        </SBox>
      </AccordionSummary>
      <AccordionDetails>
        <div>
          <Typography>
            <i>
              {levelText}, {MagicSchoolDict[spell.school]}
            </i>
          </Typography>
          <SBox my={1}>
            <Divider />
          </SBox>
          <Typography>
            <b>Время накладывания: </b>
            {getDurationText(spell.castTime)}
            {spell.ritual && ' (ритуал)'}
          </Typography>
          <Typography>
            <b>Дистанция: </b>
            {spell.spellRange
              ? declOfNum(spell.spellRange, ['футов', 'фут', 'фута'])
              : spell.target?.type === 'self'
              ? 'На себя'
              : 'Касание'}
          </Typography>
          {spell.area && (
            <Typography>
              <b>Площадь: </b>
              {getAreaText(spell.area)}
            </Typography>
          )}
          <Typography>
            <b>Компоненты: </b>
            {[spell.verbal && 'В', spell.somatic && 'С', spell.material && 'М']
              .filter(Boolean)
              .join(', ')}
            {spell.components && (
              <Typography component={'span'} variant={'caption'}>
                {' '}
                ({spell.components})
              </Typography>
            )}
          </Typography>
          <Typography>
            <b>Длительность: </b>
            {spell.duration
              ? spell.concentration
                ? `Концентрация, вплоть до ${getDurationText(
                    spell.duration,
                    true,
                  )}`
                : getDurationText(spell.duration)
              : 'Мгновенная'}
          </Typography>
          <Typography>
            <b>Классы: </b>
            {spell.classes
              .map((name) => CharacterClassNameDict[name])
              .join(', ')
              .toLowerCase()}
          </Typography>
          <Typography>
            <b>Источник: </b>
            {spell.source}
          </Typography>
          <SBox my={1}>
            <Divider />
          </SBox>
          <Typography>
            <Markdown>{spell.description}</Markdown>
          </Typography>
        </div>
      </AccordionDetails>
    </Accordion>
  )
}
