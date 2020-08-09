import { createRoute } from 'common/utils/createRoute'

export const currentUserCharactersChannel = createRoute('currentUserCharacters')
export const characterChannel = createRoute<true>('character/:id')
