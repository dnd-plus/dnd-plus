import { useCharacterModel } from 'models/Character/CharacterModelContext'
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core'
import React, { useState } from 'react'
import { racesList } from 'models/Character/Race/racesList'
import { characterActions } from 'common/modules/character/redux'
import { CharacterRace } from 'models/Character/Race/Race'
import { Info as InfoIcon } from '@material-ui/icons'
import { useDispatch } from 'react-redux'
import styled, { css } from 'styled-components'
import { MapHooks } from 'components/MapHooks'
import { useToggle } from 'react-use'

const raceName = (raceRef: CharacterRace) =>
  [raceRef.subclass, raceRef.name].filter(Boolean).join(' ').toUpperCase()

const SBigAvatar = styled(Avatar)(
  ({ theme }) => css`
    width: ${theme.spacing(8)}px;
    height: ${theme.spacing(8)}px;
  `,
)

export function CharacterSettingsRacePage() {
  const characterModel = useCharacterModel()
  const race = characterModel.race.data.use()

  const [reselectRace, toggleReselectRace] = useToggle(false)

  if (!race) {
    return (
      <>
        <Box my={3}>
          <Typography variant={'h5'}>Выбор расы</Typography>
        </Box>
        <SelectRaceList />
      </>
    )
  } else {
    return (
      <React.Fragment key={race.type}>
        <Box display={'flex'} my={3}>
          <Box mr={2}>
            <SBigAvatar src={race.image} alt={race.name} />
          </Box>
          <div>
            <Box mb={1}>
              <Typography variant={'h5'}>
                {race.fullName.toUpperCase()}
              </Typography>
            </Box>
            <Box mb={1}>
              <Typography variant={'body1'}>{race.description}</Typography>
            </Box>
            <Button onClick={() => toggleReselectRace()}>
              {reselectRace ? 'Оставить' : 'Cменить'}
            </Button>
          </div>
        </Box>
        {!reselectRace && (
          <List>
            {race.features.map((feature) => (
              <React.Fragment key={feature.key}>
                <ListItem>
                  <ListItemText
                    primary={feature.data.name}
                    secondary={feature.data.description}
                  />
                </ListItem>
                {feature.choices?.length > 0 && (
                  <List component={'div'} disablePadding>
                    <ListItem>
                      <Box mt={-1} width={1}>
                        <MapHooks
                          hooks={feature.choices.map(({ hook }) => hook)}
                          render={(choices) => (
                            <Box mb={1}>
                              {Object.entries(choices).map(
                                ([key, { node }]) => (
                                  <React.Fragment key={key}>
                                    {node}
                                  </React.Fragment>
                                ),
                              )}
                            </Box>
                          )}
                        />
                      </Box>
                    </ListItem>
                  </List>
                )}
              </React.Fragment>
            ))}
          </List>
        )}
        {reselectRace && (
          <SelectRaceList onSelectRace={() => toggleReselectRace(false)} />
        )}
      </React.Fragment>
    )
  }
}

function SelectRaceList({ onSelectRace }: { onSelectRace?: () => void }) {
  const [raceInfo, setRaceInfo] = useState<CharacterRace | null>(null)

  const characterModel = useCharacterModel()
  const dispatch = useDispatch()
  const selectRace = (type: CharacterRace['type']) => {
    dispatch.sync(characterActions.setRace({ _id: characterModel.id, type }))
    onSelectRace?.()
  }

  return (
    <>
      <List>
        {racesList.map((raceRef) => (
          <ListItem
            key={raceRef.type}
            button
            onClick={() => selectRace(raceRef.type)}
          >
            <ListItemAvatar>
              <Avatar src={raceRef.image} alt={raceRef.name} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant={'h6'}>{raceName(raceRef)}</Typography>
              }
            />
            <ListItemSecondaryAction>
              <IconButton edge={'end'} onClick={() => setRaceInfo(raceRef)}>
                <InfoIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Dialog
        open={!!raceInfo}
        onClose={() => setRaceInfo(null)}
        fullWidth
        maxWidth={'md'}
      >
        {raceInfo && (
          <>
            <DialogTitle>
              <Box display={'flex'} alignItems={'center'}>
                <Box mr={2}>
                  <Avatar src={raceInfo.image} alt={raceInfo.name} />
                </Box>
                <div>
                  {raceName(raceInfo)}
                  <Typography variant={'body1'}>
                    {raceInfo.description}
                  </Typography>
                </div>
              </Box>
            </DialogTitle>
            <DialogContent>
              <List>
                {raceInfo.features.map(({ name, description }) => (
                  <ListItem key={name}>
                    <ListItemText primary={name} secondary={description} />
                  </ListItem>
                ))}
              </List>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setRaceInfo(null)
                }}
              >
                Закрыть
              </Button>
              <Button
                color={'primary'}
                onClick={() => {
                  selectRace(raceInfo.type)
                  setRaceInfo(null)
                }}
              >
                Выбрать
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  )
}
