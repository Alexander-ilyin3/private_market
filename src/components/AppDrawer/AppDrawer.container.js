import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

import { logout } from 'services/api/login.service'
import AppDrawer from './AppDrawer'
import { styles } from './AppDrawer.styles'

const mapDispatchToPoprs = dispatch => ({
  logout: () => dispatch(logout()),
})

export default connect(
  null,
  mapDispatchToPoprs,
)(withStyles(styles, { withTheme: true })(AppDrawer))
