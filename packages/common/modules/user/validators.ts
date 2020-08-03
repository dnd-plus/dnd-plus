export const loginValidator = (value: string) => {
  if (!value) return 'Обязательное поле'
  if (value.length < 4) return 'Минимум 4 символа'
  if (value.length > 25) return 'Максимум 25 символов'
  if (!/^[a-z0-9_]+$/i.test(value))
    return 'Доступны только латинские символы, цифры и нижнее подчеркивание'
}

export const emailValidator = (value: string) => {
  if (!value) return 'Обязательное поле'
  if (!/^[^@.]+@[^@.]+\.[^@]+$/.test(value)) return 'Некорректная почта'
}

export const passwordValidator = (value: string) => {
  if (!value) return 'Обязательное поле'
  if (value.length < 6) return 'Минимум 6 символов'
  if (value.length > 100) return 'Максимум 100 символов'
  if (!/^[a-z0-9!@$%&*()_+\-]+$/i.test(value))
    return 'Доступны только латинские буквы, цифры и символы !@$%&*()_-+'
}
