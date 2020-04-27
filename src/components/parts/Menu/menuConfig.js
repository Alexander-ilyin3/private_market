import React, { useEffect } from 'react'
import IconHome from '@material-ui/icons/HomeOutlined'
import ShopIcon from '@material-ui/icons/ShoppingCartOutlined'
import BagIcon from '@material-ui/icons/WorkOutlineOutlined'
import CreditCardIcon from '@material-ui/icons/CreditCardOutlined'
import AccountIcon from '@material-ui/icons/AccountBoxOutlined'
import IconAdd from '@material-ui/icons/Add'
import Category from '@material-ui/icons/Category'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'


import { selectMenuAction } from 'storage/actions/menu.actions'

import {
  newOrderPath,
  ordersPath,
  paymentLogPath,
  productsPath,
  profilePath,
  statisticPath,
  productsCategoriesPath,
} from 'config/routes'

const menuSelectDispatcher = dispatch => ({
  select: item => dispatch(selectMenuAction(item)),
})

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
    primary: 'Категории Товаров',
    icon: () => <Category />,
    path: productsCategoriesPath,
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

const RouterListener = connect(null, menuSelectDispatcher)(withRouter(({ history, select }) => {
  useEffect(() => {
    select(menuConfig.findIndex(item => item.path === history.location.pathname))
    history.listen((url) => {
      const { pathname } = url
      select(menuConfig.findIndex(item => item.path === pathname))
    })
  }, [])
  return <></>
}))

export default menuConfig
export { RouterListener, menuConfig }
