import { withStyles } from '@material-ui/core'
import { connect } from 'react-redux'

import { getProductDetails } from 'services/api/products.service'
import { productInfo } from 'storage/selectors/products.selector'

import ProductView from './ProductView'
import { styles } from './ProductViewStyles'

const mapStateToProps = state => ({
  product: productInfo(state),
})

const mapDispatchToProps = dispatch => ({
  getData: id => dispatch(getProductDetails(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProductView))
