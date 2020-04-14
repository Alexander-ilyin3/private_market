import React, { Component } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import IconAdd from '@material-ui/icons/Add'
import IconHome from '@material-ui/icons/HomeOutlined'
import ShopIcon from '@material-ui/icons/ShoppingCartOutlined'
import BagIcon from '@material-ui/icons/WorkOutlineOutlined'
import CreditCardIcon from '@material-ui/icons/CreditCardOutlined'
import AccountIcon from '@material-ui/icons/AccountBoxOutlined'
import classNames from 'classnames'


import {
  newOrderPath,
  ordersPath,
  paymentLogPath,
  productsPath,
  profilePath,
  statisticPath,
} from 'config/routes'

const menuConfig = [
  {
    primary: 'Статистика',
    icon: () => <IconHome />,
    path: statisticPath,
  },
  {
    primary: 'Товары',
    icon: () => <ShopIcon />,
    path: productsPath,
  },
  {
    primary: 'Заказы',
    icon: () => <BagIcon />,
    path: ordersPath,
  },
  {
    primary: 'Журнал оплат',
    icon: () => <CreditCardIcon />,
    path: paymentLogPath,
  },
  {
    primary: 'Новый заказ',
    icon: () => <IconAdd />,
    path: newOrderPath,
  },
  {
    primary: 'Мой профиль',
    iconFontSize: 'large',
    icon: () => <AccountIcon />,
    path: profilePath,
  },
]

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: 0,
    }
  }

  handleListItemClick = (_event, index) => {
    console.log(index)
    this.setState({ selectedIndex: index })
  };

  render() {
    const { classes, history } = this.props
    const { selectedIndex } = this.state
    return (
      <div className={classes.root}>
        <div className={classes.toolbar}>
          <ListItem
            button
            selected={selectedIndex === 4}
            onClick={(event) => { this.handleListItemClick(event, 4); history.push(newOrderPath) }}
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
              button
              selected={selectedIndex === index}
              onClick={(event) => {
                this.handleListItemClick(event, index)
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
      </div>
    )
  }
}

export default Menu
