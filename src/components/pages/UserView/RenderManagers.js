import React from 'react'
import classNames from 'classnames'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core//Avatar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/styles'

const chipMap = {
  0: <Chip variant='default' color='default' label='Неактивен' />,
  1: <Chip variant='default' color='primary' label='Активен' />,
}

const RenderManagers = ({ managers, classes }) => managers.map(({
  photo,
  description,
  name,
  status,
}, index) => (
  <div
    key={index}
    className={classNames(
      classes.managerCard,
      { [classes.withBorder]: index !== managers.length - 1 },
    )}
  >
    <div className={classes.descriptionBlock}>
      <Avatar
        src={photo}
        className={classes.smallAvatar}
      />
      <div>
        <Typography variant='h6'>
          {name}
        </Typography>
        <Typography variant='caption'>
          {description}
        </Typography>
      </div>
    </div>
    <div>{chipMap[status]}</div>
  </div>
))

const styles = theme => ({
  managerCard: {
    display: 'flex',
    width: '100%',
    boxSizing: 'border-box',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 6,
      paddingRight: 6,
    },
  },
  withBorder: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  descriptionBlock: {
    display: 'flex',
    alignItems: 'center',
  },
})

export default withStyles(styles)(RenderManagers)
