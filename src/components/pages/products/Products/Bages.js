import React from 'react'

import { Badge } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

const styles = ({ palette, breakpoints }) => {
  return {
    inlineBage: {
      whiteSpace: 'nowrap',
      '& span': {
        transform: 'scale(1) translate(95%, -50%)',
        [breakpoints.down('sm')]: {
          transform: 'translate(0,-50%)',
        },
      },
    },
    warningBage: {
      '& span': {
        backgroundColor: palette.warning.main,
      },
    },
  }
}

const mapStockBages = (props) => {
  const { value, classes } = props
  if (!value) {
    return <Badge color='error' className={classes.inlineBage} badgeContent='Нет на складе' />
  }
  if (value === 1) {
    return <Badge color='warning' className={classNames(classes.warningBage, classes.inlineBage)} badgeContent='Заканчивается' />
  }
  if (value === 2) {
    return <Badge color='secondary' className={classes.inlineBage} badgeContent='Заканчивается' />
  }
}


export default withStyles(styles)(mapStockBages)
