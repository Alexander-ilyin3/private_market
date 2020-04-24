import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Paper,
  Card,
  Avatar,
  CardHeader,
  Typography,
} from '@material-ui/core'
import { Security } from '@material-ui/icons'
import classNames from 'classnames'

import { checkToken, resetPassword } from 'services/login.service'
import { signInPath } from 'config/routes'

import {
  ControlGroup,
  FormGroup,
  FormControl,
  validators,
  useForceUpdate,
} from 'components/parts/ReactiveForm'

import BrokenToken from './BrokenToken'
import PasswordInputRender from './PasswordInputRender'

const {
  required,
  password,
  compareWith,
  validateSibling,
} = validators


const RestorePassword = (props) => {
  const { classes, location, history } = props
  const formUpdated = useForceUpdate()
  const [tokenChecked, onTokenChecked] = useState(null)
  const [token, setToken] = useState(null)
  const [formError, setFormError] = useState(null)
  const [form] = useState(new ControlGroup({
    password: { meta: { label: 'Новый Пароль' }, validators: [required, password, validateSibling] },
    passwordConfirm: { meta: { label: 'Подтверждение Пароля' } },
  }))
  form.onValidChanged(() => {
    formUpdated()
  })
  useEffect(() => {
    const token = location.search.slice(location.search.indexOf('=') + 1)
    setToken(token)
    const passwordConfirmField = form.get('passwordConfirm')
    passwordConfirmField.addValidator(compareWith(form.get('password')))
    form.get('password').addValidator(validateSibling(passwordConfirmField))
    checkToken(token).then(({ success, message }) => {
      if (success) {
        onTokenChecked({ success })
      } else {
        onTokenChecked({ success, message })
      }
    })
  }, [form])
  const onSubmit = (e) => {
    form.setAsSubmited()
    e.preventDefault()
    if (!form.valid) {
      form.validateAll()
    }
    if (form.valid) {
      const { password, passwordConfirm } = form.values
      resetPassword({ password, password_confirmation: passwordConfirm, token })
        .then(({ success, message }) => {
          if (success) {
            history.push(signInPath)
          } else {
            setFormError(message)
            form.setAsInvalid()
          }
        })
    }
  }
  if (tokenChecked) {
    return (
      tokenChecked.success
        ? (
          <Paper
            elevation={5}
            square
            className={
              classNames(classes.singleForm, form.submited && !form.valid && classes.error)
            }
          >
            <div className={classes.head}>
              <Avatar className={classes.avatar} component='span'>
                <Security />
              </Avatar>
            </div>
            <Card className={classes.card}>
              {form.submited && !form.valid && (
                <Typography
                  className={classes.formError}
                  color='error'
                >
                  {formError}
                </Typography>
              )}
              <form onSubmit={onSubmit}>
                <CardHeader
                  classes={{ title: classes.title }}
                  title='Установить Новый Пароль'
                />
                <FormGroup controlGroup={form}>
                  <div>
                    <FormControl name='password' render={PasswordInputRender} />
                  </div>
                  <div>
                    <FormControl name='passwordConfirm' render={PasswordInputRender} />
                  </div>
                </FormGroup>
                <Button
                  variant='contained'
                  color='primary'
                  fullWidth
                  type='submit'
                  style={{ marginTop: 20 }}
                >
                  Изменить Пароль
                </Button>
              </form>
            </Card>
          </Paper>
        ) : <BrokenToken message={tokenChecked.message} />
    )
  }
  return null
}

RestorePassword.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default RestorePassword
