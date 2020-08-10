import React from 'react'

import { warehouseAutocomplete } from 'services/api/order.service'

import SearchAutocomplete from './SearchAutocomplete'


export default function (props) {
  return <SearchAutocomplete {...props} service={warehouseAutocomplete} />
}
