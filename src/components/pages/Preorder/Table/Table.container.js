import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles'

import { getCart } from 'storage/selectors/cart.selector'
import { userData } from 'storage/selectors/userData.selector'

import Table from './Table'
import { styles } from './Table.styles'

const mapStateToProps = state => ({
  cart: getCart(state),
  user: userData(state),
})


export default withStyles(styles)(connect(mapStateToProps)(Table))
