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
import {
  LighfootHalfling,
  StoutHalfling,
} from 'models/Character/Race/races/Halfling'
import { Tiefling } from 'models/Character/Race/races/Tiefling'
import { EladrinElf, HighElf, WoodElf } from 'models/Character/Race/races/Elf'
import { Human, VariantHuman } from './races/Human'
import { sortBy } from 'lodash-es'

export const racesList: CharacterRace[] = sortBy(
  [
    MountainDwarf,
    HillDwarf,
    ForestGnome,
    RockGnome,
    DeepGnome,
    Dragonborn,
    HalfOrc,
    HalfElf,
    StoutHalfling,
    LighfootHalfling,
    Tiefling,
    HighElf,
    WoodElf,
    EladrinElf,
    Human,
    VariantHuman,
  ],
  ['baseName', 'name'],
)
