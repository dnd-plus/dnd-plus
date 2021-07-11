import { DeepReadonly } from 'ts-essentials'
import { BaseEffectModel } from 'models/Character/Effect/BaseEffect'
import { SpellCastingType } from 'common/types/base/character/Feature/SpellSlotsType'
import {
  CharacterLevel,
  CharacterLevelArray,
} from 'common/types/base/character/Level'
import { spellCastingSlotsMap } from 'models/Character/Class/spellCasting'
import { spells } from 'models/Character/Spell/spells'
import { computed } from 'mobx'

type MultiSpellCasting = DeepReadonly<{
  spellCastingType: SpellCastingType | 'multiclass'
  classLevel: CharacterLevel
  pact?: {
    spellsNumber: CharacterLevelArray<number>
    spellsLevel: CharacterLevelArray<number>
  }
}>

export type SpellCastingEffect = DeepReadonly<
  {
    type: 'spellCasting'
    preparedSpells?: number[]
  } & (
    | MultiSpellCasting
    | Readonly<{ [K in keyof MultiSpellCasting]?: undefined }>
  )
>

const MULTI_CLASS_TYPE_LEVEL_MOD: Record<SpellCastingType, number> = {
  mage: 1,
  secondMage: 1 / 2,
  thirdMage: 1 / 3,
  caster: 0,
}

export class SpellCastingEffectModel extends BaseEffectModel<SpellCastingEffect> {
  @computed
  get emptyRef() {
    return {
      type: 'spellCasting',
    } as const
  }

  @computed
  get spellCasting(): MultiSpellCasting | undefined {
    return this.ref.spellCastingType ? this.ref : undefined
  }

  @computed
  get spellSlots() {
    if (!this.spellCasting) return

    const type =
      this.spellCasting.spellCastingType === 'multiclass'
        ? 'mage'
        : this.spellCasting.spellCastingType
    return spellCastingSlotsMap[type]?.[this.spellCasting.classLevel - 1]
  }

  @computed
  get pact() {
    return (
      this.spellCasting?.pact && {
        spellsNumber:
          this.spellCasting.pact.spellsNumber[this.spellCasting.classLevel - 1],
        spellsLevel:
          this.spellCasting.pact.spellsLevel[this.spellCasting.classLevel - 1],
      }
    )
  }

  @computed
  get preparedSpells() {
    return (
      this.ref.preparedSpells?.flatMap(
        (id) => spells.find((spell) => spell.id === id) || [],
      ) || []
    )
  }

  @computed
  get hasSpellCasting() {
    return Boolean(this.ref.spellCastingType)
  }

  unionRef(effect: SpellCastingEffect) {
    let unionRef: SpellCastingEffect = this.emptyRef

    if (!this.ref.spellCastingType) {
      const { spellCastingType, classLevel, pact } = effect

      if (spellCastingType && classLevel) {
        unionRef = { ...unionRef, spellCastingType, classLevel, pact }
      }
    } else if (effect.spellCastingType) {
      unionRef = {
        ...unionRef,
        spellCastingType: 'multiclass',
        classLevel: [this.ref, effect].reduce(
          (level, { spellCastingType, classLevel }) => {
            if (spellCastingType === 'multiclass') {
              return (level + classLevel) as CharacterLevel
            }
            return (level +
              Math.floor(
                MULTI_CLASS_TYPE_LEVEL_MOD[spellCastingType] * classLevel,
              )) as CharacterLevel
          },
          0 as CharacterLevel,
        ),
        pact: this.ref.pact || effect.pact,
      }
    }

    unionRef = {
      ...unionRef,
      preparedSpells: [
        ...(this.ref.preparedSpells || []),
        ...(effect.preparedSpells || []),
      ],
    }

    return unionRef
  }
}
