import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import Typograhy from '@material-ui/core/Typography'

import { preorderPath } from 'config/routes'
import { calculateCartTotal } from 'services/cart/cartHelpers'

const CartIndicator = (props) => {
  const { cart, width } = props
  const totalPrice = calculateCartTotal(cart)
  return totalPrice ? (
    <>
      <Button variant='contained' color='primary' component={Link} to={preorderPath}>Корзина</Button>
      <Typograhy variant={width === 'xs' ? 'subtitle2' : 'h6'} align='center' style={{ margin: '0 8px' }}>сумма: {totalPrice.toLocaleString()}</Typograhy>
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
