import { CharacterRace } from 'models/Character/Race/Race'
import { HillDwarf, MountainDwarf } from 'models/Character/Race/races/Dwarf'
import { ForestGnome, RockGnome } from 'models/Character/Race/races/Gnome'

export const racesList: CharacterRace[] = [
  MountainDwarf,
  HillDwarf,
  ForestGnome,
  RockGnome,
]
