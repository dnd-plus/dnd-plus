import { createRoute } from 'common/utils/createRoute'

export const homeRoute = createRoute('/')

// CHARACTER INFO
export const characterInfoRoute = createRoute<true>('/character/:characterId')

// CHARACTER SETTINGS
export const characterSettingsRoute = createRoute<true>(
  characterInfoRoute.linkPath,
  'settings',
)
export const characterSettingsRaceRoute = createRoute<true>(
  characterSettingsRoute.linkPath,
  'race',
)
export const characterSettingsClassRoute = createRoute<true>(
  characterSettingsRoute.linkPath,
  'class',
)
export const characterSettingsDescriptionRoute = createRoute<true>(
  characterSettingsRoute.linkPath,
  'description',
)
