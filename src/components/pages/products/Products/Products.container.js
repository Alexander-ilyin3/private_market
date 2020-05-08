import { connect } from 'react-redux'
import {
  searchAutocomleteList,
  products,
  config,
  vendors,
  categories,
} from 'storage/selectors/products.selector'
import { getProductList, getSearchAutocomplete } from 'services/api/products.service'

import Products from './Products'

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

export default connect(mapStateToProps, mapDispatchToProps)(Products)
