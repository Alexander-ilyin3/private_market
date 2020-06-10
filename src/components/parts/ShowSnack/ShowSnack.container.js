import { connect } from 'react-redux'
import { snackInfo } from 'storage/selectors/snack.selector'

import ShowSnack from './ShowSnack'

const mapStateToProps = state => ({
  snackInfo: snackInfo(state),
})

export default connect(mapStateToProps)(ShowSnack)
