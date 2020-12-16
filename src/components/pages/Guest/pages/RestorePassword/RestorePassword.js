import React, { Component } from 'react'
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

import { checkToken, resetPassword } from 'services/api/login.service'
import { signInPath } from 'config/routes'

import {
  ControlGroup,
  FormGroup,
  FormControl,
  validators,
} from 'components/parts/ReactiveForm'
import PasswordInputRender from 'components/parts/FormParts/PasswordInputRender'

import BrokenToken from './BrokenToken'

const {
  required,
  password,
  compareWith,
  validateSibling,
} = validators


export class RestorePassword extends Component {
  state = {
    tokenChecked: null,
    token: null,
    formError: null,
  }

  constructor(props) {
    super(props)
    this.form = new ControlGroup({
      password: { meta: { label: 'Новый Пароль' }, validators: [required, password, validateSibling] },
      passwordConfirm: { meta: { label: 'Подтверждение Пароля' } },
    })

    const passwordConfirmField = this.form.get('passwordConfirm')
    passwordConfirmField.addValidator(compareWith(this.form.get('password')))
    this.form.get('password').addValidator(validateSibling(passwordConfirmField))

    this.form.onSubmit(this.onSubmit)
  }

  componentDidMount() {
    const { location } = this.props
    const token = location.search.slice(location.search.indexOf('=') + 1)
    this.setState({ token })

    checkToken(token).then(({ success, message }) => {
      if (success) {
        this.setState({ tokenChecked: { success } })
      } else {
        this.setState({ tokenChecked: { success, message } })
      }
    })
  }

  onSubmit = (form) => {
    const { token } = this.state
    const { history } = this.props
    const { password, passwordConfirm } = form.values
    resetPassword({ password, password_confirmation: passwordConfirm, token })
      .then(({ success, message }) => {
        if (success) {
          history.push(signInPath)
        } else {
          this.setState({ formError: message })
          form.setAsInvalid()
        }
      })
  }

  render() {
    const { classes } = this.props
    const { tokenChecked, formError } = this.state

    if (tokenChecked) {
      return (
        tokenChecked.success
          ? (
            <FormGroup
              controlGroup={this.form}
              render={({ valid, submited, submit }) => (
                <Paper
                  elevation={5}
                  square
                  className={
                    classNames(classes.singleForm, submited && !valid && classes.error)
                  }
                >
                  <div className={classes.head}>
                    <Avatar className={classes.avatar} component='span'>
                      <Security />
                    </Avatar>
                  </div>
                  <Card className={classes.card}>
                    {submited && !valid && (
                      <Typography
                        className={classes.formError}
                        color='error'
                      >
                        {formError}
                      </Typography>
                    )}
                    <form onSubmit={submit}>
                      <CardHeader
                        classes={{ title: classes.title }}
                        title='Установить Новый Пароль'
                      />

                      <div>
                        <FormControl name='password' render={PasswordInputRender} />
                      </div>
                      <div>
                        <FormControl name='passwordConfirm' render={PasswordInputRender} />
                      </div>
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
              )}
            />
          ) : <BrokenToken message={tokenChecked.message} />
      )
    }
    return null
  }
}

RestorePassword.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default RestorePassword
