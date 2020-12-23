export const userData = state => state.userData || {}
export const roles = state => userData(state).roles || []

export default { userData }
