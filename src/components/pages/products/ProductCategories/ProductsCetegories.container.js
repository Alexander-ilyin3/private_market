import { connect } from 'react-redux'
import { productCategories } from 'storage/selectors/productCategories.selector'
import { getProductCategories } from 'services/api/products.service'

import ProductCategories from './ProductsCetegories'

const mapStateToProps = state => ({
  productCategories: productCategories(state),
})

const mapDispatchToProps = dispatch => ({
  getProductCategories: params => dispatch(getProductCategories(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategories)
