import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Grid } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

import { FormGroup, FormControl } from 'components/parts/ReactiveForm'
import { checkout, saveTemplate } from 'services/api/order.service'
import { ordersPath } from 'config/routes'
import { onlyClientOrGreater } from 'config/roles'

import Table from './Table'


import Delivery from './Delivery'
import Recipient from './Recipient'
import Payment from './Payment'
import { createForm } from './formConfig'


class Preorder extends Component {
  constructor(props) {
    super(props)
    this.form = createForm()
    this.isClientOrGreater = onlyClientOrGreater()
    const { getDeliveryMethods, getPaymentMethods } = props
    getDeliveryMethods()
    getPaymentMethods()
  }

  render() {
    const {
      cart,
      user,
      deliveryMethods,
      paymentMethods,
    } = this.props
    this.form.onSubmit((formData, apiMethod) => {
      const { values } = formData
      const dataToSend = { ...values }
      if (dataToSend.deliveryType === 2) {
        dataToSend.city = dataToSend.city.city_ref
        dataToSend.warehouse = dataToSend.warehouse.value
        dataToSend.deliveryStreet = dataToSend.deliveryStreet.ref
      } else {
        dataToSend.city = ''
        dataToSend.warehouse = ''
        dataToSend.deliveryStreet = ''
        dataToSend.deliveryHouseNumber = ''
        dataToSend.deliveryApartamentNumber = ''
      }
      if (dataToSend.paymentType === 2) {
        dataToSend.CODPayer = ''
      }
      if (dataToSend.customerType === 2) {
        dataToSend.EDRPOU = ''
      }
      if (!dataToSend.toDoor) {
        dataToSend.deliveryAddress = ''
        dataToSend.deliveryStreet = ''
        dataToSend.deliveryHouseNumber = ''
        dataToSend.deliveryApartamentNumber = ''
      }
      const products = cart.map(({ count, product }) => ({ count, id: product.id }))
      dataToSend.phone = dataToSend.phone.replace(/\D+/g, '')
      apiMethod({ ...dataToSend, products }).then((success) => {
        if (success) {
          const { history } = this.props
          history.push(ordersPath)
        }
      }).catch()
    })
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} lg={7}>
          <Table cartData={cart} />
          <Grid style={{ marginTop: 8, marginBottom: 8 }} container spacing={1}>
            <Grid item xs={12} sm={6} xl={3}>
              <Button variant='contained' color='primary' disabled={!this.isClientOrGreater} fullWidth onClick={() => this.form.submit(checkout)}>Оформить</Button>
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <Button variant='contained' color='primary' disabled fullWidth>Зарезерваировать</Button>
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <Button variant='contained' color='primary' disabled fullWidth>Выписать Счет</Button>
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <Button variant='contained' color='primary' disabled={this.isClientOrGreater} fullWidth onClick={() => this.form.submit(saveTemplate)}>Сохранить Шаблон</Button>
            </Grid>
            <Grid item xs={false} md={3} xl={4} />
            <Grid item xs={12} md={6} xl={4}>
              <Button variant='contained' color='primary' disabled fullWidth>Оплатить и Оформить</Button>
            </Grid>
            <Grid item xs={false} md={3} xl={4} />
          </Grid>
        </Grid>
        <Grid item xs={12} lg={5}>
          <FormGroup
            controlGroup={this.form}
            render={({ valid, submited, formError }) => (
              <form>
                {submited && !valid && formError && <Typography variant='caption' color='error'>{formError}</Typography>}
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Delivery
                      deliveryMethods={deliveryMethods}
                    />
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
                </Grid>
              </form>
            )}
          />
        </Grid>
      </Grid>
    )
  }
}

Preorder.defaultProps = {
  cart: [],
  user: {},
  deliveryMethods: [],
  paymentMethods: [],
  getDeliveryMethods: () => { },
  getPaymentMethods: () => { },
}

Preorder.propTypes = {
  cart: PropTypes.array,
  user: PropTypes.object,
  deliveryMethods: PropTypes.array,
  paymentMethods: PropTypes.array,
  getDeliveryMethods: PropTypes.func,
  getPaymentMethods: PropTypes.func,
}

export default Preorder
