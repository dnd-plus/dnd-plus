import React from 'react'
import { parseId } from '@logux/core'
import { useStore } from 'react-redux'
import { GUEST_USER } from 'common/modules/user/redux'
import { Navigate, Outlet } from 'react-router-dom'
import { loginRoute } from 'constants/routes'

export function UserGuard() {
  const { userId } = parseId(useStore().client.nodeId)

  if (userId === GUEST_USER) {
    return <Navigate to={loginRoute.link()} />
  }
  return <Outlet />
}
