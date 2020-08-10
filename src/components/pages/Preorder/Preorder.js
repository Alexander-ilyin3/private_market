import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Grid } from '@material-ui/core'
import Button from '@material-ui/core/Button'

import { FormGroup } from 'components/parts/ReactiveForm'

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
            render={({ valid, submited, submit }) => (
              <form>
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
}

Preorder.propTypes = {
  cart: PropTypes.array,
  user: PropTypes.object,
}

export default Preorder
