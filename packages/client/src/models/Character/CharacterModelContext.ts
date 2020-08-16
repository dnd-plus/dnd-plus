import React, { useContext } from 'react'
import { CharacterModel } from 'models/Character/CharacterModel'

export const CharacterModelContext = React.createContext<CharacterModel | null>(
  null,
)

export function useCharacterModel() {
  return useContext(CharacterModelContext) as CharacterModel
}

export function useCharacterState() {
  return useCharacterModel().state.use()
}
