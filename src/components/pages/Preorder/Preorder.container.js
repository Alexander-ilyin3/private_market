import { connect } from 'react-redux'

import { getDeliveryMethods, getPaymentMethods } from 'services/api/order.service'
import { deliveryMethods } from 'storage/selectors/deliveryMethods.selector'
import { paymentMethods } from 'storage/selectors/paymentMethod.selector'
import { getCart } from 'storage/selectors/cart.selector'
import { userData } from 'storage/selectors/userData.selector'

import Preorder from './Preorder'

const mapStateToProps = state => ({
  cart: getCart(state),
  user: userData(state),
  deliveryMethods: deliveryMethods(state),
  paymentMethods: paymentMethods(state),
})

const mapDispatchToProps = dispatch => ({
  getDeliveryMethods: () => dispatch(getDeliveryMethods),
  getPaymentMethods: () => dispatch(getPaymentMethods),
})

export default connect(mapStateToProps, mapDispatchToProps)(Preorder)
