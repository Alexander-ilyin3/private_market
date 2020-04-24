import React from 'react'
import PropTypes from 'prop-types'
import { Error } from '@material-ui/icons/'
import {
  Paper,
  Typography,
  withStyles,
} from '@material-ui/core'

import { styles } from './BrokenToken.styles'


function BrokenToken(props) {
  const { classes, message } = props
  return (
    <div className={classes.root}>
      <Paper
        square
        className={classes.bage}
      >
        <div style={{ display: 'inline-block', padding: 5, paddingRight: 15 }}>
          <Error color='error' fontSize='large' />
        </div>
        <div style={{ display: 'inline-block' }}>
          <Typography
            style={{ fontWeight: '500' }}
            color='error'
          >
            Упс
          </Typography>
          <Typography
            color='error'
          >
            {message}
          </Typography>
        </div>
      </Paper>
    </div>
  )
}

BrokenToken.defaultProps = {
  message: 'Что то пошло нетак',
}

BrokenToken.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string,
}

export default withStyles(styles)(BrokenToken)
