import React from 'react'
import PropTypes from 'prop-types'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import IconAdd from '@material-ui/icons/Add'
import classNames from 'classnames'

import {
  newOrderPath,
} from 'config/routes'
import {
  checkAlloved,
} from 'config/roles'

import { menuConfig, RouterListener } from './menuConfig'


const Menu = (props) => {
  const {
    classes,
    history,
    menuItem,
  } = props
  return (
    <div className={classes.root}>
      <div className={classes.toolbar}>
        <ListItem
          button
          selected={menuItem === 4}
          onClick={() => { history.push(newOrderPath) }}
          classes={{
            selected: classes.focus,
            default: classes.defaultItem,
            container: classes.listButton,
          }}
        >
          <ListItemIcon className={classNames(classes.menuIcon, classes.topIcon)}>
            <IconAdd fontSize='large' />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              color: 'inherit',
              variant: 'h6',
              style: { fontWeight: 400 },
            }}
            primary='НОВЫЙ ЗАКАЗ'
          />
        </ListItem>
      </div>
      <Divider />
      <List>
        {
          menuConfig
            .filter(item => checkAlloved({ allowedRoles: item.allowedRoles }))
            .map(item => (
              <ListItem
                key={item.idx}
                button
                selected={menuItem === item.idx}
                onClick={() => {
                  history.push(item.path)
                }}
                classes={{
                  selected: classes.focus,
                  default: item.idx === 0 && classes.defaultItem,
                }}
              >
                <ListItemIcon className={classes.menuIcon}>
                  {item.icon()}
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    color: 'inherit',
                  }}
                  primary={item.primary}
                />
              </ListItem>
            ))
        }
      </List>
      <RouterListener />
    </div>
  )
}

Menu.defaultProps = {
  menuItem: 4,
}

Menu.propTypes = {
  menuItem: PropTypes.number,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default Menu
