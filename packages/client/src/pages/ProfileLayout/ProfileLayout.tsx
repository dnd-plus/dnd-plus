import React from 'react'
import { Box } from '@material-ui/core'
import { useStore } from 'react-redux'
import { parseId } from '@logux/core'
import { GUEST_USER } from 'common/modules/user/redux'
import { Navigate, Outlet } from 'react-router-dom'
import { loginRoute } from 'constants/routes'
import { DefaultContainer } from 'components/DefaultContainer'

export function ProfileLayout() {
  const { userId } = parseId(useStore().client.nodeId)

  if (userId === GUEST_USER) {
    return <Navigate to={loginRoute.link()} />
  }

  return (
    <DefaultContainer>
      <Box my={5}>
        <Outlet />
      </Box>
    </DefaultContainer>
  )
}
