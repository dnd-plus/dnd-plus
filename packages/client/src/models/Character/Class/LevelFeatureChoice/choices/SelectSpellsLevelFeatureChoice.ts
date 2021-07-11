import { LevelFeatureChoiceCreator } from 'models/Character/Class/LevelFeatureChoice/LevelFeatureChoice'
import {
  SpellCastingInfo,
  spellCastingSlotsMap,
} from 'models/Character/Class/spellCasting'
import { SelectSpellsFeatureChoiceModel } from 'models/Character/FeatureChoice/choices/SelectSpellsFeatureChoice'
import { SpellLevel } from 'models/Character/Spell/Spell'

export type SelectSpellsLevelFeatureChoiceRef = SpellCastingInfo

export const selectSpellsLevelFeatureChoice: LevelFeatureChoiceCreator<SelectSpellsLevelFeatureChoiceRef> =
  ({ characterModel, currentEffectMap, classType, key }, spellCastingInfo) => {
    const classModel = characterModel.class
    const level = classModel.levelMap[classType]
    if (!spellCastingInfo || !level) return

    const spellSlots =
      spellCastingSlotsMap[spellCastingInfo.spellCastingType]?.[level - 1]
    let maxLevel = 0
    if (spellSlots) {
      maxLevel = spellSlots.includes(0)
        ? spellSlots.indexOf(0)
        : spellSlots.length
    } else if (spellCastingInfo.pact) {
      maxLevel = spellCastingInfo.pact.spellsLevel[level - 1]
    }

    let maxNumber = 0
    if (spellCastingInfo.availableSpellsNumber) {
      maxNumber = spellCastingInfo.availableSpellsNumber?.[level - 1]
    } else if (spellCastingInfo.characterLevelSpellsNumberMod) {
      maxNumber = Math.max(
        1,
        currentEffectMap.ability.modifiers[spellCastingInfo.ability] +
          Math.floor(
            level *
              (spellCastingInfo.characterLevelSpellsNumberMod === 'full'
                ? 1
                : 0.5),
          ),
      )
    }

    return {
      choice: new SelectSpellsFeatureChoiceModel(
        characterModel,
        classModel.choicesStateMap[classType]?.[key],
        {
          type: 'selectSpells',
          classType: classType,
          classOnly: true,
          maxLevel: maxLevel as SpellLevel,
          maxNumber,
          maxCantripsNumber:
            spellCastingInfo.availableCantripsNumber?.[level - 1] || 0,
          variant: 'all',
        },
        key,
        classModel.setChoiceMap[classType],
      ),
    }
  }
