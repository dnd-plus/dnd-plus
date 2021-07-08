import { LevelFeatureChoiceCreator } from 'models/Character/Class/LevelFeatureChoice/LevelFeatureChoice'
import { spellCastingSlotsMap } from 'models/Character/Class/spellCasting'
import { SelectSpellsFeatureChoiceModel } from 'models/Character/FeatureChoice/choices/SelectSpellsFeatureChoice'
import { SpellLevel } from 'models/Character/Spell/Spell'

export const selectSpellsLevelFeatureChoice: LevelFeatureChoiceCreator = ({
  characterModel,
  currentEffectMap,
  classType,
  key,
}) => {
  const classModel = characterModel.class
  const spellCasting = classModel.spellCastingMap[classType]
  const level = classModel.levelMap[classType]
  if (!spellCasting || !level || spellCasting.fromLevel > level) return

  const spellSlots = spellCastingSlotsMap[spellCasting.type]?.[level - 1]
  let maxLevel = 0
  if (spellSlots) {
    maxLevel = spellSlots.includes(0)
      ? spellSlots.indexOf(0)
      : spellSlots.length
  } else if (spellCasting.pact) {
    maxLevel = spellCasting.pact.spellsLevel[level - 1]
  }

  let maxNumber = 0
  if (spellCasting.availableSpellsNumber) {
    maxNumber = spellCasting.availableSpellsNumber?.[level - 1]
  } else if (spellCasting.characterLevelSpellsNumberMod) {
    maxNumber = Math.max(
      1,
      currentEffectMap.ability.modifiers[spellCasting.ability] +
        Math.floor(
          level *
            (spellCasting.characterLevelSpellsNumberMod === 'full' ? 1 : 0.5),
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
          spellCasting.availableCantripsNumber?.[level - 1] || 0,
        variant: 'all',
      },
      key,
      classModel.setChoiceMap[classType],
    ),
  }
}
