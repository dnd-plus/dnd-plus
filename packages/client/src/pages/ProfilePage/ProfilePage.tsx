import React, { useState } from 'react'
import { useSubscription } from '@logux/redux'
import { currentUserCharactersChannel } from 'common/modules/character/channels'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { parseId } from '@logux/core'
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
  Typography,
} from '@material-ui/core'
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Settings as SettingsIcon,
} from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { characterInfoRoute, characterSettingsRoute } from 'constants/routes'
import styled, { css, useTheme } from 'styled-components'
import { useToggle } from 'react-use'
import { CreateCharacterForm } from 'pages/ProfilePage/CreateCharacterForm'
import {
  characterActions,
  CharacterState,
} from 'common/modules/character/redux'
import stc from 'string-to-color'
import { DefaultContainer } from 'components/DefaultContainer'
import { SBox } from 'components/SBox'

const SFab = styled(Fab)(
  ({ theme }) => css`
    ${theme.breakpoints.up('sm')} {
      position: absolute;
      left: calc(100% + ${theme.spacing(4)}px);
      top: 0;
    }
    ${theme.breakpoints.down('xs')} {
      position: fixed;
      right: ${theme.spacing(2)}px;
      bottom: ${theme.spacing(2)}px;
    }
  `,
)

const SCharList = styled.div`
  position: relative;
`

const SDialogInner = styled.div`
  width: 450px;
  max-width: 100%;
`

export function ProfilePage() {
  const isSubscribing = useSubscription([currentUserCharactersChannel.link()])

  const { userId } = parseId(useStore().client.nodeId)
  const characters = useSelector((state) =>
    Object.values(state.characters)
      .filter((character) => character.userId === userId)
      .sort((a, b) => b.updatedAt - a.updatedAt),
  )

  const dispatch = useDispatch()

  const [isOpenForm, toggleIsOpenForm] = useToggle(false)

  const [
    characterToDelete,
    setCharacterToDelete,
  ] = useState<null | CharacterState>(null)

  const theme = useTheme()

  return (
    <DefaultContainer>
      <SBox mt={5} mb={8}>
        <SCharList>
          <SBox my={3}>
            <Typography variant={'h3'}>Мои персонажи</Typography>
          </SBox>
          {characters.length === 0 && !isSubscribing && (
            <SBox my={3}>
              <Typography variant={'body1'} color={'textSecondary'}>
                Самое время создать персонажа!
              </Typography>
            </SBox>
          )}
          {characters.length > 0 && (
            <SBox my={3}>
              <List>
                {characters.map((character) => (
                  <ListItem
                    key={character._id}
                    button
                    component={Link}
                    to={characterInfoRoute.link(character._id)}
                  >
                    <ListItemAvatar>
                      <Avatar
                        style={{
                          color: theme.palette.getContrastText(
                            stc(character.name),
                          ),
                          backgroundColor: stc(character.name),
                        }}
                      >
                        {character.name
                          .split(' ')
                          .slice(0, 2)
                          .map((w) => w[0].toUpperCase())
                          .join('')}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={character.name} />
                    <ListItemSecondaryAction>
                      <Tooltip title={'Настроить'}>
                        <IconButton
                          component={Link}
                          to={characterSettingsRoute.link(character._id)}
                        >
                          <SettingsIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={'Удалить'}>
                        <IconButton
                          edge='end'
                          onClick={() => setCharacterToDelete(character)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </SBox>
          )}
          <Tooltip title={'Добавить персонажа'}>
            <SFab color='primary' onClick={toggleIsOpenForm}>
              <AddIcon />
            </SFab>
          </Tooltip>
          <CreateCharacterForm onClose={toggleIsOpenForm} open={isOpenForm} />
          <Dialog
            open={!!characterToDelete}
            onClose={() => setCharacterToDelete(null)}
          >
            {characterToDelete && (
              <SDialogInner>
                <DialogTitle>Создание персонажа</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Вы уверены, что хотите удалить персонажа{' '}
                    <b>{characterToDelete.name}</b>? Это необратимо!
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    type={'button'}
                    onClick={() => setCharacterToDelete(null)}
                    color={'primary'}
                  >
                    Отмена
                  </Button>
                  <SBox color={'error.main'}>
                    <Button
                      type={'submit'}
                      color={'inherit'}
                      onClick={() => {
                        dispatch.sync(
                          characterActions.delete({
                            _id: characterToDelete._id,
                          }),
                        )
                        setCharacterToDelete(null)
                      }}
                    >
                      Удалить
                    </Button>
                  </SBox>
                </DialogActions>
              </SDialogInner>
            )}
          </Dialog>
        </SCharList>
      </SBox>
    </DefaultContainer>
  )
}
