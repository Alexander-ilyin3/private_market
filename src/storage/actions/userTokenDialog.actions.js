import { CLOSE_TOKEN_DIALOG, OPEN_TOKEN_DIALOG } from 'storage/constants/userTokenDialog.constants'

export const openUserTokenDialog = data => ({ type: OPEN_TOKEN_DIALOG, payload: data })
export const closeUserTokenDialog = () => ({ type: CLOSE_TOKEN_DIALOG })
