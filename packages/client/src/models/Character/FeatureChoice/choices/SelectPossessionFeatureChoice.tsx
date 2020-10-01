import * as t from 'io-ts'
import { BaseFeatureChoiceModel } from 'models/Character/FeatureChoice/BaseFeatureChoice'
import {
  SKILL_TYPES,
  SkillType,
  SkillTypeDict,
} from 'common/reference/SkillType'
import { useDispatch } from 'react-redux'
import { Typography } from '@material-ui/core'
import React from 'react'
import { SkillPossessionEffectModel } from 'models/Character/Effect/effects/SkillPossessionEffect'
import { createKey } from 'models/utils/createKey'
import { EffectModel } from 'models/Character/Effect/Effect'
import {
  LANGUAGE_TYPES,
  LanguageType,
  LanguageTypeDict,
} from 'common/reference/LanguageType'
import { LanguageEffectModel } from 'models/Character/Effect/effects/LanguageEffect'
import { ChoiceSelect } from 'components/ChoiceSelect'
import {
  createUseSelector,
  OutputAppSelector,
} from 'models/utils/createUseSelector'

const SelectSkillFeatureChoiceState = t.readonly(
  t.type({
    selected: t.string,
  }),
)

type BaseSelectPossessionRefType<
  T extends string,
  K extends string,
  V extends string
> = Readonly<
  { type: T } & {
    readonly [k in K]?: ReadonlyArray<V>
  }
>

abstract class BaseSelectPossessionFeatureChoiceModel<
  T extends string,
  K extends string,
  V extends string
> extends BaseFeatureChoiceModel<
  BaseSelectPossessionRefType<T, K, V>,
  t.TypeOf<typeof SelectSkillFeatureChoiceState>
> {
  protected abstract readonly label: string
  protected abstract readonly dict: Readonly<Record<V, string>>
  protected abstract readonly options: ReadonlyArray<V>
  protected abstract readonly availableKey: K
  protected abstract unavailableOptionsSelector: OutputAppSelector<
    ReadonlyArray<V>
  >
  protected abstract get activeEffect(): EffectModel

  get knownState() {
    return SelectSkillFeatureChoiceState.is(this.state) ? this.state : null
  }

  get selected() {
    return this.knownState &&
      this.options.includes(this.knownState.selected as any)
      ? (this.knownState.selected as V)
      : ('' as V)
  }

  choicesCountSelector = () => (this.selected ? 0 : 1)

  get effectKey() {
    return createKey(this.key, this.knownState?.selected)
  }

  get effects() {
    return this.selected ? [this.activeEffect] : []
  }

  readonly hook = () => {
    const dispatch = useDispatch()

    const options: ReadonlyArray<V> = this.options.filter(
      (skill) => this.ref[this.availableKey]?.includes(skill) ?? true,
    )

    const unavailableOptions = this.unavailableOptionsSelector.use()

    return {
      node: (
        <ChoiceSelect
          label={this.label}
          value={this.selected}
          options={options.map((option) => {
            const isExist =
              unavailableOptions.includes(option) && option !== this.selected

            return {
              value: option,
              disabled: isExist,
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
            dispatch.sync(
              this.setChoiceAction({
                key: this.key,
                value: {
                  selected: String(e.target.value),
                },
              }),
            )
          }
        />
      ),
    }
  }
}

export class SelectSkillFeatureChoiceModel extends BaseSelectPossessionFeatureChoiceModel<
  'selectSkill',
  'availableSkills',
  SkillType
> {
  protected readonly label = 'Владение навыком'
  protected readonly dict = SkillTypeDict
  protected readonly options = SKILL_TYPES
  protected readonly availableKey = 'availableSkills'

  protected unavailableOptionsSelector = createUseSelector(
    this.characterModel.effects.type.skillPossession,
    ({ skills }) =>
      (Object.keys(skills) as SkillType[]).filter((skill) => !!skills[skill]) ||
      [],
  )

  get activeEffect(): EffectModel {
    return new SkillPossessionEffectModel(
      this.characterModel,
      { type: 'skillPossession', skills: { [this.selected]: 'proficient' } },
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

  protected unavailableOptionsSelector = createUseSelector(
    this.characterModel.effects.type.language,
    ({ languages }) => languages,
  )

  get activeEffect(): EffectModel {
    return new LanguageEffectModel(
      this.characterModel,
      { type: 'language', languages: [this.selected] },
      this.effectKey,
    )
  }
}
