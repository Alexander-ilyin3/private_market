import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'


import Paper from '@material-ui/core/Paper'

import Table from './Table'

const OrderDetails = ({
  order,
  getOrder,
}) => {
  const { id } = useParams()
  useEffect(() => {
    getOrder(id)
  }, [id, getOrder])
  const {
    CODPayer,
    city,
    created_at,
    customerType,
    customer_id,
    deliveryPayer,
    deliveryType,
    insuranceAmount,
    insurancePayment,
    name,
    paymentType,
    phone,
    products,
    pyment_amount,
    total_price,
    ttn,
    updated_at,
    volume,
    warehouse,
    weight,
  } = order
  return (
    <Paper>
      OrderPage
      <Table products={products} />
    </Paper>
  )
}


export default OrderDetails
