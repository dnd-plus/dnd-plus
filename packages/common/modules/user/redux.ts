import { createAction } from '@reduxjs/toolkit'

export const GUEST_USER = 'guest'

export const userActions = {
  done: createAction<{ login: string; token: string }>('user/done'),
  register: createAction<{ login: string; email: string; password: string }>(
    'user/register',
  ),
  login: createAction<{ login: string; password: string }>('user/login'),
}
