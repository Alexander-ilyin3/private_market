import React from 'react'

import { Badge } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

const styles = ({ palette, breakpoints }) => ({
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
})

const mapStockBages = (props) => {
  let { value } = props
  const { classes } = props
  const allowedStatuses = [1, 2, 3]

  if (!allowedStatuses.includes(value)) value = 3

  const bages = {
    3: <Badge color='error' className={classes.inlineBage} badgeContent='Нет на складе' />,
    2: <Badge color='warning' className={classNames(classes.warningBage, classes.inlineBage)} badgeContent='Заканчивается' />,
    1: <Badge color='secondary' className={classes.inlineBage} badgeContent='В наличии' />,
  }
  return bages[value]
}


export default withStyles(styles)(mapStockBages)
