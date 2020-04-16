import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import { menuItemSelector } from 'storage/selectors'

import Menu from './Menu'
import { styles } from './Menu.styles'

const mapStateToProps = state => ({
  menuItem: menuItemSelector(state)
})

export default connect(mapStateToProps)(withRouter(withStyles(styles, { withTheme: true })(Menu)))
