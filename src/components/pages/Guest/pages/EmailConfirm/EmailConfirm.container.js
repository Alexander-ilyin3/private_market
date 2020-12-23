import { connect } from 'react-redux'

import { confirmEmail } from 'services/api/login.service'
import { withStyles } from '@material-ui/core'

import EmailConfirm from './EmailConfirm'
import { styles } from './EmailConfirm.styles'

const mapDispatchToProps = dispatch => ({
  conFirmEmail: token => dispatch(confirmEmail(token)),
})

export default withStyles(styles)(connect(null, mapDispatchToProps)(EmailConfirm))
