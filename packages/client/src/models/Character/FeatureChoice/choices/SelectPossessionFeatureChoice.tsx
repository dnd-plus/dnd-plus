import * as t from 'io-ts'
import { BaseFeatureChoiceModel } from 'models/Character/FeatureChoice/BaseFeatureChoice'
import {
  getSkillAbility,
  SKILL_TYPES,
  SkillType,
  SkillTypeDict,
} from 'common/reference/SkillType'
import { Typography } from '@material-ui/core'
import React from 'react'
import {
  SkillPossessionLevel,
  SkillPossessionEffectModel,
  isFirstSkillPossessionLevelStronger,
} from 'models/Character/Effect/effects/SkillPossessionEffect'
import { createKey } from 'models/utils/createKey'
import { EffectModel } from 'models/Character/Effect/Effect'
import {
  LANGUAGE_TYPES,
  LanguageType,
  LanguageTypeDict,
} from 'common/reference/LanguageType'
import { LanguageEffectModel } from 'models/Character/Effect/effects/LanguageEffect'
import { ChoiceSelect } from 'components/ChoiceSelect'
import { keys } from 'common/utils/typesafe'
import { AbilityTypeDict } from 'common/reference/AbilityType'
import {
  TOOL_TYPES,
  ToolType,
  ToolTypeDict,
} from 'common/reference/equipment/ToolType'
import { EquipmentPossessionEffectModel } from 'models/Character/Effect/effects/EquipmentPossessionEffect'
import { computed } from 'mobx'
import { observer } from 'mobx-react-lite'
import { FeatureChoiceModelType } from 'models/Character/FeatureChoice/FeatureChoice'

const SelectSkillFeatureChoiceState = t.readonly(
  t.type({
    selected: t.string,
  }),
)

type BaseSelectPossessionRefType<
  T extends FeatureChoiceModelType,
  K extends string,
  V extends string,
  // eslint-disable-next-line @typescript-eslint/ban-types
  O extends Record<string, unknown> = {},
> = Readonly<
  { type: T } & {
    readonly [k in K]?: ReadonlyArray<V>
  } &
    O
>

abstract class BaseSelectPossessionFeatureChoiceModel<
  T extends FeatureChoiceModelType,
  K extends string,
  V extends string,
  // eslint-disable-next-line @typescript-eslint/ban-types
  O extends Record<string, unknown> = {},
> extends BaseFeatureChoiceModel<
  BaseSelectPossessionRefType<T, K, V, O>,
  t.TypeOf<typeof SelectSkillFeatureChoiceState>
> {
  abstract readonly label: string
  abstract readonly dict: Readonly<Record<V, string>>
  abstract readonly options: ReadonlyArray<V>
  abstract readonly availableKey: K
  abstract get unavailableOptions(): ReadonlyArray<V>

  get availableOptions(): ReadonlyArray<V> | undefined {
    return undefined
  }

  abstract get activeEffect(): EffectModel

  @computed
  get knownState() {
    return SelectSkillFeatureChoiceState.is(this.state) ? this.state : null
  }

  @computed
  get selected() {
    return this.knownState &&
      this.options.includes(this.knownState.selected as any)
      ? (this.knownState.selected as V)
      : ('' as V)
  }

  @computed
  get choicesCount() {
    return this.selected ? 0 : 1
  }

  @computed
  get effectKey() {
    return createKey(this.key, this.knownState?.selected)
  }

  @computed
  get choiceEffects() {
    return this.selected ? [this.activeEffect] : []
  }

  // eslint-disable-next-line unused-imports/no-unused-vars-ts
  getOptionGroup(option: V): string | undefined {
    return undefined
  }

  @computed
  get node() {
    return <SelectPossession model={this} />
  }
}

