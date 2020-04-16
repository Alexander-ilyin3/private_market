import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import IconAdd from '@material-ui/icons/Add'
import classNames from 'classnames'

import { menuConfig, RouterListener } from './menuConfig'

import {
  newOrderPath,
} from 'config/routes'

const Menu = (props) => {
  const { classes, history, menuItem } = props
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
          menuConfig.map((item, index) => (
            <ListItem
              key={index}
              button
              selected={menuItem === index}
              onClick={() => {
                history.push(item.path)
              }}
              classes={{
                selected: classes.focus,
                default: index === 0 && classes.defaultItem,
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

export default Menu
