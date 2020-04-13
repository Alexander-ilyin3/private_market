import { withStyles } from '@material-ui/core'
import { withRouter } from 'react-router-dom'

import SignUp from './SignUp'
import { styles } from './SignUp.styles'

export default withRouter(withStyles(styles)(SignUp));
