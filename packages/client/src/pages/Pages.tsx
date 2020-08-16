import { Navigate, Route, Routes } from 'react-router-dom'
import React from 'react'
import { HomePage } from 'pages/HomePage/HomePage'
import { LoginPage } from './LoginPage/LoginPage'
import {
  characterInfoRoute,
  characterSettingsClassRoute,
  characterSettingsDescriptionRoute,
  characterSettingsRaceRoute,
  characterSettingsRoute,
  homeRoute,
  loginRoute,
  profileRoute,
} from 'constants/routes'
import { ProfilePage } from 'pages/ProfilePage/ProfilePage'
import { UserGuard } from 'pages/UserGuard/UserGuard'
import { CharacterGuard } from 'pages/CharacterGuard/CharacterGuard'
import { CharacterSettingsLayout } from 'pages/CharacterSettings/CharacterSettingsLayout'
import { CharacterSettingsRacePage } from 'pages/CharacterSettings/CharacterSettingsRacePage'
import { CharacterSettingsMainPage } from 'pages/CharacterSettings/CharacterSettingsMainPage'

export function Pages() {
  return (
    <Routes>
      <Route path={homeRoute.path} element={<HomePage />} />
      <Route path={loginRoute.path} element={<LoginPage />} />
      <Route path={'*'} element={<UserGuard />}>
        <Route path={profileRoute.path}>
          <Route path={'/'} element={<ProfilePage />} />
        </Route>
        <Route path={characterInfoRoute.path} element={<CharacterGuard />}>
          <Route
            path={characterSettingsRoute.path}
            element={<CharacterSettingsLayout />}
          >
            <Route path={'/'} element={<CharacterSettingsMainPage />} />
            <Route
              path={characterSettingsRaceRoute.path}
              element={<CharacterSettingsRacePage />}
            />
            <Route path={characterSettingsClassRoute.path} element={null} />
            <Route
              path={characterSettingsDescriptionRoute.path}
              element={null}
            />
          </Route>
        </Route>
        <Route path={'*'} element={<Navigate to={profileRoute.link()} />} />
      </Route>
    </Routes>
  )
}
