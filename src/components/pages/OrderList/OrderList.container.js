import { connect } from 'react-redux'
import { orderList } from 'storage/selectors/order'
import { getOrderList } from 'services/api/order.service'

import OrderList from './OrderList'

const mapStateToProps = state => ({
  orderListInfo: orderList(state),
})

const mapDispatchToProps = dispatch => ({
  getOrderList: consfig => dispatch(getOrderList(consfig)),
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)
