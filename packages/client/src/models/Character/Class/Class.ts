import {
  CHARACTER_CLASS_NAMES,
  CharacterClassName,
  CharacterTypeRecord,
} from 'common/types/base/character/CharacterClassName'
import { BaseDiceValue } from 'common/types/base/Dice'
import { ArmorType, ArmorTypeDict } from 'common/reference/equipment/ArmorType'
import {
  WeaponTypeDict,
  WeaponTypeWithGroups,
} from 'common/reference/equipment/WeaponType'
import { ToolType, ToolTypeDict } from 'common/reference/equipment/ToolType'
import {
  AbilitiesMap,
  AbilityType,
  AbilityTypeDict,
} from 'common/reference/AbilityType'
import { SkillType, SkillTypeDict } from 'common/reference/SkillType'
import { DeepReadonly } from 'ts-essentials'
import { CharacterModel } from 'models/Character/CharacterModel'
import { classesMap } from 'models/Character/Class/classes'
import {
  CharacterLevel,
  MAX_CHARACTER_LEVEL,
} from 'common/types/base/character/Level'
import { createKey } from 'models/utils/createKey'
import { FeatureChoiceAction } from 'models/Character/FeatureChoice/BaseFeatureChoice'
import { EffectModel } from 'models/Character/Effect/Effect'
import { mapValues } from 'common/utils/typesafe'
import { ObjectWithOptionalGroups } from 'common/types/utils/OneOfOptionalRequired'
import {
  ClassFeature,
  ClassFeatureModel,
} from 'models/Character/Class/ClassFeature'
import { uniq } from 'lodash-es'
import { SpellCasting } from 'models/Character/Effect/effects/SpellCastingEffect'
import { createSpellCastingFeatureDescription } from 'models/Character/Class/spellCasting'
import { computed, makeObservable } from 'mobx'
import { getMulticlassUnmetClaims } from 'models/Character/Class/getMulticlassUnmetClaims'
import { createEffectMap, unionEffectModels } from 'models/utils/effect'
import { withChildEffects } from 'models/Character/EffectsModel'
import { RuleSource } from 'common/types/RuleSource'
import { selectSpellsLevelFeatureChoice } from 'models/Character/Class/LevelFeatureChoice/choices/SelectSpellsLevelFeatureChoice'

export type CharacterClass = DeepReadonly<{
  type: CharacterClassName
  hitDiceValue: BaseDiceValue
  proficiencies: {
    armor: ArmorType[]
    weapon: WeaponTypeWithGroups[]
    savingThrows: AbilityType[]
    skillsChoice: SkillType[]
    skillsNumber: number
  } & (
    | {
        tool: ToolType[]
        toolChoice?: ToolType[]
        toolNumber?: number
      }
    | {
        tool?: ToolType[]
        toolChoice: ToolType[]
        toolNumber: number
      }
  )
  spellCasting?: Omit<SpellCasting, 'level'>
  archetype: {
    variants: CharacterClassArchetype[]
    level: CharacterLevel
    name: string
    description: string
  }
  multiclass: {
    // [{'' and ''} or {'' and ''}]
    requirements: Partial<AbilitiesMap>[]
    proficiencies: ObjectWithOptionalGroups<
      {
        armor: boolean
        weapon: boolean
        skillsNumber: number
      },
      {
        tool: boolean
      },
      {
        toolNumber: number
      }
    >
  }
  features: ClassFeature[]
}>

export type CharacterClassArchetype = {
  type: string
  source: RuleSource
  name: string
  description: string
  spellCasting?: CharacterClass['spellCasting']
  features: ClassFeature[]
}

export class ClassModel {
  constructor(private characterModel: CharacterModel) {
    makeObservable(this)
  }

  @computed
  get state() {
    return this.characterModel.state.classes
  }

  @computed
  get levelList() {
    return CHARACTER_CLASS_NAMES.flatMap(
      (type) =>
        this.state?.[type]?.level.map((time, index) => ({
          time,
          type,
          level: (index + 1) as CharacterLevel,
        })) || [],
    )
      .sort((a, b) => a.time - b.time)
      .slice(0, MAX_CHARACTER_LEVEL)
  }

  @computed
  get level() {
    return this.levelList.length
  }

