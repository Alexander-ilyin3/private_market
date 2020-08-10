import React from 'react'
import PropTypes from 'prop-types'

import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'

const renderItem = item => <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>

const Selector = ({
  value,
  handlers,
  meta,
  items,
  style,
}) => {
  const {
    label,
    variant = 'outlined',
    itemsList,
  } = meta
  return (
    <FormControl
      fullWidth
      variant={variant}
      style={style}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        value={value}
        {...handlers}
      >
        {items && items.length > 0 && items.map(renderItem)}
        {itemsList && itemsList.length > 0 && itemsList.map(renderItem)}
      </Select>
    </FormControl>
  )
}

Selector.defaultProps = {
  value: 0,
  meta: {},
  style: {},
  items: [],
}

Selector.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  handlers: PropTypes.object.isRequired,
  meta: PropTypes.object,
  items: PropTypes.array,
  style: PropTypes.object,
}

export default Selector
