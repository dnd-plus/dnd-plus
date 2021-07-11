import { Navigate, Route, Routes } from 'react-router-dom'
import React from 'react'
import { HomePage } from 'pages/HomePage/HomePage'
import {
  characterInfoRoute,
  characterSettingsClassRoute,
  characterSettingsDescriptionRoute,
  characterSettingsRaceRoute,
  characterSettingsRoute,
  homeRoute,
} from 'constants/routes'
import { UserGuard } from 'pages/UserGuard/UserGuard'
import { CharacterGuard } from 'pages/CharacterGuard/CharacterGuard'
import { CharacterSettingsLayout } from 'pages/CharacterSettings/CharacterSettingsLayout'
import { CharacterSettingsRacePage } from 'pages/CharacterSettings/CharacterSettingsRacePage'
import { CharacterSettingsMainPage } from 'pages/CharacterSettings/CharacterSettingsMainPage'
import { CharacterSettingsClassPage } from 'pages/CharacterSettings/CharacterSettingsClassPage'

export function Pages() {
  return (
    <Routes>
      <Route path={homeRoute.path} element={<HomePage />} />
      <Route path={'*'} element={<UserGuard />}>
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
            <Route
              path={characterSettingsClassRoute.path}
              element={<CharacterSettingsClassPage />}
            />
            <Route
              path={characterSettingsDescriptionRoute.path}
              element={null}
            />
          </Route>
        </Route>
        <Route path={'*'} element={<Navigate to={homeRoute.link()} />} />
      </Route>
    </Routes>
  )
}
