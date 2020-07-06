import React from 'react'
import PropTypes from 'prop-types'

import { Grid } from '@material-ui/core'
import Button from '@material-ui/core/Button'

import { checkout } from 'services/api/order.service'
import { FormGroup, ControlGroup } from 'components/parts/ReactiveForm'

import Table from './Table'


import Delivery from './Delivery'
import Recipient from './Recipient'
import Payment from './Payment'

const form = new ControlGroup({
  dateTime: { value: new Date(), meta: { label: 'Дата и время отправки:', type: 'picker', withLabel: true }, validators: [] },
  deliveryType: { value: 3, meta: { label: 'Способ доставки', type: 'select', withLabel: true }, validators: [] },
  city: { meta: { label: 'Город', withLabel: true, hide: true }, validators: [] },
  warehouse: { meta: { label: 'Склад', withLabel: true, hide: true }, validators: [] },
  toDoor: {
    value: false,
    meta: {
      label: 'Адресная доставка',
      align: 'left',
      withLabel: true,
      hide: true,
      type: 'checkbox',
    },
    validators: [],
  },
  deliveryAddress: { meta: { label: 'Адрес доставки', withLabel: true, hide: true }, validators: [] },

  customerType: { meta: { label: 'Юр/Физ лицо', type: 'select' } },
  name: { meta: { label: 'Название / ФИО' } },
  phone: { value: '0', meta: { label: 'Телефон', withLabel: true } },
  paymentType: { meta: { label: 'Способ оплаты', type: 'select' } },
  pymentAmount: { meta: { label: 'Сумма' } },
  deliveryPayer: { meta: { label: 'Плательщик доставки', type: 'select' } },
  CODPayer: { meta: { label: 'Плательщик за наложку', type: 'select' } },
  insuranceAmount: { meta: { label: 'Сумма страховки' } },
  insurancePayment: { meta: { label: 'Способ оплаты страховки', type: 'select' } },
})

const cityFormItem = form.get('city')
const warehouseFormItem = form.get('warehouse')
const toDoorFormItem = form.get('toDoor')
const deliveryAddressFormItem = form.get('deliveryAddress')

toDoorFormItem.valueChanges((val) => {
  deliveryAddressFormItem.setMeta({ hide: !val })
  warehouseFormItem.setMeta({ hide: val })
})

form.get('deliveryType').valueChanges((val) => {
  cityFormItem.setMeta({ hide: val !== 1 })
  warehouseFormItem.setMeta({ hide: val !== 1 || toDoorFormItem.value })
  toDoorFormItem.setMeta({ hide: val !== 1 })
  deliveryAddressFormItem.setMeta({ hide: val !== 1 || !toDoorFormItem.value })
})

const Preorder = (props) => {
  const { cart, user } = props
  // const cartData = cart.map(item => ({
  //   ...item.product,
  //   count: item.count,
  //   total: (Number(item.product.price.replace(',', '')) * item.count).toLocaleString(),
  // }))

  const getDataForSend = () => ({
    // recipient_name: recipienName,
    // recipient_email: user.customerEmail,
    // recipient_adress: [
    //   user.city,
    //   user.street,
    //   user.houseNumber,
    //   user.officeNumber,
    // ].filter(item => !!item).join(', '),
    // recipient_phone: recipientPhone.replace(/\D+/g, ''),
    // delivery,
    // payment_delivery: payment,
    // date_delivery: format(selectedDate, 'yyyy-MM-dd HH:mm:ss'),
    // products: cartData.map(product => ({ id: product.id, count: product.count })),
  })


  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={7}>
        <Table cartData={cart} />
        <Grid style={{ marginTop: 8, marginBottom: 8 }} container spacing={1}>
          <Grid item xs={12} sm={6} xl={3}>
            <Button variant='contained' color='primary' fullWidth onClick={() => setTimeout(() => checkout(getDataForSend()))}>Оформить</Button>
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
          controlGroup={form}
          render={({ valid, submited, submit }) => (
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Delivery />
                </Grid>
                <Grid item xs={12}>
                  <Recipient
                    user={user}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Payment />
                </Grid>
              </Grid>
            </form>
          )}
        />
      </Grid>
    </Grid>
  )
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
