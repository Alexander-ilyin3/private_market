import { connect } from 'react-redux'

import { getOrder } from 'services/api/order.service'
import { orderDetails } from 'storage/selectors/order'

import OrderDetails from './OrderDetails'

const mapSteteToProps = state => ({
  order: orderDetails(state),
})

const mapDispatchToProps = dispatch => ({
  getOrder: id => dispatch(getOrder(id)),
})

export default connect(mapSteteToProps, mapDispatchToProps)(OrderDetails)
