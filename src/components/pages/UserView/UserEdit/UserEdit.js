import React, { Component } from 'react'
import { object } from 'prop-types'
// import withStyles from '@material-ui/core/styles/withStyles';
import {
  Grid,
  Button,
  Dialog,
  DialogActions,
  TextField,
  DialogTitle,

} from '@material-ui/core'

import { updateProfile } from 'services/api/profile.service'

import MaskedPhone from 'components/assets/MaskedPhone'


class UserEdit extends Component {
  static propTypes = {
    classes: object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      ...props.user,
    }
  }

  handleClose = () => {
    const { onClose } = this.props
    onClose()
  };

  handleInput = (value, field) => {
    console.log(value)
    this.setState((currentState) => {
      currentState[field] = value
      return currentState
    })
  }

  handleOk = () => {
    const userData = { ...this.state }
    if (typeof userData.customerPhone === 'string') {
      userData.customerPhone = userData.customerPhone.replace(/\D+/g, '')
    }
    updateProfile(userData).then((resp) => {
      if (resp) {
        const { onOk } = this.props
        onOk()
        this.handleClose()
      }
    }).catch((err) => {
      console.log(err.message)
    })
  }

  render() {
    const { classes, open } = this.props
    const {
      city = '',
      houseNumber = '',
      street = '',
      officeNumber = '',
      customerPhone = '',
      customerPosition = '',
      customerWebsite = '',
      customerLastname = '',
      customerName = '',
    } = this.state
    console.log(customerPhone)
    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby='edit-user-data'
        open={open}
        classes={{ paper: classes.root }}
      >
        <DialogTitle
          style={{ textAlign: 'center' }}
        >
          Изменить личные данные
        </DialogTitle>
        <div className={classes.body}>
          <form>
            <TextField
              inputprops={{ tabIndex: '11' }}
              onInput={(e) => { this.handleInput(e.target.value, 'customerName') }}
              value={customerName || ''}
              label='Имя'
              variant='outlined'
              fullWidth
              margin='normal'
            />
            <TextField
              inputprops={{ tabIndex: '12' }}
              onInput={(e) => { this.handleInput(e.target.value, 'customerLastname') }}
              value={customerLastname || ''}
              label='Фамилия'
              variant='outlined'
              fullWidth
              margin='normal'
            />
            <TextField
              inputprops={{ tabIndex: '13' }}
              onInput={(e) => { this.handleInput(e.target.value, 'customerPosition') }}
              value={customerPosition || ''}
              label='Должность'
              variant='outlined'
              fullWidth
              margin='normal'
            />
            <Grid container spacing={8}>
              <Grid item xs={12} sm={6}>
                <TextField
                  inputprops={{ tabIndex: '14' }}
                  onInput={(e) => { this.handleInput(e.target.value, 'city') }}
                  value={city || ''}
                  label='Город'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  inputprops={{ tabIndex: '15' }}
                  onInput={(e) => { this.handleInput(e.target.value, 'street') }}
                  value={street || ''}
                  label='Улица'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  inputprops={{ tabIndex: '16' }}
                  onInput={(e) => { this.handleInput(e.target.value, 'houseNumber') }}
                  value={houseNumber || ''}
                  label='№ дома'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  inputprops={{ tabIndex: '17' }}
                  onInput={(e) => { this.handleInput(e.target.value, 'officeNumber') }}
                  value={officeNumber || ''}
                  label='№ офиса'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                />
              </Grid>
            </Grid>

            <TextField
              inputprops={{ tabIndex: '18' }}
              onInput={(e) => { this.handleInput(e.target.value, 'customerWebsite') }}
              value={customerWebsite || ''}
              label='Сайт'
              variant='outlined'
              fullWidth
              margin='normal'
            />
            <TextField
              onChange={(e) => { this.handleInput(e.target.value, 'customerPhone') }}
              value={customerPhone || '(0'}
              variant='outlined'
              fullWidth
              margin='normal'
              placeholder='Телефон'
              label='Телефон'
              InputProps={{
                tabIndex: '19',
                inputComponent: MaskedPhone,
              }}
              helperText='Номер в формате (0xx)xxx-xx-xx'
            />

            <DialogActions>
              <Button
                variant='outlined'
                color='primary'
                onClick={this.handleClose}
              >
                закрыть
              </Button>
              <Button
                variant='contained'
                color='secondary'
                onClick={this.handleOk}
              >
                применить
              </Button>
            </DialogActions>
          </form>
        </div>
      </Dialog>
    )
  }
}

export default UserEdit
