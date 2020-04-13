import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import AppDrawer from './AppDrawer'
import { styles } from './AppDrawer.styles'

export default connect(
  state => ({
      isLoading: state.isLoading,
  })
)(withStyles(styles, { withTheme: true })(AppDrawer));