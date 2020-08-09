import React, { useState } from 'react'
import { useSubscription } from '@logux/redux'
import { currentUserCharactersChannel } from 'common/modules/character/channels'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { parseId } from '@logux/core'
import {
  Avatar,
  Box,
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
  Typography,
} from '@material-ui/core'
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { characterInfoRoute, characterSettingsRoute } from 'constants/routes'
import styled, { css } from 'styled-components'
import { useToggle } from 'react-use'
import { CreateCharacterForm } from 'pages/ProfilePage/CreateCharacterForm'
import { characterActions } from 'common/modules/character/redux'

const SFab = styled(Fab)(
  ({ theme }) => css`
    ${theme.breakpoints.up('md')} {
      position: absolute;
      left: calc(100% + ${theme.spacing(4)}px);
      top: 0;
    }
    ${theme.breakpoints.down('sm')} {
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
    Object.values(state.character)
      .filter((character) => character.userId === userId)
      .sort((a, b) => b.updatedAt - a.updatedAt),
  )

  const dispatch = useDispatch()

  const [isOpenForm, toggleIsOpenForm] = useToggle(false)

  const [
    characterToDelete,
    setCharacterToDelete,
  ] = useState<null | CharacterState>(null)

  return (
    <>
      <SCharList>
        <Box my={3}>
          <Typography variant={'h3'}>Мои персонажи</Typography>
        </Box>
        {characters.length === 0 && !isSubscribing && (
          <Box my={3}>
            <Typography variant={'body1'} color={'textSecondary'}>
              Самое время создать персонажа!
            </Typography>
          </Box>
        )}
        {characters.length > 0 && (
          <Box my={3}>
            <List>
              {characters.map((character) => (
                <ListItem
                  key={character._id}
                  button
                  component={Link}
                  to={characterInfoRoute.link(character._id)}
                >
                  <ListItemAvatar>
                    <Avatar>
                      {character.name
                        .split(' ')
                        .slice(0, 2)
                        .map((w) => w[0].toUpperCase())
                        .join('')}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={character.name} />
                  <ListItemSecondaryAction>
                    <IconButton
                      component={Link}
                      to={characterSettingsRoute.link(character._id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge='end'
                      onClick={() => setCharacterToDelete(character)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
        <SFab color='primary' onClick={toggleIsOpenForm}>
          <AddIcon />
        </SFab>
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
                <Box color={'error.main'}>
                  <Button
                    type={'submit'}
                    color={'inherit'}
                    onClick={() => {
                      dispatch.sync(
                        characterActions.delete({ _id: characterToDelete._id }),
                      )
                      setCharacterToDelete(null)
                    }}
                  >
                    Удалить
                  </Button>
                </Box>
              </DialogActions>
            </SDialogInner>
          )}
        </Dialog>
      </SCharList>
    </>
  )
}
