import { withStyles } from '@material-ui/core'
import { connect } from 'react-redux'

import { signin } from 'services/login.service'
import { error } from 'storage/selectors/loginData.selectors'

import SignIn from './SignIn'
import { styles } from './SignIn.styles'

const mapDispatchToProps = dispatch => ({
  signin: data => dispatch(signin(data)),
})

const mapStateToProps = state => ({
  error: error(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignIn))
