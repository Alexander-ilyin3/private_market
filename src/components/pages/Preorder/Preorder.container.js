import { connect } from 'react-redux'

import { getCart } from 'storage/selectors/cart.selector'
import { userData } from 'storage/selectors/userData.selector'

import Preorder from './Preorder'

const mapStateToProps = state => ({
  cart: getCart(state),
  user: userData(state),
})

export default connect(mapStateToProps)(Preorder)
