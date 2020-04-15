import { LOADING_START, LOADING_STOP } from '../constants/loading.constants'

const loadingStart = () => ({ type: LOADING_START })

const loadingStop = () => ({ type: LOADING_STOP })

export { loadingStart, loadingStop }
export default { loadingStart, loadingStop }
