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

const SelectSkillFeatureChoiceState = t.readonly(
  t.type({
    selected: t.string,
  }),
)

type BaseSelectPossessionRefType<
  T extends string,
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
  T extends string,
  K extends string,
  V extends string,
  // eslint-disable-next-line @typescript-eslint/ban-types
  O extends Record<string, unknown> = {},
> extends BaseFeatureChoiceModel<
  BaseSelectPossessionRefType<T, K, V, O>,
  t.TypeOf<typeof SelectSkillFeatureChoiceState>
> {
  protected abstract readonly label: string
  protected abstract readonly dict: Readonly<Record<V, string>>
  protected abstract readonly options: ReadonlyArray<V>
  protected abstract readonly availableKey: K
  protected abstract get unavailableOptions(): ReadonlyArray<V>

  protected get availableOptions(): ReadonlyArray<V> | undefined {
    return undefined
  }

  protected abstract get activeEffect(): EffectModel

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
  get effects() {
    return this.selected ? [this.activeEffect] : []
  }

  // eslint-disable-next-line unused-imports/no-unused-vars-ts
  getOptionGroup(option: V): string | undefined {
    return undefined
  }

  readonly hook = () => {
    const availableOptions = this.availableOptions || this.options
    const options: ReadonlyArray<V> = availableOptions.filter(
      (skill) => this.ref[this.availableKey]?.includes(skill) ?? true,
    )

    return {
      node: (
        <ChoiceSelect
          label={this.label}
          value={this.selected}
          options={options.map((option) => {
            const isExist =
              this.unavailableOptions.includes(option) &&
              option !== this.selected

            return {
              value: option,
              disabled: isExist,
              group: this.getOptionGroup(option),
              text: (
                <>
                  <span
                    style={
                      isExist ? { textDecoration: 'line-through' } : undefined
                    }
                  >
                    {this.dict[option]}
                  </span>
                  {isExist && (
                    <Typography variant={'caption'}>&nbsp; есть</Typography>
                  )}
                </>
              ),
            }
          })}
          onChange={(e) =>
            this.setChoiceAction({
              key: this.key,
              value: {
                selected: String(e.target.value),
              },
            })
          }
        />
      ),
    }
  }
}

export class SelectSkillFeatureChoiceModel extends BaseSelectPossessionFeatureChoiceModel<
  'selectSkill',
  'availableSkills',
  SkillType,
  {
    level?: Exclude<SkillPossessionLevel, null | undefined>
    minLevel?: Exclude<SkillPossessionLevel, null>
  }
> {
  protected readonly dict = SkillTypeDict
  protected readonly options = SKILL_TYPES
  protected readonly availableKey = 'availableSkills'
  protected readonly minLevel = this.ref.minLevel
  protected readonly level = this.ref.level || 'proficient'
  protected readonly label =
    this.level === 'expertise' ? 'Экспертиза в навыке' : 'Владение навыком'

  @computed
  protected get availableOptions() {
    const { skills } = this.currentEffects.skillPossession
    return (
      this.minLevel &&
      keys(skills).filter(
        (skill) =>
          !isFirstSkillPossessionLevelStronger(this.minLevel, skills[skill]),
      )
    )
  }

  @computed
  protected get unavailableOptions() {
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
    ).withChoice(this)
  }
}

export class SelectToolFeatureChoiceModel extends BaseSelectPossessionFeatureChoiceModel<
  'selectTool',
  'availableTool',
  ToolType
> {
  protected readonly label = 'Владение инструментом'
  protected readonly dict = ToolTypeDict
  protected readonly options = TOOL_TYPES
  protected readonly availableKey = 'availableTool'

  @computed
  protected get unavailableOptions() {
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
  protected readonly label = 'Владение языком'
  protected readonly dict = LanguageTypeDict
  protected readonly options = LANGUAGE_TYPES
  protected readonly availableKey = 'availableLanguages'

  @computed
  protected get unavailableOptions() {
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
