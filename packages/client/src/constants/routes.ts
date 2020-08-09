import { createRoute } from 'common/utils/createRoute'

export const homeRoute = createRoute('/')
export const loginRoute = createRoute('/login')
export const profileRoute = createRoute('/profile')
export const characterInfoRoute = createRoute<true>('/character/:id')
export const characterSettingsRoute = createRoute<true>(
  '/character-settings/:id',
)
