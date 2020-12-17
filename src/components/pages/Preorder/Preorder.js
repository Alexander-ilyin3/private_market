import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import { checkout } from 'services/api/order.service'
import { onlyClientOrGreater } from 'config/roles'

import SelectorRender from 'components/parts/FormParts/Selector'

import NovaPoshtaForm from './novaPoshtaForm'
import Table from './Table'


const deliveryMethodsRenderMap = {
  2: NovaPoshtaForm,
}

class Preorder extends Component {
  state = {
    deliveryType: 2,
    form: null,
  }

  isClientOrGreater = onlyClientOrGreater()

  componentDidMount() {
    const { getDeliveryMethods } = this.props
    getDeliveryMethods()
  }

  setForm = (form) => {
    this.setState({ form })
  }

  sendForm = () => {
    const { form } = this.state
    if (form) form.submit(checkout)
  }

  render() {
    const {
      cart,
      deliveryMethods,
    } = this.props
    const { deliveryType } = this.state
    const CurrentOrderForm = deliveryMethodsRenderMap[deliveryType]
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} lg={7}>
          <Table cartData={cart} />
          <Grid style={{ marginTop: 8, marginBottom: 8 }} container spacing={1}>
            <Grid item xs={12} sm={6} xl={3}>
              <Button variant='contained' color='primary' disabled={!this.isClientOrGreater} fullWidth onClick={this.sendForm}>Оформить</Button>
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <Button variant='contained' color='primary' disabled fullWidth>Зарезерваировать</Button>
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <Button variant='contained' color='primary' disabled fullWidth>Выписать Счет</Button>
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <Button variant='contained' color='primary' disabled={this.isClientOrGreater} fullWidth onClick={this.sendForm}>Сохранить Шаблон</Button>
            </Grid>
            <Grid item xs={false} md={3} xl={4} />
            <Grid item xs={12} md={6} xl={4}>
              <Button variant='contained' color='primary' disabled fullWidth>Оплатить и Оформить</Button>
            </Grid>
            <Grid item xs={false} md={3} xl={4} />
          </Grid>
        </Grid>
        <Grid item xs={12} lg={5}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper style={{ padding: 16 }}>
                <Grid container style={{ alignItems: 'center' }}>
                  <Grid item sm={12} md={6}>
                    <Typography variant='h5'>
                      Способ оставки
                    </Typography>
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <SelectorRender
                      handlers={{
                        onChange: ({ target }) => { this.setState({ deliveryType: target.value }) },
                      }}
                      value={deliveryType}
                      items={deliveryMethods.map(({ id, name }) => ({ value: id, label: name }))}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            {CurrentOrderForm ? <CurrentOrderForm cart={cart} deliveryType={deliveryType} setForm={this.setForm} /> : ''}
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

Preorder.defaultProps = {
  cart: [],
  deliveryMethods: [],
  getDeliveryMethods: () => { },
}

Preorder.propTypes = {
  cart: PropTypes.array,
  deliveryMethods: PropTypes.array,
  getDeliveryMethods: PropTypes.func,
}

export default Preorder
