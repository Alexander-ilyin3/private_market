import React from 'react'
import PropTypes from 'prop-types'

import SearchAutocomplete from './SearchAutocomplete'


export default function WarehouseAutocomplete(props) {
  const { meta } = props
  const { itemsList = [] } = meta
  const warehouseAutocomplete = async (search) => {
    const pattern = search.toLowerCase()
    return itemsList
      .filter(({ label }) => label.toLowerCase().includes(pattern))
      .slice(0, 10)
      .map(item => ({ ...item, name: item.label }))
      .sort((a, b) => {
        if (a.label.toLowerCase().indexOf(pattern) < b.label.toLowerCase().indexOf(pattern)) {
          return -1
        }
        if (a.label.toLowerCase().indexOf(pattern) > b.label.toLowerCase().indexOf(pattern)) {
          return 1
        }
        return 0
      })
  }
  return <SearchAutocomplete {...props} service={warehouseAutocomplete} />
}

WarehouseAutocomplete.defaultProps = {
  meta: { itemsList: [] },
}

WarehouseAutocomplete.propTypes = {
  meta: PropTypes.object,
}