  @computed
  get levelMap() {
    return mapValues(
      this.state,
      (type) =>
        this.levelList.filter((item) => item.type === type)
          .length as CharacterLevel,
    )
  }

  @computed
  get sortedClassNames() {
    return uniq(this.levelList.map(({ type }) => type))
  }

  @computed
  get mainType(): CharacterClassName | undefined {
    return this.sortedClassNames[0]
  }

  @computed
  get refMap() {
    return mapValues(this.state, (type, item) => item && classesMap[type])
  }

  @computed
  get mainRef() {
    return this.mainType && this.refMap[this.mainType]
  }

  @computed
  get incomingEffects() {
    return this.characterModel.race.effects
  }

  @computed
  get isEmpty() {
    return this.sortedClassNames.length === 0
  }

  @computed
  get isMulticlass() {
    return this.sortedClassNames.length > 1
  }

  @computed
  get refList() {
    return this.sortedClassNames.flatMap((type) =>
      this.state?.[type] ? classesMap[type] : [],
    )
  }

  @computed
  get choicesStateMap() {
    return CHARACTER_CLASS_NAMES.reduce((obj, type) => {
      if (this.state?.[type]) {
        obj[type] = this.state[type]?.choices || {}
      }
      return obj
    }, {} as { [K in CharacterClassName]?: Record<string, unknown> })
  }

  readonly setChoiceMap = CHARACTER_CLASS_NAMES.reduce((obj, type) => {
    obj[type] = (payload) =>
      this.characterModel.actions.setClassChoice({ ...payload, type })
    return obj
  }, {} as Record<CharacterClassName, FeatureChoiceAction>)

  @computed
  get selectArchetypeFeatureMap() {
    return mapValues(this.refMap, (type, ref):
      | ClassFeatureModel
      | undefined => {
      const key = createKey(type, 'archetype')
      return (
        ref &&
        new ClassFeatureModel(
          this.characterModel,
          {
            level: ref.archetype.level,
            name: ref.archetype.name,
            description: ref.archetype.description,
            choices: [
              {
                type: 'select',
                label: 'Архетип',
                options: ref.archetype.variants.map(({ name, type }) => ({
                  name,
                  type,
                  effects: [],
                })),
              },
            ],
          },
          key,
          this.choicesStateMap[type] || {},
          this.setChoiceMap[type],
        )
      )
    })
  }

  @computed
  get proficienciesMap() {
    return mapValues(this.refMap, (type, ref):
      | Partial<CharacterClass['proficiencies']>
      | undefined => {
      if (!ref) return
      const { armor, weapon, tool, skillsChoice, toolChoice } =
        ref.proficiencies
      const mp = ref.multiclass.proficiencies
      return ref.type === this.mainType
        ? ref.proficiencies
        : {
            ...(mp.armor && { armor }),
            ...(mp.weapon && { weapon }),
            ...(mp.tool && { tool }),
            ...(mp.toolNumber && { toolChoice, toolNumber: mp.toolNumber }),
            ...(mp.skillsNumber && {
              skillsChoice,
              skillsNumber: mp.skillsNumber,
            }),
          }
    })
  }

  @computed
  get archetypeMap() {
    return mapValues(this.refMap, (type, ref) => {
      if (!ref) return

      const selected = ref.archetype.variants.find((variant) => {
        const state =
          this.selectArchetypeFeatureMap[type]?.choices[0]?.knownState
        return state && 'selected' in state && state.selected === variant.type
      })

      return {
        ...ref.archetype,
        selected,
      }
    })
  }

  @computed
  get hitsFeatureMap() {
    return mapValues(
      this.refMap,
      (type, ref): ClassFeature | undefined =>
        ref && {
          level: 1,
          name: 'Хиты',
          // prettier-ignore
          description: `
**Кость Хитов**: 1d${ref.hitDiceValue} за каждый уровень паладина

**Хиты на 1 уровне**: 10 + модификатор Телосложения

**Хиты на следующих уровнях**: 1d${ref.hitDiceValue} (или ${ref.hitDiceValue / 2 + 1}) + модификатор Телосложения за каждый уровень после первого
        `,
        },
    )
  }

