import { connect } from 'react-redux'

import {
  open,
  token,
  userId,
  code,
} from 'storage/selectors/userTokenDialog.selectors'
import { closeUserTokenDialog } from 'storage/actions/userTokenDialog.actions'


import TokenDialog from './TokenDialog'

const mapStateToProps = state => ({
  open: open(state),
  token: token(state),
  code: code(state),
  userId: userId(state),
})

const mapDispatchToProps = dispatch => ({
  close: () => dispatch(closeUserTokenDialog()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TokenDialog)
