import React from 'react'

import { streetAutocomplete } from 'services/api/order.service'

import SearchAutocomplete from './SearchAutocomplete'


export default function (props) {
  const getStreets = (q) => {
    const { meta } = props
    const { city_ref } = meta
    return streetAutocomplete({ city_ref, q })
  }
  return <SearchAutocomplete {...props} service={getStreets} />
}
