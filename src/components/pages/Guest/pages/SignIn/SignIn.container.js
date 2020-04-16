import { withStyles } from '@material-ui/core'
import { connect } from 'react-redux'

import { signin } from 'services/login.service'

import SignIn from './SignIn'
import { styles } from './SignIn.styles'

const mapDispatchToProps = dispatch => ({
  signin: (data) => dispatch(signin(data)),
})

export default connect(null, mapDispatchToProps)(withStyles(styles)(SignIn))
