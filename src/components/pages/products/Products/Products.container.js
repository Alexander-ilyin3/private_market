import { connect } from 'react-redux'
import {
  searchAutocomleteList,
  products,
  config,
  vendors,
  categories,
} from 'storage/selectors/products.selector'
import { getProductList, getSearchAutocomplete } from 'services/api/products.service'
import { withStyles } from '@material-ui/styles'
import withWidth from '@material-ui/core/withWidth'

import Products from './Products'
import styles from './Products.styles'

const mapStateToProps = state => ({
  products: products(state),
  config: config(state),
  searchAutocomleteList: searchAutocomleteList(state),
  vendors: vendors(state),
  categories: categories(state),
})

const mapDispatchToProps = dispatch => ({
  getProductList: params => dispatch(getProductList(params)),
  getSearchAutocomplete: searchText => dispatch(getSearchAutocomplete(searchText)),
})

export default withWidth()(
  connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Products)),
)
