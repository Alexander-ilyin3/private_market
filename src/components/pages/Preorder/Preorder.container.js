import { connect } from 'react-redux'

import { getCart } from 'storage/selectors/cart.selector'

import Preorder from './Preorder'

const mapStateToProps = state => ({
  cart: getCart(state),
})

export default connect(mapStateToProps)(Preorder)
