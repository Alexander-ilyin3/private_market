import { store } from 'storage'

import { roles } from 'storage/selectors/userData.selector'

export const newUser = 'newUser'
export const user = 'user'
export const client = 'client'
export const clientManager = 'сlientManager'
export const purchasingManager = 'purchasingManager'
export const clientAccountant = 'clientAccountant'
export const admin = 'admin'
export const superAdmin = 'superAdmin'

export const roleAccessLevel = {
  newUser: 0,
  user: 1,
  client: 2,
  сlientManager: 2,
  purchasingManager: 2,
  clientAccountant: 2,
  admin: 3,
  superAdmin: 4,
}

export const forAll = [
  user,
  superAdmin,
  newUser,
  clientManager,
  client,
  admin,
  clientAccountant,
  purchasingManager,
]

export const declineRoles = filter => forAll.filter(role => !filter.includes(role))

export const checkAccessByLevel = (level) => {
  const userRoles = roles(store.getState())
  if (!userRoles || userRoles.length < 1) {
    return false
  }
  const maxAccessLevelRole = userRoles.sort((next, prev) => {
    if (roleAccessLevel[prev.name] > roleAccessLevel[next.name]) return 1
    return -1
  })[0].name
  return level <= roleAccessLevel[maxAccessLevelRole]
}

export const checkAlloved = ({ allowedRoles }) => {
  const userRoles = roles(store.getState())
  if (!allowedRoles) return true
  // if (allowedRoles.length <= 0) return true
  if (!userRoles) return false
  return userRoles.find(role => allowedRoles.includes(role.name))
}

export const onlyAdminOrGreater = () => checkAccessByLevel(roleAccessLevel.admin)

export const onlyClientOrGreater = () => checkAccessByLevel(roleAccessLevel.client)
