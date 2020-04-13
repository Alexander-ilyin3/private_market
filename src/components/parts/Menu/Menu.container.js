import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

import Menu from './Menu'
import { styles } from './Menu.styles'

export default withRouter(withStyles(styles, { withTheme: true })(Menu))