const SelectPossession = observer(
  <T extends FeatureChoiceModelType, K extends string, V extends string>({
    model,
  }: {
    model: BaseSelectPossessionFeatureChoiceModel<T, K, V>
  }) => {
    const availableOptions = model.availableOptions || model.options
    const options: ReadonlyArray<V> = availableOptions.filter(
      (skill) => model.ref[model.availableKey]?.includes(skill) ?? true,
    )

    return (
      <ChoiceSelect
        label={model.label}
        value={model.selected}
        options={options.map((option) => {
          const isExist =
            model.unavailableOptions.includes(option) &&
            option !== model.selected

          return {
            value: option,
            disabled: isExist,
            group: model.getOptionGroup(option),
            text: (
              <>
                <span
                  style={
                    isExist ? { textDecoration: 'line-through' } : undefined
                  }
                >
                  {model.dict[option]}
                </span>
                {isExist && (
                  <Typography variant={'caption'}>&nbsp; есть</Typography>
                )}
              </>
            ),
          }
        })}
        onChange={(e) =>
          model.setState({
            selected: String(e.target.value),
          })
        }
      />
    )
  },
)

export class SelectSkillFeatureChoiceModel extends BaseSelectPossessionFeatureChoiceModel<
  'selectSkill',
  'availableSkills',
  SkillType,
  {
    level?: Exclude<SkillPossessionLevel, null | undefined>
    minLevel?: Exclude<SkillPossessionLevel, null>
  }
> {
  readonly dict = SkillTypeDict
  readonly options = SKILL_TYPES
  readonly availableKey = 'availableSkills'
  readonly minLevel = this.ref.minLevel
  readonly level = this.ref.level || 'proficient'
  readonly label =
    this.level === 'expertise' ? 'Экспертиза в навыке' : 'Владение навыком'

  @computed
  get availableOptions() {
    const { skills } = this.currentEffectMap.skillPossession
    return (
      this.minLevel &&
      keys(skills).filter(
        (skill) =>
          !isFirstSkillPossessionLevelStronger(this.minLevel, skills[skill]),
      )
    )
  }

  @computed
  get unavailableOptions() {
    const { skills } = this.characterModel.effects.skillPossession
    return (
      keys(skills).filter(
        (skill) =>
          !isFirstSkillPossessionLevelStronger(this.level, skills[skill]),
      ) || []
    )
  }

  getOptionGroup(option: SkillType) {
    const ability = getSkillAbility(option)
    return ability && AbilityTypeDict[ability]
  }

  @computed
  get activeEffect() {
    return new SkillPossessionEffectModel(
      this.characterModel,
      {
        type: 'skillPossession',
        skills: this.selected ? { [this.selected]: this.level } : {},
      },
      this.effectKey,
    )
  }
}

export class SelectToolFeatureChoiceModel extends BaseSelectPossessionFeatureChoiceModel<
  'selectTool',
  'availableTool',
  ToolType
> {
  readonly label = 'Владение инструментом'
  readonly dict = ToolTypeDict
  readonly options = TOOL_TYPES
  readonly availableKey = 'availableTool'

  @computed
  get unavailableOptions() {
    return this.characterModel.effects.equipmentPossession.tool
  }

  @computed
  get activeEffect(): EffectModel {
    return new EquipmentPossessionEffectModel(
      this.characterModel,
      { type: 'equipmentPossession', tool: [this.selected] },
      this.effectKey,
    )
  }
}

export class SelectLanguageFeatureChoiceModel extends BaseSelectPossessionFeatureChoiceModel<
  'selectLanguage',
  'availableLanguages',
  LanguageType
> {
  readonly label = 'Владение языком'
  readonly dict = LanguageTypeDict
  readonly options = LANGUAGE_TYPES
  readonly availableKey = 'availableLanguages'

  @computed
  get unavailableOptions() {
    return this.characterModel.effects.language.languages
  }

  @computed
  get activeEffect(): EffectModel {
    return new LanguageEffectModel(
      this.characterModel,
      { type: 'language', languages: [this.selected] },
      this.effectKey,
    )
  }
}
