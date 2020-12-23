import { OPEN_SNACK, SLICE_STACK } from 'storage/constants/snack.constants'
import { store } from 'storage'

export const sliceStack = () => {
  store.dispatch({ type: SLICE_STACK })
}

/**
 * @typedef {Object} SnackPayload
 * @property {('error'|'warning'|'info'|'success')} variant
 * @property {string} message
 * @property {boolean} noAutohide
 * @property {number} duration
 * @property {('slide'|'fade'|'grow')} animationType
*/
/**
  * @param {SnackPayload} payload
*/

export const showSnack = (payload) => {
  store.dispatch({ type: OPEN_SNACK, payload })
}
