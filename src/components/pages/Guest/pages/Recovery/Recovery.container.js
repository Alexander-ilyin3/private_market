import { withStyles } from '@material-ui/core'
import { withRouter } from 'react-router-dom'

import Recovery from './Recovery'
import { styles } from './Recovery.styles'

export default withRouter(withStyles(styles)(Recovery))
