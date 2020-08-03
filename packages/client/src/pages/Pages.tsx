import { Route, Routes } from 'react-router-dom'
import React from 'react'
import { HomePage } from 'pages/HomePage/HomePage'
import { LoginPage } from './LoginPage/LoginPage'

export function Pages() {
  return (
    <Routes>
      <Route path={'/'} element={<HomePage />} />
      <Route path={'login'} element={<LoginPage />} />
    </Routes>
  )
}
