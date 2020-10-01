import { effectFactory } from 'models/Character/Effect/Effect'
import * as t from 'io-ts'
import React from 'react'
import { useDispatch } from 'react-redux'
import { DeepReadonly } from 'ts-essentials'
import { BaseFeatureChoiceModel } from 'models/Character/FeatureChoice/BaseFeatureChoice'
import { createKey } from 'models/utils/createKey'

import { feats } from 'models/Character/Feat/feats'
import { useToggle } from 'react-use'
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
} from '@material-ui/core'
import styled, { css, useTheme } from 'styled-components'
import { CharacterModel } from 'models/Character/CharacterModel'
import { checkFeatConditions, Feat } from 'models/Character/Feat/Feat'
import { AddCircleOutline, CheckCircle, ErrorOutline } from '@material-ui/icons'
import { Markdown } from 'components/Markdown'
import { createSelector } from 'reselect'
import { createUseSelector } from 'models/utils/createUseSelector'
import { SBox } from 'components/SBox'

import {
  featureChoiceFactory,
  FeatureChoiceModel,
} from 'models/Character/FeatureChoice/FeatureChoice'
import { MapHooks } from 'components/MapHooks'

export type SelectFeatFeatureChoice = DeepReadonly<{
  type: 'selectFeat'
}>
const SelectFeatureChoiceState = t.readonly(
  t.type({
    selected: t.number,
  }),
)

export class SelectFeatFeatureChoiceModel extends BaseFeatureChoiceModel<
  SelectFeatFeatureChoice,
  t.TypeOf<typeof SelectFeatureChoiceState> & {
    choices?: Record<string, unknown>
  }
> {
  get knownState() {
    return SelectFeatureChoiceState.is(this.state) ? this.state : null
  }

  get selected() {
    return (
      (this.knownState &&
        feats.find(({ id }) => id === this.knownState?.selected)) ||
      null
    )
  }

  checkOptionsSelector = createUseSelector(
    this.characterModel.effects.type.ability,
    this.characterModel.effects.type.equipmentPossession,
    this.characterModel.race.ref,
    (abilityEffect, equipmentPossessionEffect, raceRef) => ({
      abilityEffect,
      equipmentPossessionEffect,
      raceRef,
    }),
  )

  choiceModels: FeatureChoiceModel[] = (() => {
    const state = this.state as any
    const selected = this.selected

    if (selected && selected.choices) {
      return selected.choices.flatMap(
        (choice, index) =>
          featureChoiceFactory(
            this.characterModel,
            (this.state as any)?.choices?.[index],
            choice,
            createKey(this.key, selected.id, index),
            ({ value }) =>
              this.setChoiceAction({
                key: this.key,
                value: {
                  ...state,
                  choices: {
                    ...state?.choices,
                    [index]: value,
                  },
                },
              }),
          ) || [],
      )
    }
    return []
  })()

  get effects() {
    const choiceEffects =
      this.choiceModels?.flatMap((choice) => choice.effects) || []

    const featEffects =
      this.selected?.effects?.flatMap(
        (effect, index) =>
          effectFactory(
            this.characterModel,
            effect,
            createKey(this.key, this.knownState?.selected, index),
          ) || [],
      ) || []

    return [...featEffects, ...choiceEffects]
  }

  isAvailableSelector = createUseSelector(
    this.checkOptionsSelector,
    (checkOptions) =>
      this.selected && checkFeatConditions(this.selected, checkOptions),
  )

  innerChoicesCountSelector = createSelector(
    this.choiceModels.map(({ choicesCountSelector }) => choicesCountSelector),
    (...choicesCountArray) =>
      choicesCountArray.reduce((sum, num) => sum + num, 0),
  )

  choicesCountSelector = createSelector(
    this.isAvailableSelector,
    this.innerChoicesCountSelector,
    (isAvailable, innerChoicesCount) =>
      (isAvailable ? 0 : 1) + innerChoicesCount,
  )

  readonly hook = () => {
    const [isOpen, toggleIsOpen] = useToggle(false)
    const dispatch = useDispatch()

    const isAvailable = this.isAvailableSelector.use()

    return {
      node: (
        <>
          {this.selected && (
            <Card>
              <CardContent>
                <Typography gutterBottom variant={'h5'}>
                  {this.selected.name}
                </Typography>
                <SBox mb={1}>
                  <Markdown>{this.selected.description}</Markdown>
                </SBox>
                {!isAvailable && (
                  <SBox color={'error.dark'}>
                    <Typography variant={'h6'}>
                      Не выполнено условие:
                    </Typography>
                    <Typography variant={'body1'}>
                      {this.selected.demands?.text}
                    </Typography>
                  </SBox>
                )}
                {!!this.choiceModels.length && (
                  <SBox mt={1}>
                    <MapHooks
                      key={this.selected.id}
                      hooks={this.choiceModels.map(({ hook }) => hook)}
                      render={(choices) =>
                        choices.map(({ node }, key) => (
                          <React.Fragment key={key}>{node}</React.Fragment>
                        ))
                      }
                    />
                  </SBox>
                )}
              </CardContent>
              <CardActions>
                <Button
                  color={isAvailable ? 'default' : 'primary'}
                  onClick={toggleIsOpen}
                >
                  Сменить
                </Button>
              </CardActions>
            </Card>
          )}
          {!this.selected && (
            <SDangerButton
              variant={'outlined'}
              color={'inherit'}
              onClick={toggleIsOpen}
            >
              Выбрать черту
            </SDangerButton>
          )}
          <FeatsListModal
            open={isOpen}
            value={this.selected}
            onClose={() => toggleIsOpen()}
            onChange={(feat) =>
              dispatch.sync(
                this.setChoiceAction({
                  key: this.key,
                  value: {
                    selected: feat.id,
                  },
                }),
              )
            }
            characterModel={this.characterModel}
          />
        </>
      ),
    }
  }
}

