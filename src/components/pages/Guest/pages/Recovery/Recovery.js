import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import LockOpen from '@material-ui/icons/LockOpen'
import classNames from 'classnames'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

import { recoveryPasswordSuccessPath, signInPath } from 'config/routes'
import { recovery } from 'services/api/login.service'
import { emailValidator, required } from 'components/parts/ReactiveForm/validators'


const validators = [emailValidator, required]

class Recovery extends Component {
  state = {
    errors: {},
    email: '',
    touched: false,
    valid: false,
  }

  handleSubmit = (e) => {
    const { email, valid } = this.state
    const { history } = this.props
    e.preventDefault()
    this.onFocusLeave()
    if (!valid) {
      return
    }
    recovery(email).then((success) => {
      if (success) {
        history.push(recoveryPasswordSuccessPath)
        this.setState({ errMsg: '', valid: true })
      }
    }).catch((err) => {
      if (err) {
        this.setState({ errMsg: err.message, valid: false })
      }
    })
  }

  handleInput = (event) => {
    const { value } = event.target
    this.setState({ email: value })
    this.validate(value)
  }

  validate = (value) => {
    let newErrors = {}
    validators.forEach((validator) => {
      newErrors = { ...newErrors, ...validator(value) }
    })
    const valid = !Object.keys(newErrors).find(errorName => newErrors[errorName])
    this.setState({
      errors: newErrors,
      valid,
    })
    return valid
  }

  onFocusLeave = (event = {}) => {
    const { email } = this.state
    const { target = {} } = event
    const { value } = target
    this.validate(value || email)
    this.setState({ touched: true })
  }

  getHelperText = () => {
    const errTextMap = {
      required: 'Поле обязательно для заполнения.\n',
      emailInvalid: 'Некорретный email адрес.\n',
    }
    const { errors } = this.state
    const errorName = Object.keys(errors)[0]
    if (errorName) {
      return errTextMap[errorName]
    }
  }

  render() {
    const { classes } = this.props
    const { errMsg, touched, valid } = this.state
    return (
      <div>
        <Paper elevation={5} square className={classNames(classes.signup, errMsg && classes.error)}>
          <div className={classes.head}>
            <Avatar
              className={classes.avatar}
              component='span'
            >
              <LockOpen />
            </Avatar>
          </div>
          <Card className={classes.card}>
            <form onSubmit={this.handleSubmit}>
              <CardHeader
                classes={{ title: classes.title }}
                title='Восстановление пароля'
              />
              <CardContent>
                <Typography
                  color='error'
                  align='center'
                >
                  {errMsg}
                </Typography>
                <TextField
                  onInput={event => this.handleInput(event)}
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  placeholder='Email'
                  label='Email'
                  helperText={(touched && !valid) && this.getHelperText()}
                  error={touched && !valid}
                  onBlur={this.onFocusLeave}
                />
                <Button
                  variant='contained'
                  color='primary'
                  fullWidth
                  type='submit'
                  style={{ marginTop: 20 }}
                >
                  Восстановить
                </Button>
              </CardContent>
            </form>
            <Typography
              color='primary'
              paragraph
              align='center'
            >
              <Link to={signInPath} className={classes.link}>Страница авторизации</Link>
            </Typography>
          </Card>
        </Paper>
      </div>
    )
  }
}

export default Recovery

Recovery.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}
