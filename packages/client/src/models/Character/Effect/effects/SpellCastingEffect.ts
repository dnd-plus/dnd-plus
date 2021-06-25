import { DeepReadonly } from 'ts-essentials'
import { BaseEffectModel } from 'models/Character/Effect/BaseEffect'
import { SpellCastingType } from 'common/types/base/character/Feature/SpellSlotsType'
import { CharacterClassName } from 'common/types/base/character/CharacterClassName'
import { AbilityType } from 'common/reference/AbilityType'
import {
  CharacterLevel,
  CharacterLevelArray,
} from 'common/types/base/character/Level'
import { spells } from 'models/Character/Spell/spells'
import { entries, mapValues } from 'common/utils/typesafe'
import { OneOfOptionalRequired } from 'common/types/utils/OneOfOptionalRequired'

export type SpellCasting = {
  type: SpellCastingType
  fromLevel: CharacterLevel
  level: CharacterLevel
  ability: AbilityType
  description: string
  availableCantripsNumber?: CharacterLevelArray<number>
  pact?: {
    spellsNumber: CharacterLevelArray<number>
    spellsLevel: CharacterLevelArray<number>
  }
  ritual: boolean
  focusing: boolean
} & OneOfOptionalRequired<{
  availableSpellsNumber?: CharacterLevelArray<number>
  characterLevelSpellsNumberMod?: 'full' | 'half'
}>

type MultiSpellCasting = Pick<SpellCasting, 'type' | 'level' | 'pact'>

export type SpellCastingEffect = DeepReadonly<
  OneOfOptionalRequired<{
    type: 'spellCasting'
    spellCastingClassMap?: Partial<Record<CharacterClassName, SpellCasting>>
    preparedSpellsClassMap?: Partial<Record<CharacterClassName, number[]>>
  }>
>

const MULTI_CLASS_SPELL_LEVEL_MOD: Record<CharacterClassName, number> = {
  artificer: 1 / 2,
  barbarian: 0,
  bard: 1,
  cleric: 1,
  druid: 1,
  fighter: 1 / 3,
  monk: 0,
  paladin: 1 / 2,
  ranger: 1 / 2,
  rogue: 1 / 3,
  sorcerer: 1,
  warlock: 1,
  wizard: 0,
}

export class SpellCastingEffectModel extends BaseEffectModel<SpellCastingEffect> {
  get emptyRef() {
    return {
      type: 'spellCasting',
      spellCastingClassMap: {},
      preparedSpellsClassMap: {},
    } as const
  }

  get spellCastingClassMap() {
    return this.ref.spellCastingClassMap
  }

  get spellCasting(): MultiSpellCasting | undefined {
    const list = Object.values(this.ref.spellCastingClassMap || {}).flatMap(
      (spellCasting) => (spellCasting as MultiSpellCasting) || [],
    )
    if (list.length === 0) {
      return
    } else if (list.length === 1) {
      return list[0]
    } else {
      const level = entries(this.ref.spellCastingClassMap).reduce(
        (level, [type, spellCasting]) =>
          (level +
            Math.floor(
              MULTI_CLASS_SPELL_LEVEL_MOD[type] * (spellCasting?.level || 0),
            )) as CharacterLevel,
        0 as CharacterLevel,
      )

      const pact = Object.values(this.ref.spellCastingClassMap || {}).reduce(
        (pact, spellCasting) =>
          pact || (spellCasting?.pact as MultiSpellCasting['pact']),
        undefined as MultiSpellCasting['pact'],
      )

      return { type: 'mage', level, pact }
    }
  }

  get preparedSpellsClassMap() {
    return mapValues(
      this.ref.spellCastingClassMap,
      (classType, spellCasting) => {
        if (!spellCasting) return

        return this.ref.preparedSpellsClassMap?.[classType]
          ?.flatMap((id) => spells.find((spell) => spell.id === id) || [])
          .filter((spell) => spell.level >= spellCasting.level)
          .map((spell) => ({ classType, spell, spellCasting }))
      },
    )
  }

  get preparedSpells() {
    return Object.values(this.preparedSpellsClassMap).flatMap(
      (preparedSpells) => preparedSpells || [],
    )
  }

  get hasSpellCasting() {
    return (
      Object.values(this.ref.spellCastingClassMap || {}).filter(Boolean)
        .length > 0
    )
  }

  assign(effect: SpellCastingEffect) {
    this.ref.spellCastingClassMap = {
      ...this.ref.spellCastingClassMap,
      ...effect.spellCastingClassMap,
    }
    this.ref.preparedSpellsClassMap = {
      ...this.ref.preparedSpellsClassMap,
      ...effect.preparedSpellsClassMap,
    }
  }
}
