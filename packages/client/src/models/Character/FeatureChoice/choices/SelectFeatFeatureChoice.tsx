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
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from '@material-ui/core'
import styled, { css } from 'styled-components'
import { CharacterModel } from 'models/Character/CharacterModel'
import { checkFeatConditions, Feat } from 'models/Character/Feat/Feat'
import { AddCircleOutline, CheckCircle, HighlightOff } from '@material-ui/icons'
import { Markdown } from 'components/Markdown'

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
  t.TypeOf<typeof SelectFeatureChoiceState>
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

  get chosen() {
    return !!this.selected
  }

  get effects() {
    return (this.selected?.effects || []).flatMap(
      (effect, index) =>
        effectFactory(
          this.characterModel,
          effect,
          createKey(this.key, this.knownState?.selected, index),
        ) || [],
    )
  }

  readonly hook = () => {
    const [isOpen, toggleIsOpen] = useToggle(false)
    const dispatch = useDispatch()

    const abilityEffect = this.characterModel.effects.type.ability.use()
    const equipmentPossessionEffect = this.characterModel.effects.type.equipmentPossession.use()
    const raceRef = this.characterModel.race.ref.use()

    const isAvailable =
      this.selected &&
      checkFeatConditions(this.selected, {
        abilityEffect,
        equipmentPossessionEffect,
        raceRef,
      })

    return {
      node: (
        <>
          {this.selected && isAvailable && (
            <Card>
              <CardContent>
                <Typography gutterBottom variant={'h5'}>
                  {this.selected.name}
                </Typography>
                <Box mb={1}>
                  <Markdown>{this.selected.description}</Markdown>
                </Box>
              </CardContent>
              <CardActions>
                <Button onClick={toggleIsOpen}>Сменить</Button>
              </CardActions>
            </Card>
          )}
          {!isAvailable && (
            <SDangerButton
              variant={'contained'}
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
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={'md'}>
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
                  <Box
                    width={0.05}
                    color={
                      feat.selected
                        ? 'primary.main'
                        : feat.active
                        ? 'success.main'
                        : feat.available
                        ? 'text.main'
                        : 'error.dark'
                    }
                  >
                    {React.createElement(
                      feat.active
                        ? CheckCircle
                        : feat.available
                        ? AddCircleOutline
                        : HighlightOff,
                      { fontSize: 'small', color: 'inherit' },
                    )}
                  </Box>
                  <Box width={0.33}>
                    <Typography variant={'body1'}>{feat.name}</Typography>
                  </Box>
                  <Box color={feat.available ? 'text.secondary' : 'error.dark'}>
                    {feat.demands?.text}
                  </Box>
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
    color: ${theme.palette.error.contrastText};
    background-color: ${theme.palette.error.dark};

    &:hover {
      background-color: ${theme.palette.error.main};
    }
  `,
)
