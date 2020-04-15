import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AccountCircleIcon from '@material-ui/icons/PersonOutlineOutlined'
import CheckIcon from '@material-ui/icons/Check'
import classNames from 'classnames'

import { signUpPath, recoveryPasswordPath } from 'config/routes'

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      errMsg: '',
      email: {
        value: '',
        isValid: false,
        errMsg: 'Некорректный email',
      },
      password: {
        value: '',
        isValid: false,
        errMsg: 'Слишком короткий пароль',
      },
      remember: false,
      isValid: false,
      isChecked: false,
    }
  }

  handleInput = (field, value) => {
    this.setState((state) => {
      state[field].value = value
      state.error = false
      state.errMsg = ''
      return state
    })
    this.validateField(field, value)
    this.validateForm()
  }

  validateField = (field, value) => {
    let valid = false
    let errMsg = ''
    switch (field) {
      case 'email':
        valid = !!value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        errMsg = 'Некорректный email'
        break
      case 'password':
        valid = !!value.match(/\s*([\w]{6,})\s*/)
        errMsg = 'Слишком короткий пароль'
        break
      default:
        break
    }
    this.setState((currentState) => {
      currentState[field].isValid = valid
      if (errMsg) currentState[field].errMsg = errMsg
      return currentState
    })
  }

  validateForm = () => {
    this.setState((currentState) => {
      currentState.isValid = (currentState.email.isValid && currentState.password.isValid)
      return currentState
    })
  }

  handleSign = (e) => {
    const {
      email,
      password,
      remember,
      isValid,
    } = this.state
    const { signin } = this.props
    e.preventDefault()
    this.setState({ isChecked: true })
    this.validateForm()
    if (isValid) {  // u can't declare "isValid" in top of this function, because function "validateForm" updating "isValid" async and at the moment of spreading state in top of function, it's value can ba different
      signin({
        email: email.value,
        password: password.value,
      })
    }
  }

  render() {
    const { classes } = this.props
    const {
      error,
      errMsg,
      email,
      password,
      remember,
      isValid,
      isChecked,
    } = this.state
    return (

      <div>
        <Paper elevation={5} square className={classes.login}>
          <Grid container>
            <Grid
              item
              md={6}
              sm={12}
              className={
               classNames(classes.entrance, error && classes.error)
              }
            >
              <div className={classes.head}>
                <Avatar
                  className={classes.avatar}
                  component='span'
                >
                  <AccountCircleIcon />
                </Avatar>
              </div>
              <Card className={classes.card}>
                <form onSubmit={this.handleSign}>
                  <CardHeader
                    classes={{ title: classes.title }}
                    title='ВХОД'
                  />
                  <CardContent>
                    <Typography
                      color='error'
                      align='center'
                    >
                      {error && errMsg}
                    </Typography>
                    <TextField
                      error={isChecked && !isValid && email.errMsg && !email.isValid}
                      value={email.value}
                      onInput={(event) => { this.handleInput('email', event.target.value) }}
                      variant='outlined'
                      fullWidth
                      margin='normal'
                      type='email'
                      placeholder='Email'
                      helperText={isChecked && !isValid && !email.isValid && email.errMsg}
                    />
                    <TextField
                      error={isChecked && !isValid && password.errMsg && !password.isValid}
                      value={password.value}
                      onInput={(event) => { this.handleInput('password', event.target.value) }}
                      variant='outlined'
                      fullWidth
                      margin='normal'
                      type='password'
                      placeholder='Password'
                      helperText={isChecked && !isValid && !password.isValid && password.errMsg}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <FormControlLabel
                        control={(
                          <Checkbox
                            color='primary'
                            checked={remember}
                            onChange={event => this.setState({ remember: event.target.checked })}
                          />
                        )}
                        label='Запомнить'
                      />
                      <Link to={recoveryPasswordPath} style={{ textDecoration: 'none' }}>
                        <Typography
                          color='primary'
                          variant='caption'
                        >
                          Забыли пароль?
                        </Typography>
                      </Link>
                    </div>
                    <Button
                      variant='contained'
                      color='primary'
                      fullWidth
                      type='submit'
                    >
                      Войти
                    </Button>
                  </CardContent>
                </form>
              </Card>
            </Grid>
            <Grid item md={6} sm={12} className={classes.noAcc}>
              <div>
                <Typography
                  variant='h4'
                  color='inherit'
                  paragraph
                  style={{ marginBottom: '3rem' }}
                >
                  Нет аккаута?
                </Typography>
                <Typography
                  variant='inherit'
                  color='inherit'
                  paragraph
                >
                  Зарегистриуйтесь и получите следующие преимущества.
                  <br />
                  Minim dolor in amet nulla laboris enim dolore.
                </Typography>
                <Typography
                  variant='body2'
                  color='inherit'
                  paragraph
                  noWrap
                >
                  <Typography
                    color='secondary'
                    paragraph={false}
                    component='span'
                    style={{ display: 'inline-block', verticalAlign: 'middle' }}
                  >
                    <CheckIcon />
                  </Typography>
                    Lorem Ipsum dolar set.
                </Typography>
                <Typography
                  variant='body2'
                  color='inherit'
                  paragraph
                  noWrap
                >
                  <Typography
                    color='secondary'
                    paragraph={false}
                    component='span'
                    style={{ display: 'inline-block', verticalAlign: 'middle' }}
                  >
                    <CheckIcon />
                  </Typography>
                    Lorem Ipsum dolar set.
                </Typography>
                <Typography
                  variant='body2'
                  color='inherit'
                  paragraph
                  noWrap
                >
                  <Typography
                    color='secondary'
                    paragraph={false}
                    component='span'
                    style={{ display: 'inline-block', verticalAlign: 'middle' }}
                  >
                    <CheckIcon />
                  </Typography>
                    Lorem Ipsum dolar set.
                </Typography>
                <Link to={signUpPath} style={{ textDecoration: 'none' }}>
                  <Button
                    variant='outlined'
                    color='secondary'
                  >
                    Регистрация
                  </Button>
                </Link>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </div>

    )
  }
}

export default SignIn
