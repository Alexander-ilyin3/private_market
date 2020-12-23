import { connect } from 'react-redux'
import { snackInfo } from 'storage/selectors/snack.selector'

import ShowSnack from './ShowSnack'

const mapStateToProps = state => ({
  snackPack: snackInfo(state),
})

export default connect(mapStateToProps)(ShowSnack)
