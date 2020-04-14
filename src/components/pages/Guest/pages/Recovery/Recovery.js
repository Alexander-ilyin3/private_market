import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import AccountCircleIcon from '@material-ui/icons/PersonOutlineOutlined'
import classNames from 'classnames'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

import { recoveryPasswordPath, signInPath } from 'config/routes'
import { recovery } from 'services/api'


class Recovery extends Component {
  state = {
    errMsg: '',
    email: '',
  }

  handleSubmit = (e) => {
    const { email } = this.state
    const { history } = this.props
    e.preventDefault()

    recovery(email).then((success) => {
      if (success) {
        history.push(recoveryPasswordPath)
      }
    }).catch((err) => {
      if (err) {
        this.setState({ errMsg: err.message, error: true })
      }
    })
    history.push(recoveryPasswordPath)
  }

  render() {
    const { classes } = this.props
    const { errMsg, email } = this.state
    return (
      <div>
        <Paper elevation={5} square className={classNames(classes.signup, errMsg && classes.error)}>
          <div className={classes.head}>
            <Avatar
              className={classes.avatar}
              component='span'
            >
              <AccountCircleIcon />
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
                  value={email}
                  onInput={(event) => { this.setState({ email: event.target.value, errMsg: '' }) }}
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  placeholder='Email'
                  label='Email'
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
