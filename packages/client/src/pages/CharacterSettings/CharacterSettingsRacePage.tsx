import { useCharacterModel } from 'models/Character/CharacterModelContext'
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
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
import { CharacterRace } from 'models/Character/Race/Race'
import { Info as InfoIcon } from '@material-ui/icons'
import { useDispatch } from 'react-redux'
import styled, { css } from 'styled-components'
import { MapHooks } from 'components/MapHooks'
import { useToggle } from 'react-use'
import { Feature, FeatureModel } from 'models/Character/Feature/Feature'
import { Markdown } from 'components/Markdown'

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
              <Typography variant={'h5'}>{race.name.toUpperCase()}</Typography>
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
          <Grid container direction={'column'} spacing={2}>
            {race.features.map((feature) => (
              <FeatureItem feature={feature} key={feature.key} />
            ))}
          </Grid>
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
    dispatch.sync(characterModel.actions.setRace({ type }))
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
              primary={<Typography variant={'h6'}>{raceRef.name}</Typography>}
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
                <div>{raceInfo.name}</div>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container direction={'column'} spacing={2}>
                <Grid item>
                  <Typography variant={'body1'}>
                    {raceInfo.description}
                  </Typography>
                </Grid>
                <Divider />
                {raceInfo.features.map((feature, key) => (
                  <FeatureItem feature={feature} key={key} />
                ))}
              </Grid>
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

function FeatureItem({ feature }: { feature: Feature | FeatureModel }) {
  const data = 'data' in feature ? feature.data : feature
  return (
    <Grid item>
      <Box mb={1}>
        <Typography variant={'subtitle1'}>
          <b>{data.name}</b>
        </Typography>
        <Divider />
      </Box>
      <Typography variant={'body1'}>
        <Markdown>{data.description}</Markdown>
      </Typography>
      {'data' in feature &&
        Array.isArray(feature.choices) &&
        feature.choices?.length > 0 && (
          <Box mt={2} width={1}>
            <MapHooks
              hooks={feature.choices.map(({ hook }) => hook)}
              render={(choices) => (
                <Box mb={1}>
                  {Object.entries(choices).map(([key, { node }]) => (
                    <React.Fragment key={key}>{node}</React.Fragment>
                  ))}
                </Box>
              )}
            />
          </Box>
        )}
    </Grid>
  )
}