  @computed
  get possessionFeatureMap() {
    return mapValues(this.refMap, (type): ClassFeature | undefined => {
      const prof = this.proficienciesMap[type]

      if (!prof) return

      const text = <T extends string>(
        items: readonly T[] | undefined,
        dict: Record<T, string>,
        num?: number,
      ) => {
        const itemsText = items?.map((type) => dict[type]).join(', ') || ''
        return num === 0 || !items?.length
          ? 'нет'
          : num
          ? `Выберите ${num} из следующих: ${itemsText}`
          : itemsText
      }

      return {
        level: 1,
        name: 'Владение',
        // prettier-ignore
        description: `
**Доспехи**: ${text(prof.armor, ArmorTypeDict)}

**Оружие**: ${text(prof.weapon, WeaponTypeDict)}

**Инструменты**: ${text(prof.tool || prof.toolChoice as ToolType[], ToolTypeDict, prof.toolNumber)}

**Спасброски**: ${text(prof.savingThrows, AbilityTypeDict)}

**Навыки**: ${text(prof.skillsChoice, SkillTypeDict, prof.skillsNumber)}
        `,
        effects: [
          {
            type: 'equipmentPossession',
            armor: prof.armor,
            weapon: prof.weapon,
            tool: prof.tool,
          },
        ],
        choices: [
          ...(prof.toolNumber && prof.toolChoice
            ? [...Array(prof.toolNumber)].map(() => ({
                type: 'selectTool' as const,
                availableTool: prof.toolChoice,
              }))
            : []),
          ...[...Array(prof.skillsNumber)].map(() => ({
            type: 'selectSkill' as const,
            availableSkills: prof.skillsChoice,
          })),
        ].flatMap((v) => v || []),
      }
    })
  }

  @computed
  get spellCastingMap() {
    return mapValues(this.refMap, (type, ref) => {
      const spellCasting =
        ref?.spellCasting || this.archetypeMap[type]?.selected?.spellCasting
      return (
        spellCasting && {
          ...spellCasting,
          level: this.levelMap[type],
        }
      )
    })
  }

  @computed
  get spellCastingFeatureMap() {
    return mapValues(this.refMap, (type, ref): ClassFeature | undefined => {
      const spellCasting = this.spellCastingMap[type]

      return (
        spellCasting &&
        ref && {
          level: spellCasting.fromLevel,
          name: spellCasting.pact
            ? 'Магия договора'
            : 'Использование заклинаний',
          description: createSpellCastingFeatureDescription(
            ref.type,
            spellCasting,
          ),
          effects: [
            {
              type: 'spellCasting',
              spellCastingClassMap: {
                [type]: spellCasting,
              },
            },
          ],
        }
      )
    })
  }

  @computed
  get featuresMap() {
    return mapValues(this.refMap, (type, ref) => {
      type Data = [feature: ClassFeature, key: string]

      if (!ref) return

      return [
        [this.hitsFeatureMap[type], createKey(type, 'feature', 'hits')] as Data,
        [
          this.possessionFeatureMap[type],
          createKey(type, 'feature', 'possession'),
        ] as Data,
        ...(this.spellCastingFeatureMap[type]
          ? [
              [
                this.spellCastingFeatureMap[type],
                createKey(type, 'feature', 'spellCasting'),
              ] as Data,
            ]
          : []),
        ...ref.features.map(
          (feature, index): Data => [
            feature,
            createKey(type, 'feature', index),
          ],
        ),
        ...(this.archetypeMap[type]?.selected?.features?.map(
          (feature, index): Data => [
            feature,
            createKey(type, 'feature', 'archetype', index),
          ],
        ) || []),
      ]
        .map(
          ([feature, key]: Data) =>
            new ClassFeatureModel(
              this.characterModel,
              feature,
              key,
              this.choicesStateMap[type] || {},
              this.setChoiceMap[type],
            ),
        )
        .concat(this.selectArchetypeFeatureMap[type] || [])
        .filter(({ level }) => level <= Number(this.levelMap[type]))
        .sort((a, b) => a.level - b.level)
    })
  }

