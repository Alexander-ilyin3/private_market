import { connect } from 'react-redux'

import { getCart } from 'storage/selectors/cart.selector'

import CartIndicator from './CartIndicator'

const mapStateToProps = state => ({
  cart: getCart(state),
})

export default connect(mapStateToProps)(CartIndicator)
