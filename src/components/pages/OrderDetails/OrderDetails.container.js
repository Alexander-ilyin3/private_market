import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles'

import { getOrder } from 'services/api/order.service'
import { orderDetails } from 'storage/selectors/order'

import OrderDetails from './OrderDetails'
import { styles } from './OrderDetails.styles'

const mapSteteToProps = state => ({
  order: orderDetails(state),
})

const mapDispatchToProps = dispatch => ({
  getOrder: id => dispatch(getOrder(id)),
})

export default connect(mapSteteToProps, mapDispatchToProps)(withStyles(styles)(OrderDetails))
