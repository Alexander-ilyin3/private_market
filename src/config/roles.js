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


export const checkAlloved = ({ allowedRoles }) => {
  const userRoles = roles(store.getState())
  if (!allowedRoles) return true
  // if (allowedRoles.length <= 0) return true
  if (!userRoles) return false
  return userRoles.find(role => allowedRoles.includes(role.name))
}
