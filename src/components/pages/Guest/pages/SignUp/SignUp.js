import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import AccountCircleIcon from '@material-ui/icons/PersonOutlineOutlined'
import Checkbox from '@material-ui/core/Checkbox'
import FormHelperText from '@material-ui/core/FormHelperText'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'

import { signup } from 'services/api/login.service'
import { registerSuccessPath, signInPath } from 'config/routes'
import MaskedPhone from 'components/assets/MaskedPhone'


const forbiddenDomains = ['mail.ru', 'yandex.ua', 'yandex.ru', 'inbox.ru', 'list.ru', 'bk.ru', 'mail.ua', 'rambler.ru']

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errMsg: '',
      error: false,
      name: {
        value: '',
        isValid: false,
        errMsg: 'слишком короткое имя',
      },
      phone: {
        value: '',
        isValid: false,
        errMsg: 'введите корректный номер',
      },
      url: {
        value: '',
        isValid: false,
        errMsg: 'некорректный url',
      },
      email: {
        value: '',
        isValid: false,
        errMsg: 'Некорректный email',
      },
      password: {
        value: '',
        isValid: false,
        errMsg: 'Пароль должен быть не короче 8 символов, содержать латинские буквы верхнего и нижнего регистра, а  также цифры.',
      },
      repeatPassword: {
        value: '',
        isValid: false,
        errMsg: 'Пароли не совпадают',
      },
      agree: false,
      isChecked: false,
      isValid: false,
    }
  }

  handleInput = (field, value) => {
    this.setState((state) => {
      state[field].value = value
      state.error = false
      return state
    })
    this.validateField(field, value)
    this.validateForm()
  }

  validateField = (field, value) => {
    const { password } = this.state
    let valid = false
    let errMsg = ''
    switch (field) {
      case 'name':
        valid = (value.length > 2)
        break
      case 'phone':
        valid = !!value.match(/\(0\d\d\)\d\d\d-\d\d-\d\d/)
        break
      case 'url':
        valid = !!value.match(/\w+\.\w{2}/)
        break
      case 'email':
        valid = !!value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        errMsg = 'Некорректный email'
        if (forbiddenDomains.find(domain => value.includes(domain))) {
          valid = false
          errMsg = 'Пожалуйста, используйте другой почтовый адрес. Рекомендуем использовать Gmail, Ukr.net, Outlook.com, Bigmir.net или I.UA.'
        }
        break
      case 'password':
        valid = !!value.match(/(?=^.{8,}$)^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/)
        break
      case 'repeatPassword':
        valid = (value === password.value)
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
      currentState.isValid = (
        currentState.name.isValid
        && currentState.phone.isValid
        && currentState.url.isValid
        && currentState.email.isValid
        && currentState.password.isValid
        && currentState.repeatPassword.isValid
        && currentState.agree
      )
      return currentState
    })
  }

  handleSign = (e) => {
    const {
      name,
      phone,
      url,
      email,
      password,
      repeatPassword,
      isValid,
    } = this.state

    const { history } = this.props

    e.preventDefault()
    this.setState({ isChecked: true })
    this.validateForm()
    if (isValid) { // u can't declare "isValid" in top of this function, because function "validateForm" updating "isValid" async and at the moment of spreading state in top of function, it's value can ba different
      signup({
        name: name.value,
        phone: phone.value.replace(/\D+/g, ''),
        url: url.value,
        email: email.value,
        password: password.value,
        repeatPassword: repeatPassword.value,
      }).then((success) => {
        if (success) {
          history.push(registerSuccessPath)
        }
      }).catch((err) => {
        if (err) {
          this.setState({ errMsg: err.message, error: true })
        }
      })
    }
    return false
  }

  render() {
    const { classes } = this.props
    const {
      error,
      errMsg,
      isValid,
      isChecked,
      name,
      url,
      phone,
      email,
      password,
      repeatPassword,
      agree,
    } = this.state
    return (
      <div>
        <Paper elevation={5} square className={classNames(classes.signup, error && classes.error)}>
          <div className={classes.head}>
            <Avatar className={classes.avatar} component='span'>
              <AccountCircleIcon />
            </Avatar>
          </div>
          <Card className={classes.card}>
            <form onSubmit={this.handleSign}>
              <CardHeader
                classes={{ title: classes.title }}
                title='РЕГИСТРАЦИЯ'
              />
              <CardContent>
                <Typography
                  color='error'
                  align='center'
                >
                  {error && errMsg}
                </Typography>
                <TextField
                  error={isChecked && !isValid && name.errMsg && !name.isValid}
                  value={name.value}
                  onInput={(event) => { this.handleInput('name', event.target.value) }}
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  placeholder='Имя'
                  label='Имя'
                  helperText={isChecked && !isValid && !name.isValid && name.errMsg}
                />
                <TextField
                  error={isChecked && !isValid && phone.errMsg && !phone.isValid}
                  value={phone.value || '(0'}
                  onChange={event => this.handleInput('phone', event.target.value)}
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  placeholder='Телефон'
                  label='Телефон'
                  InputProps={{
                    inputComponent: MaskedPhone,
                  }}
                  helperText='Номер в формате (0xx)xxx-xx-xx'
                />
                <TextField
                  error={isChecked && !isValid && url.errMsg && !url.isValid}
                  value={url.value}
                  onInput={(event) => { this.handleInput('url', event.target.value) }}
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  placeholder='Сайт'
                  label='Сайт'
                  helperText={isChecked && !isValid && !url.isValid && url.errMsg}
                />
                <TextField
                  error={isChecked && !isValid && email.errMsg && !email.isValid}
                  value={email.value}
                  onInput={(event) => { this.handleInput('email', event.target.value) }}
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  placeholder='Емел'
                  label='Емейл'
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
                  placeholder='Пароль'
                  label='Пароль'
                  helperText={password.errMsg}
                />
                <TextField
                  error={isChecked && !isValid && repeatPassword.errMsg && !repeatPassword.isValid}
                  value={repeatPassword.value}
                  onInput={(event) => { this.handleInput('repeatPassword', event.target.value) }}
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  type='password'
                  placeholder='Подтверждение пароля'
                  label='Подтверждение пароля'
                  helperText={
                    isChecked && !isValid && !repeatPassword.isValid && repeatPassword.errMsg
                  }
                />
                <FormControlLabel
                  checked={agree}
                  control={(
                    <Checkbox
                      color='primary'
                      onChange={(event) => {
                        this.setState({ agree: event.target.checked })
                        this.validateForm()
                      }}
                    />
                  )}
                  label='Я принимаю условия сотрудничества и даю согласие на оработку моих персональных данных'
                />
                {(isChecked && !isValid && !agree) && <FormHelperText margin='dense' error>Вы должны принять условия</FormHelperText>}
                <Button
                  variant='contained'
                  color='primary'
                  fullWidth
                  type='submit'
                  style={{ marginTop: 20 }}
                >
                  Зарегистрироваться
                </Button>
              </CardContent>
            </form>
            <Typography
              color='primary'
              paragraph
              align='center'
            >
              <Link to={signInPath} className={classes.link}>У меня уже есть аккаунт</Link>
            </Typography>
          </Card>
        </Paper>
      </div>
    )
  }
}

export default SignUp
