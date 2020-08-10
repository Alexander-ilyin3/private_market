import React from 'react'

import { cityAutocomplete } from 'services/api/order.service'

import SearchAutocomplete from './SearchAutocomplete'


export default function (props) {
  return <SearchAutocomplete {...props} service={cityAutocomplete} />
}