function FeatsListModal<F extends () => void>({
  open,
  onClose,
  onChange,
  value,
  characterModel,
}: {
  open: boolean
  onClose: F
  onChange: (f: Feat) => void
  value: Feat | null
  characterModel: CharacterModel
}) {
  const featEffect = characterModel.effects.type.feat.use()
  const abilityEffect = characterModel.effects.type.ability.use()
  const equipmentPossessionEffect = characterModel.effects.type.equipmentPossession.use()
  const raceRef = characterModel.race.ref.use()

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={'md'}
      fullScreen={useMediaQuery(useTheme().breakpoints.down('sm'))}
    >
      <DialogTitle>Выбор черты</DialogTitle>
      <DialogContent>
        {feats
          .map((feat) => {
            const available = checkFeatConditions(feat, {
              abilityEffect,
              equipmentPossessionEffect,
              raceRef,
            })
            const selected = available && feat.id === value?.id
            const active =
              (available && featEffect.featIds.includes(feat.id)) || selected

            return { ...feat, active, available, selected }
          })
          .sort((a, b) => {
            if (a.selected !== b.selected) return +b.selected - +a.selected
            if (a.available !== b.available) return +b.available - +a.available
            return 0
          })
          .map((feat) => {
            return (
              <Accordion key={feat.id}>
                <AccordionSummary>
                  <Grid container alignItems={'center'} wrap={'nowrap'}>
                    <SBox
                      display={'inline-flex'}
                      color={
                        feat.selected
                          ? 'primary.main'
                          : feat.active
                          ? 'success.main'
                          : feat.available
                          ? 'text.main'
                          : 'error.dark'
                      }
                      mr={1}
                    >
                      {React.createElement(
                        feat.active
                          ? CheckCircle
                          : feat.available
                          ? AddCircleOutline
                          : ErrorOutline,
                        { fontSize: 'small', color: 'inherit' },
                      )}
                    </SBox>
                    <Grid
                      item
                      xs={'auto'}
                      container
                      alignItems={'center'}
                      justify={'space-between'}
                    >
                      <Grid item xs={12} md={'auto'}>
                        <Typography variant={'body1'}>{feat.name}</Typography>
                      </Grid>
                      {feat.demands?.text && (
                        <Grid item xs={12} md={'auto'}>
                          <SBox
                            color={
                              feat.available ? 'text.secondary' : 'error.dark'
                            }
                          >
                            {feat.demands?.text}
                          </SBox>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <Markdown>{feat.description}</Markdown>
                </AccordionDetails>
                {feat.available && !feat.active && (
                  <>
                    <Divider />
                    <AccordionActions>
                      <Button
                        color={'primary'}
                        onClick={() => {
                          onChange(feat)
                          onClose()
                        }}
                      >
                        Выбрать
                      </Button>
                    </AccordionActions>
                  </>
                )}
              </Accordion>
            )
          })}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Закрыть</Button>
      </DialogActions>
    </Dialog>
  )
}

const SDangerButton = styled(Button)(
  ({ theme }) => css`
    border-color: ${theme.palette.error.dark};

    &:hover {
      border-color: ${theme.palette.error.main};
    }
  `,
)
