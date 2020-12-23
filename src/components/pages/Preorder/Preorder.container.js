import { connect } from 'react-redux'

import { getDeliveryMethods } from 'services/api/order.service'
import { deliveryMethods } from 'storage/selectors/deliveryMethods.selector'
import { getCart } from 'storage/selectors/cart.selector'

import Preorder from './Preorder'

const mapStateToProps = state => ({
  cart: getCart(state),
  deliveryMethods: deliveryMethods(state),
})

const mapDispatchToProps = dispatch => ({
  getDeliveryMethods: () => dispatch(getDeliveryMethods),
})

export default connect(mapStateToProps, mapDispatchToProps)(Preorder)
