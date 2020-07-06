import React from 'react'
import PropTypes from 'prop-types'

import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'

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
        value={!value ? '' : parseFloat(value)}
        {...handlers}
      >
        {items.map(item => <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>)}
      </Select>
    </FormControl>
  )
}

Selector.defaultProps = {
  value: 0,
  meta: {},
  style: {},
}

Selector.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  handlers: PropTypes.object.isRequired,
  meta: PropTypes.object,
  items: PropTypes.array.isRequired,
  style: PropTypes.object,
}

export default Selector
