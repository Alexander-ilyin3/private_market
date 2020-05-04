import { withStyles } from '@material-ui/core'
import { connect } from 'react-redux'

import { getProfile } from 'services/api/profile.service'
import { userData } from 'storage/selectors/userData.selector'

import UserView from './UserView'
import { styles } from './UserView.styles'

const mapStateToPops = state => ({
  customer: userData(state),
})

const mapDispatchToProps = dispatch => ({
  getProfile: () => dispatch(getProfile()),
})

export default connect(mapStateToPops, mapDispatchToProps)(withStyles(styles)(UserView))
