const tokenData = state => state.userTokenDialog || {}

export const open = state => tokenData(state).open
export const token = state => tokenData(state).token
export const userId = state => tokenData(state).userId
