import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Grid } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { FormGroup } from 'components/parts/ReactiveForm'
import { checkout } from 'services/api/order.service'
import { ordersPath } from 'config/routes'

import Table from './Table'


import Delivery from './Delivery'
import Recipient from './Recipient'
import Payment from './Payment'
import { createForm } from './formConfig'


class Preorder extends Component {
  constructor(props) {
    super(props)
    this.form = createForm()
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
    this.form.onSubmit((formData) => {
      const { values } = formData
      const dataToSend = { ...values }
      if (dataToSend.deliveryType === 2) {
        dataToSend.city = dataToSend.city.city_ref
        dataToSend.warehouse = dataToSend.warehouse.value
      } else {
        dataToSend.city = ''
        dataToSend.warehouse = ''
      }
      if (dataToSend.paymentType === 2) {
        dataToSend.CODPayer = ''
      }
      if (dataToSend.customerType === 2) {
        dataToSend.EDRPOU = ''
      }
      const products = cart.map(({ count, product }) => ({ count, id: product.id }))
      dataToSend.phone = dataToSend.phone.replace(/\D+/g, '')
      checkout({ ...dataToSend, products }).then((success) => {
        if (success) {
          const { history } = this.props
          history.push(ordersPath)
        }
      })
    })
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} lg={7}>
          <Table cartData={cart} />
          <Grid style={{ marginTop: 8, marginBottom: 8 }} container spacing={1}>
            <Grid item xs={12} sm={6} xl={3}>
              <Button variant='contained' color='primary' fullWidth onClick={this.form.submit}>Оформить</Button>
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <Button variant='contained' color='primary' disabled fullWidth>Зарезерваировать</Button>
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <Button variant='contained' color='primary' disabled fullWidth>Выписать Счет</Button>
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <Button variant='contained' color='primary' disabled fullWidth>Сохранить Шаблон</Button>
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
  getDeliveryMethods: () => {},
  getPaymentMethods: () => {},
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
