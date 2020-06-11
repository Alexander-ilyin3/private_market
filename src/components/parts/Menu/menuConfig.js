import React, { useEffect } from 'react'
import IconHome from '@material-ui/icons/HomeOutlined'
import ShopIcon from '@material-ui/icons/ShoppingCartOutlined'
import BagIcon from '@material-ui/icons/WorkOutlineOutlined'
import CreditCardIcon from '@material-ui/icons/CreditCardOutlined'
import AccountIcon from '@material-ui/icons/AccountBoxOutlined'
import IconAdd from '@material-ui/icons/Add'
import Category from '@material-ui/icons/Category'
import People from '@material-ui/icons/People'
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
  userListPath,
} from 'config/routes'
import {
  user,
  superAdmin,
  newUser,
  clientManager,
  client,
  admin,
  clientAccountant,
  purchasingManager,
  forAll,
  declineRoles,
} from 'config/roles'

const menuSelectDispatcher = dispatch => ({
  select: item => dispatch(selectMenuAction(item ? item.idx || -1 : -1)),
})

const menuConfig = [
  {
    idx: 0,
    primary: 'Статистика',
    icon: () => <IconHome />,
    path: statisticPath,
    allowedRoles: declineRoles([newUser]),
  },
  {
    idx: 1,
    primary: 'Товары',
    icon: () => <ShopIcon />,
    path: productsPath,
    allowedRoles: declineRoles([newUser]),
  },
  {
    idx: 2,
    primary: 'Категории Товаров',
    icon: () => <Category />,
    path: productsCategoriesPath,
    allowedRoles: declineRoles([newUser]),
  },
  {
    idx: 3,
    primary: 'Заказы',
    icon: () => <BagIcon />,
    path: ordersPath,
    allowedRoles: declineRoles([newUser]),
  },
  {
    idx: 4,
    primary: 'Журнал оплат',
    icon: () => <CreditCardIcon />,
    path: paymentLogPath,
    allowedRoles: declineRoles([newUser]),
  },
  {
    idx: 5,
    primary: 'Новый заказ',
    icon: () => <IconAdd />,
    path: newOrderPath,
    allowedRoles: declineRoles([newUser]),
  },
  {
    idx: 6,
    primary: 'Мой профиль',
    iconFontSize: 'large',
    icon: () => <AccountIcon />,
    path: profilePath,
    allowedRoles: declineRoles([newUser]),
  },
  {
    idx: 7,
    primary: 'Пользователи',
    iconFontSize: 'large',
    icon: () => <People />,
    path: userListPath,
    allowedRoles: [admin, superAdmin],
  },
]

const RouterListener = connect(null, menuSelectDispatcher)(withRouter(({ history, select }) => {
  useEffect(() => {
    select(menuConfig.find(item => item.path === history.location.pathname))
    history.listen((url) => {
      const { pathname } = url
      select(menuConfig.find(item => item.path === pathname))
    })
  }, [])
  return <></>
}))

export default menuConfig
export { RouterListener, menuConfig }
