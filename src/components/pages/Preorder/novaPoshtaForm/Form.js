import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

import { ordersPath } from 'config/routes'
import { showSnack } from 'storage/actions/snack.actions'

import { FormGroup, FormControl } from 'components/parts/ReactiveForm'

import Delivery from './Delivery'
import Recipient from './Recipient'
import Payment from './Payment'
import { createForm } from './formConfig'


class NovaPoshtaForm extends PureComponent {
  constructor(props) {
    super(props)
    const { getPaymentMethods } = props
    this.form = createForm()
    getPaymentMethods()
  }

  componentDidMount() {
    const { setForm } = this.props
    setForm(this.form)
  }


  render() {
    const {
      user,
      paymentMethods,
      cart,
      deliveryType,
    } = this.props

    this.form.onSubmit((formData, apiMethod) => {
      const { values } = formData
      const dataToSend = { ...values }
      dataToSend.city = dataToSend.city.city_ref
      dataToSend.warehouse = dataToSend.warehouse.value
      if (dataToSend.paymentType === 2) {
        dataToSend.CODPayer = ''
      }
      if (dataToSend.customerType === 2) {
        dataToSend.EDRPOU = ''
      }
      if (!dataToSend.toDoor) {
        dataToSend.deliveryAddress = null
        dataToSend.toDoor = ''
      } else {
        dataToSend.deliveryAddress = {
          street_ref: dataToSend.deliveryStreet.ref,
          house_num: dataToSend.deliveryHouseNumber,
          flat_num: dataToSend.deliveryApartamentNumber,
        }
        dataToSend.warehouse = ''
      }
      const products = cart.map(({ count, product }) => ({ count, id: product.id }))
      dataToSend.phone = `38${dataToSend.phone.replace(/\D+/g, '')}`
      dataToSend.name = dataToSend.name.replace(/\s+/g, ' ').trim()

      apiMethod({ ...dataToSend, products, deliveryType }).then((success) => {
        if (success) {
          const { history } = this.props
          history.push(ordersPath)
        }
      }).catch((err) => {
        const { response } = err
        if (response) {
          const { data } = response
          if (data && data.errors) {
            const { errors } = data
            Object.keys(errors).forEach((key) => {
              showSnack({
                variant: 'error',
                message: errors[key].join(' '),
                noAutohide: true,
              })
            })
            if (errors['deliveryAddress.flat_num']) {
              this.form.get('deliveryApartamentNumber').setError('deliveryAddress.flat_num', errors['deliveryAddress.flat_num'].join(' '))
            }
            if (errors['deliveryAddress.house_num']) {
              this.form.get('deliveryHouseNumber').setError('deliveryAddress.house_num', errors['deliveryAddress.house_num'].join(' '))
            }
            if (errors['deliveryAddress.street_ref']) {
              this.form.get('deliveryStreet').setError('deliveryAddress.street_ref', errors['deliveryAddress.street_ref'].join(' '))
            }
            Object.keys(errors).forEach((errorName) => {
              const control = this.form.get(errorName)
              if (control) {
                control.setError(errorName, errors[errorName].join(' '))
              }
            })
          }
          if (data && data.error) {
            if (typeof data.error === 'string') {
              showSnack({
                variant: 'error',
                message: data.error,
              })
            }
          }
        }
      })
    })

    return (
      <FormGroup
        controlGroup={this.form}
        render={({ valid, submited, formError }) => (
          <>
            {submited && !valid && formError && <Typography variant='caption' color='error'>{formError}</Typography>}
            <Grid item xs={12}>
              <Delivery />
            </Grid>
            <Grid item xs={12}>
              <Recipient
                user={user}
              />
            </Grid>
            <Grid item xs={12}>
              <Payment paymentMethods={paymentMethods} />
            </Grid>
            <Grid item xs={12}>
              <Paper style={{ padding: 16 }}>
                <Typography variant='h5'>
                  Комментарий
                </Typography>
                <FormControl
                  name='comment'
                  render={({
                    handlers,
                    value,
                  }) => (
                    <TextField
                      variant='outlined'
                      multiline
                      fullWidth
                      value={value || ''}
                      {...handlers}
                    />
                  )}
                />
              </Paper>
            </Grid>
          </>
        )}
      />
    )
  }
}

NovaPoshtaForm.defaultProps = {
  paymentMethods: [],
  cart: [],
}

NovaPoshtaForm.propTypes = {
  user: PropTypes.object.isRequired,
  paymentMethods: PropTypes.array,
  cart: PropTypes.array,
  getPaymentMethods: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  setForm: PropTypes.func.isRequired,
  deliveryType: PropTypes.number.isRequired,
}

export default NovaPoshtaForm
