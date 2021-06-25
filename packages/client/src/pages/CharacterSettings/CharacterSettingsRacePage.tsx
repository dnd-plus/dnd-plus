import { useCharacterModel } from 'models/Character/CharacterModelContext'
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  useMediaQuery,
} from '@material-ui/core'
import React, { useState } from 'react'
import { racesList } from 'models/Character/Race/racesList'
import { CharacterRace } from 'models/Character/Race/Race'
import { Info as InfoIcon } from '@material-ui/icons'
import styled, { css, useTheme } from 'styled-components'
import { useToggle } from 'react-use'
import { SBox } from 'components/SBox'
import { FeatureItem } from 'pages/CharacterSettings/components/FeatureItem'
import { observer } from 'mobx-react-lite'

const SBigAvatar = styled(Avatar)(
  ({ theme }) => css`
    width: ${theme.spacing(8)}px;
    height: ${theme.spacing(8)}px;
  `,
)

export const CharacterSettingsRacePage = observer(
  function CharacterSettingsRacePage() {
    const characterModel = useCharacterModel()
    const race = characterModel.race.data

    const [reselectRace, toggleReselectRace] = useToggle(false)

    if (!race) {
      return (
        <>
          <SBox my={3}>
            <Typography variant={'h5'}>Выбор расы</Typography>
          </SBox>
          <SelectRaceList />
        </>
      )
    } else {
      return (
        <React.Fragment key={race.type}>
          <SBox display={'flex'} my={3}>
            <SBox mr={2}>
              <SBigAvatar src={race.image} alt={race.name} />
            </SBox>
            <div>
              <SBox mb={1}>
                <Typography variant={'h5'}>
                  {race.name.toUpperCase()}
                  {race.variant && ' (альтернатива)'}
                </Typography>
              </SBox>
              <SBox mb={1}>
                <Typography variant={'body1'}>{race.description}</Typography>
              </SBox>
              <Button color={'primary'} onClick={() => toggleReselectRace()}>
                {reselectRace ? 'Оставить' : 'Cменить'}
              </Button>
            </div>
          </SBox>
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
  },
)

function SelectRaceList({ onSelectRace }: { onSelectRace?: () => void }) {
  const [raceInfo, setRaceInfo] = useState<CharacterRace | null>(null)

  const characterModel = useCharacterModel()
  const selectRace = (type: CharacterRace['type']) => {
    characterModel.actions.setRace({ type })
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
                <Typography variant={'h6'}>
                  {raceRef.name}
                  {raceRef.variant && ' (альтернатива)'}
                </Typography>
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
        fullScreen={useMediaQuery(useTheme().breakpoints.down('sm'))}
      >
        {raceInfo && (
          <>
            <DialogTitle>
              <SBox display={'flex'} alignItems={'center'}>
                <SBox mr={2}>
                  <Avatar src={raceInfo.image} alt={raceInfo.name} />
                </SBox>
                <div>{raceInfo.name}</div>
              </SBox>
            </DialogTitle>
            <DialogContent>
              <Grid container direction={'column'} spacing={2}>
                <Grid item>
                  <Typography variant={'body1'}>
                    {raceInfo.description}
                  </Typography>
                </Grid>
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
