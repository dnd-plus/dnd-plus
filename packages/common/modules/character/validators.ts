export const characterNameValidator = (value: string) => {
  if (!value || !value.trim()) return 'Введите имя персонажа'
  if (value.trim().length > 25) return 'Максимум 25 символов'
}