  @computed
  get multiclassUnmetClaimsMap() {
    const unmetClaimsMap: CharacterTypeRecord<{
      base: Partial<AbilitiesMap>[] | undefined
      current: Partial<AbilitiesMap>[] | undefined
    }> = {}

    this.levelList.forEach(({ type, level }, index) => {
      if (level !== 1 || type === this.mainType) return

      const effects = withChildEffects(this.characterModel, [
        ...this.incomingEffects,
        ...this.levelList
          .slice(0, index)
          .flatMap(
            ({ type, level }) =>
              this.featuresMap[type]
                ?.filter((feature) => feature.level === level)
                .flatMap((feature) => feature.getClassEffects(level)) || [],
          ),
      ])

      const claims = {
        base: getMulticlassUnmetClaims(
          unionEffectModels(this.characterModel, 'ability', effects).abilities,
          this.mainRef?.multiclass.requirements || [],
        ),
        current: getMulticlassUnmetClaims(
          unionEffectModels(this.characterModel, 'ability', effects).abilities,
          this.refMap[type]?.multiclass.requirements || [],
        ),
      }

      if (claims.base || claims.current) {
        unmetClaimsMap[type] = claims
      }
    })

    return unmetClaimsMap
  }

  @computed
  get levelFeaturesList() {
    return this.levelList.flatMap(({ type, level }) => {
      return {
        type,
        level,
        features:
          this.multiclassUnmetClaimsMap[type] && type !== this.mainType
            ? []
            : this.featuresMap[type]?.filter(
                (feature) => feature.level === level,
              ) || [],
      }
    })
  }

  @computed
  get choicesCount() {
    if (this.refList.length === 0) return 1

    const features = this.levelFeaturesList.flatMap(({ features }) => features)
    const featuresChoicesCount = features.reduce((sum, feature) => {
      return sum + feature.choicesCount
    }, 0)
    const spellsChoicesCount = Object.values(this.levelChoicesMap).reduce(
      (sum, levelChoices) =>
        sum +
        levelChoices.reduce((sum, { choice }) => sum + choice.choicesCount, 0),
      0,
    )

    return featuresChoicesCount + spellsChoicesCount
  }

  @computed
  get dataMap() {
    return mapValues(
      this.refMap,
      (type, ref) =>
        ref && {
          ...ref,
          /* eslint-disable @typescript-eslint/no-non-null-assertion */
          features: this.featuresMap[type]!,
          archetype: this.archetypeMap[type]!,
          level: this.levelMap[type]!,
          /* eslint-enable @typescript-eslint/no-non-null-assertion */
        },
    )
  }

  @computed
  get dataList() {
    return this.sortedClassNames.flatMap((type) => this.dataMap[type] || [])
  }

  @computed
  get effectsWithoutLevelChoices(): EffectModel[] {
    return [
      ...this.incomingEffects,
      ...this.levelFeaturesList.flatMap(({ type, level, features }) =>
        features.flatMap((feature) =>
          feature
            .getClassEffects(level)
            .map((effect) => effect.withFrom({ class: type })),
        ),
      ),
    ]
  }

  @computed
  get levelChoicesMap() {
    const currentEffectMap = createEffectMap(
      this.characterModel,
      this.effectsWithoutLevelChoices,
      true,
    )

    return mapValues(this.refMap, (type) => {
      const getParams = (key: string) => ({
        characterModel: this.characterModel,
        currentEffectMap,
        classType: type,
        key,
      })

      const levelFeatures =
        this.featuresMap[type]?.flatMap((feature, index) =>
          feature.getLevelChoices(
            getParams(createKey(type, 'levelChoice', index)),
          ),
        ) || []

      const selectSpellLevelFeature = selectSpellsLevelFeatureChoice(
        getParams(createKey(type, 'levelChoice', 'spellCasting')),
      )
      if (selectSpellLevelFeature) {
        levelFeatures.unshift({
          title: 'Заклинания',
          ...selectSpellLevelFeature,
        })
      }

      return levelFeatures
    })
  }

  @computed
  get effects(): EffectModel[] {
    return this.effectsWithoutLevelChoices.concat(
      Object.entries(this.levelChoicesMap).flatMap(([type, levelChoices]) =>
        levelChoices.flatMap(({ choice }) =>
          choice.effects.map((effect) => effect.withFrom({ class: type })),
        ),
      ),
    )
  }

  @computed
  get effectMap() {
    return createEffectMap(this.characterModel, this.effects, true)
  }
}
