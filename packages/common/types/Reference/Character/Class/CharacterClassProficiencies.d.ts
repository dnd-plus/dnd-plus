declare type CharacterClassProficiencies = Readonly<{
  armor: ReadonlyArray<ArmorType>
  // tools: // TODO: add tools
  weapon:
    | ReadonlyArray<SimpleWeaponGroupType | MartialWeaponType>
    | ReadonlyArray<SimpleWeaponType | MartialWeaponGroupType>
    | ReadonlyArray<SimpleWeaponType | MartialWeaponType>
  savingThrows: ReadonlyArray<AbilityName>
  skills: {
    count: number
    variants: ReadonlyArray<SkillType>
  }
}>
