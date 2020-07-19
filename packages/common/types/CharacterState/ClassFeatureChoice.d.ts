declare type BaseClassFeatureChoice = Readonly<{
  type: string
}>

declare interface ChoiceMap {}

declare type ClassFeatureChoice = Readonly<ChoiceMap[keyof ChoiceMap]>

type ChoiceCheck = CheckType<BaseClassFeatureChoice, ClassFeatureChoice>
