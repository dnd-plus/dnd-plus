import { Spell, SpellArea } from 'models/Character/Spell/Spell'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Divider,
  Typography,
} from '@material-ui/core'
import {
  MagicSchool,
  MagicSchoolDict,
} from 'common/types/base/spell/MagicSchool'
import { ReactNode } from 'react'
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
import evocationImage from 'images/magicSchool/evocation.png'
import conjurationImage from 'images/magicSchool/conjuration.png'
import illusionImage from 'images/magicSchool/illusion.png'
import necromancyImage from 'images/magicSchool/necromancy.png'
import abjurationImage from 'images/magicSchool/abjuration.png'
import enchantmentImage from 'images/magicSchool/enchantment.png'
import transmutationImage from 'images/magicSchool/transmutation.png'
import divinationImage from 'images/magicSchool/divination.png'

export const magicSchoolImageMap: Record<MagicSchool, string> = {
  evocation: evocationImage,
  conjuration: conjurationImage,
  illusion: illusionImage,
  necromancy: necromancyImage,
  abjuration: abjurationImage,
  enchantment: enchantmentImage,
  transmutation: transmutationImage,
  divination: divinationImage,
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

const SAvatar = styled(Avatar)`
  height: 52px;
  width: 124px;
  justify-content: flex-start;

  img {
    width: auto;
    max-width: 100%;
    max-height: 100%;
    border-radius: 2px;
    height: 100%;
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
  const levelText = spell.level === 0 ? 'Заговор' : `${spell.level} уровень`

  const isMobile = useIsMobile()

  const summaryEl = summary && (
    <SBox
      onFocus={stopPropagation}
      onClick={stopPropagation}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'flex-end'}
      ml={1}
    >
      {summary}
    </SBox>
  )

  return (
    <Accordion>
      <AccordionSummary expandIcon={!isMobile && <ExpandMore />}>
        <SBox display={!isMobile && 'flex'} alignItems={'center'} flexGrow={1}>
          <SBox display={'flex'} justifyContent={'space-between'}>
            <SAvatar
              variant='rounded'
              src={spell.image || magicSchoolImageMap[spell.school]}
            />
            {isMobile && summaryEl}
          </SBox>
          <SBox ml={!isMobile && 2} mt={isMobile && 1} mr={'auto'} flexGrow={1}>
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
              {spell.consumeComponents && ' • компоненты расходуются'}
            </Typography>
          </SBox>
          {!isMobile && summaryEl}
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
              : spell.target?.type === 'self' ||
                (spell.target?.type === 'ally' && spell.target.from === 'range')
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
          <Typography component={'div'}>
            <Markdown>{spell.description}</Markdown>
          </Typography>
        </div>
      </AccordionDetails>
    </Accordion>
  )
}
