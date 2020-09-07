import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/styles'

const InputAsLabel = ({ children, classes }) => (
  <div className={classes.wrapper}>{children}</div>
)

const styles = theme => ({
  wrapper: {
    marginRight: 7,
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
    },
  },
})

InputAsLabel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(InputAsLabel)
