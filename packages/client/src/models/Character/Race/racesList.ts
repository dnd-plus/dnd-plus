import { CharacterRace } from 'models/Character/Race/Race'
import { HillDwarf, MountainDwarf } from 'models/Character/Race/races/Dwarf'
import {
  DeepGnome,
  ForestGnome,
  RockGnome,
} from 'models/Character/Race/races/Gnome'
import { Dragonborn } from 'models/Character/Race/races/Dragonborn'
import { HalfOrc } from 'models/Character/Race/races/HalfOrc'
import { HalfElf } from 'models/Character/Race/races/HalfElf'

export const racesList: CharacterRace[] = [
  MountainDwarf,
  HillDwarf,
  ForestGnome,
  RockGnome,
  DeepGnome,
  Dragonborn,
  HalfOrc,
  HalfElf,
]
