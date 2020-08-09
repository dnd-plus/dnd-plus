import { Route, Routes } from 'react-router-dom'
import React from 'react'
import { HomePage } from 'pages/HomePage/HomePage'
import { LoginPage } from './LoginPage/LoginPage'
import { homeRoute, loginRoute, profileRoute } from 'constants/routes'
import { ProfileLayout } from 'pages/ProfileLayout/ProfileLayout'
import { ProfilePage } from 'pages/ProfilePage/ProfilePage'

export function Pages() {
  return (
    <Routes>
      <Route path={homeRoute.path} element={<HomePage />} />
      <Route path={loginRoute.path} element={<LoginPage />} />
      <Route path={profileRoute.path} element={<ProfileLayout />}>
        <Route path={'/'} element={<ProfilePage />} />
      </Route>
    </Routes>
  )
}
