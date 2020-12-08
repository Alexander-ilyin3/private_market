import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'


import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import Table from './Table'

const orderLabels = {
  created_at: 'Создан',
  updated_at: 'Обновлен',
  deliveryType: 'Способ доставки',
  city: 'Город',
  warehouse: 'Склад',
  customerType: 'Тип Клиента',
  EDRPOU: 'ЕДРПОУ',
  name: 'Имя/Название',
  phone: 'Телефон',
  CODPayer: 'Плательщик за наложку',
  deliveryPayer: 'Плательщик доставки',
  paymentType: 'Способ оплаты',
  pyment_amount: 'Сумма',
  insuranceAmount: 'Страховка',
  insurancePayment: 'Форма оплаты',
  total_price: 'Общая сумма',
  volume: 'Объем',
  weight: 'Вес',
  status: 'Статус',
  ttn: 'ТТН',
}

const OrderDetails = ({
  order,
  getOrder,
  classes,
}) => {
  const { id } = useParams()
  useEffect(() => {
    getOrder(id)
  }, [id, getOrder])
  const {
    products,
  } = order
  const isDate = element => element && element.date
  const renderDetail = (name, i) => {
    let value = order[name]
    if (isDate(order[name])) {
      value = order[name].date.slice(0, order[name].date.length - 7)
    }
    if (name === 'status') {
      value = order[name].comment || 'Не установлен'
    }
    return (
      <div key={name} className={classNames({ [classes.odd]: !(i % 2) }, classes.detail)}>
        <Typography style={{ whiteSpace: 'nowrap' }} variant='h6'>{orderLabels[name]} :</Typography>
        <Typography style={{ whiteSpace: 'break-spaces' }} align='right'>{value}</Typography>
      </div>
    )
}
  return (
    <Paper>
      <Typography align='center' variant='h4'>
        Заказ № {id}
      </Typography>
      <div className={classes.detailsList}>
        {Object.keys(orderLabels).filter(key => !!order[key]).map(renderDetail)}
      </div>
      <Table products={products} />
    </Paper>
  )
}

OrderDetails.defaultProps = {
  order: {
    products: [],
  },
}

OrderDetails.propTypes = {
  getOrder: PropTypes.func.isRequired,
  order: PropTypes.object,
  classes: PropTypes.object.isRequired,
}

export default OrderDetails
