import React, { useRef } from 'react'
import { Field, Form } from 'react-final-form'
import {
  Box,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Container,
  Grid,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from '@material-ui/core'
import { useToggle } from 'react-use'
import { ArrowDropDown } from '@material-ui/icons'
import {
  emailValidator,
  loginValidator,
  passwordValidator,
} from 'common/modules/user/validators'
import { useDispatch } from 'react-redux'
import { userActions } from 'common/modules/user/redux'
import {
  UNIQUE_FIELD_EXIST,
  UNKNOWN_USER,
  WRONG_PASSWORD,
} from 'common/constants/errors/user'
import { FORM_ERROR } from 'final-form'
import { MuiField } from 'components/MuiField'

const requiredValidator = (value: string) => {
  if (!value) {
    return 'Обязательное поле'
  }
}

export function LoginPage() {
  const [isRegister, toggleIsRegister] = useToggle(false)

  const anchorRef = useRef<HTMLDivElement>(null)
  const [isOpenPopper, toggleIsOpenPopper] = useToggle(false)

  const dispatch = useDispatch()

  async function handleSubmit({
    login,
    email,
    password,
  }: Record<string, string>) {
    try {
      if (isRegister) {
        await dispatch.sync(userActions.register({ login, email, password }))
      } else {
        await dispatch.sync(userActions.login({ login, password }))
      }
    } catch (error) {
      console.log('error', { ...error })
      switch (error.action?.reason) {
        case UNKNOWN_USER:
          return { login: 'Такого пользователя не существует' }
        case WRONG_PASSWORD:
          return { password: 'Неверный пароль' }
        case UNIQUE_FIELD_EXIST:
          return {
            ...(error.action.login && {
              login: 'Такой пользователь уже существует',
            }),
            ...(error.action.email && {
              email: 'Такая почта уже зарегистрирована',
            }),
          }
        default:
          return { [FORM_ERROR]: 'Непредвиденная ошибка' }
      }
    }
  }

  return (
    <Container>
      <Form
        onSubmit={handleSubmit}
        subscription={{ submitting: true, submitError: true }}
        render={({
          handleSubmit,
          submitting,
          submitError,
          dirtySinceLastSubmit,
          form,
        }) => (
          <Box mt={4}>
            <form onSubmit={handleSubmit}>
              <Grid
                container
                direction={'column'}
                alignItems={'center'}
                spacing={3}
              >
                <Grid container item xs={12} sm={8} md={6} lg={4}>
                  <Typography variant={'h4'}>
                    {isRegister ? 'Регистрация' : 'Вход'} в DnD+
                  </Typography>
                </Grid>
                <Grid container item xs={12} sm={8} md={6} lg={4}>
                  <Field
                    name={'login'}
                    label={'Логин'}
                    validate={isRegister ? loginValidator : requiredValidator}
                    component={MuiField}
                  />
                </Grid>
                {isRegister && (
                  <Grid container item xs={12} sm={8} md={6} lg={4}>
                    <Field
                      name={'email'}
                      validate={emailValidator}
                      label={'Почта'}
                      component={MuiField}
                    />
                  </Grid>
                )}
                <Grid container item xs={12} sm={8} md={6} lg={4}>
                  <Field
                    name={'password'}
                    label={'Пароль'}
                    type={'password'}
                    validate={
                      isRegister ? passwordValidator : requiredValidator
                    }
                    component={MuiField}
                  />
                </Grid>
                {isRegister && (
                  <Grid container item xs={12} sm={8} md={6} lg={4}>
                    <Field
                      name={'repeatPassword'}
                      label={'Повторите пароль'}
                      type={'password'}
                      validate={(value, formValues: any) => {
                        if (value !== formValues.password) {
                          return 'Пароли не совпадают'
                        }
                      }}
                      component={MuiField}
                    />
                  </Grid>
                )}
                <Grid container item xs={12} sm={8} md={6} lg={4}>
                  <ButtonGroup
                    variant={'contained'}
                    color={'primary'}
                    ref={anchorRef}
                    size={'large'}
                    fullWidth
                  >
                    <Button type={'submit'} disabled={submitting} fullWidth>
                      {isRegister ? 'Зарегистрироваться' : 'Войти'}
                    </Button>
                    <Button
                      onClick={toggleIsOpenPopper}
                      style={{ width: 'auto' }}
                    >
                      <ArrowDropDown />
                    </Button>
                  </ButtonGroup>
                  <Popper
                    open={isOpenPopper}
                    anchorEl={anchorRef.current}
                    transition
                    disablePortal
                    placement={'bottom-end'}
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === 'bottom'
                              ? 'center top'
                              : 'center bottom',
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={toggleIsOpenPopper}>
                            <MenuList>
                              <MenuItem
                                selected={!isRegister}
                                onClick={() => {
                                  toggleIsRegister(false)
                                  toggleIsOpenPopper()
                                  // form.resetFieldState(FORM_ERROR)
                                }}
                              >
                                Войти
                              </MenuItem>
                              <MenuItem
                                selected={isRegister}
                                onClick={() => {
                                  toggleIsRegister(true)
                                  toggleIsOpenPopper()
                                  // form.resetFieldState(FORM_ERROR)
                                }}
                              >
                                Зарегистрироваться
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </Grid>
                <Grid container item xs={12} sm={8} md={6} lg={4}>
                  {!dirtySinceLastSubmit && submitError && (
                    <Typography color={'error'}>{submitError}</Typography>
                  )}
                </Grid>
              </Grid>
            </form>
          </Box>
        )}
      />
    </Container>
  )
}
