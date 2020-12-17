import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { getPaymentMethods } from 'services/api/order.service'
import { paymentMethods } from 'storage/selectors/paymentMethod.selector'
import { userData } from 'storage/selectors/userData.selector'

import Form from './Form'


const mapStateToProps = state => ({
  user: userData(state),
  paymentMethods: paymentMethods(state),
})

const mapDispatchToProps = dispatch => ({
  getPaymentMethods: () => dispatch(getPaymentMethods),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Form))
