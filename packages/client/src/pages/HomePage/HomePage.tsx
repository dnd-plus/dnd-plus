import React from 'react'
import { Typography } from '@material-ui/core'
import { SBox } from 'components/SBox'
import { parseId } from '@logux/core'
import { useStore } from 'react-redux'
import { GUEST_USER } from 'common/modules/user/redux'
import { LoginPage } from 'pages/LoginPage/LoginPage'
import { ProfilePage } from 'pages/ProfilePage/ProfilePage'
import { DefaultContainer } from 'components/DefaultContainer'

export function HomePage() {
  const { userId } = parseId(useStore().client.nodeId)

  return (
    <>
      <DefaultContainer>
        <SBox my={4}>
          <Typography variant={'h2'}>DnD+</Typography>
        </SBox>
      </DefaultContainer>
      {userId === GUEST_USER ? <LoginPage /> : <ProfilePage />}
    </>
  )
}
