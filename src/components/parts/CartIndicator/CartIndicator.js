import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Typograhy from '@material-ui/core/Typography'

const CartIndicator = (props) => {
  const { cart } = props
  const totalPrice = cart.reduce((prev, current) => prev + Number(current.count) * Number(current.product.price.replace(',', '')), 0)
  return totalPrice ? (
    <>
      <Button variant='contained' color='primary'>Оформить заказ</Button>
      <Typograhy variant='h6' style={{ margin: '0 8px' }}>Общая сумма: {totalPrice.toLocaleString()}</Typograhy>
    </>
  ) : null
}

CartIndicator.defaultProps = {
  cart: [],
}

CartIndicator.propTypes = {
  cart: PropTypes.array,
}

export default CartIndicator
