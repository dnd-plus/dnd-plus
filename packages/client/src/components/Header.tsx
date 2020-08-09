import React, { useRef } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { parseId } from '@logux/core'
import { GUEST_USER, userActions } from 'common/modules/user/redux'
import { useSubscription } from '@logux/redux'
import { currentUserChannel } from 'common/modules/user/channels'
import {
  AppBar,
  Box,
  Button,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core'
import {
  AccountBoxOutlined,
  AccountCircle,
  ExitToApp,
} from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { homeRoute, loginRoute, profileRoute } from 'constants/routes'
import { useToggle } from 'react-use'

export function Header() {
  const { userId } = parseId(useStore().client.nodeId)
  const isGuest = userId === GUEST_USER

  const dispatch = useDispatch()

  useSubscription([currentUserChannel.link()])
  const userLogin = useSelector((state) => state.user?.login)

  const userMenuRef = useRef<HTMLButtonElement>(null)
  const [userMenuOpen, toggleUserMenuOpen] = useToggle(false)

  return (
    <AppBar position={'static'}>
      <Toolbar>
        {/*<Box mr={2}>*/}
        {/*  <IconButton edge='start' color='inherit' aria-label='menu'>*/}
        {/*    <MenuIcon />*/}
        {/*  </IconButton>*/}
        {/*</Box>*/}
        <Box mr={'auto'}>
          <Typography
            component={Link}
            to={homeRoute.path}
            color={'inherit'}
            variant={'h6'}
            style={{ textDecoration: 'none' }}
          >
            DnD+
          </Typography>
        </Box>
        {isGuest ? (
          <Button component={Link} to={loginRoute.path} color='inherit'>
            Вход
          </Button>
        ) : (
          <>
            <Button
              color={'inherit'}
              ref={userMenuRef}
              onClick={toggleUserMenuOpen}
              endIcon={<AccountCircle color={'inherit'} />}
              style={{ textTransform: 'none' }}
            >
              <Typography variant={'body1'}>{userLogin}</Typography>
            </Button>
            <Menu
              anchorEl={userMenuRef.current}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={userMenuOpen}
              onClose={toggleUserMenuOpen}
              getContentAnchorEl={null}
            >
              <MenuItem
                component={Link}
                to={profileRoute.path}
                onClick={() => toggleUserMenuOpen()}
              >
                <ListItemIcon>
                  <AccountBoxOutlined fontSize='small' />
                </ListItemIcon>
                <Typography variant='inherit'>Профиль</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  toggleUserMenuOpen()
                  dispatch(userActions.logout())
                }}
              >
                <ListItemIcon>
                  <ExitToApp fontSize='small' />
                </ListItemIcon>
                <Typography variant='inherit'>Выход</Typography>
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}
