import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

import { isLoading } from 'storage/selectors/loading.selector'
import { logout } from 'services/api/login.service'
import AppDrawer from './AppDrawer'
import { styles } from './AppDrawer.styles'

const mapStateToProps = state => ({
  isLoading: isLoading(state),
})

const mapDispatchToPoprs = dispatch => ({
  logout: () => dispatch(logout()),
})

export default connect(
  mapStateToProps,
  mapDispatchToPoprs,
)(withStyles(styles, { withTheme: true })(AppDrawer))
