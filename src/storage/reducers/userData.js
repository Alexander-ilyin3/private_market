import { SET_USERDATA } from '../constants'

const initialState = {
  customerEmail: '',
  customerLastname: '',
  customerName: '',
  idCustomer: null,
  info: {
    city: null,
    customerPhone: null,
    customerPosition: null,
    customerWebsite: null,
    houseNumber: null,
    idCustomer: null,
    idCustomerInfo: null,
    idManagerSupplier: null,
    officeNumber: null,
    street: null,
  },
  managers: {},
}

export default function userData(state = initialState, action) {
  if (action.type === SET_USERDATA) {
    return action.payload
  }
  return state
}
