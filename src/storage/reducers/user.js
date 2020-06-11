import { SET_USR_LIST } from 'storage/constants/user.constants'

const usersDefaultState = {
  customers: [],
  roles: [],
  config: {
    page: 0,
    limit: 10,
    count: 0,
    searchText: '',
  },
}

export default function (state = usersDefaultState, action) {
  if (action.type === SET_USR_LIST) {
    return action.payload
  }
  return state
}
