import { connect } from 'react-redux'
import withWidth from '@material-ui/core/withWidth'

import { getCart } from 'storage/selectors/cart.selector'

import CartIndicator from './CartIndicator'

const mapStateToProps = state => ({
  cart: getCart(state),
})

export default withWidth()(connect(mapStateToProps)(CartIndicator))
