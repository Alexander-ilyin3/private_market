import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles'

import { getCart } from 'storage/selectors/cart.selector'

import Preorder from './Preorder'
import { styles } from './Preorder.styles'

const mapStateToProps = state => ({
  cart: getCart(state),
})

export default withStyles(styles)(connect(mapStateToProps)(Preorder))
