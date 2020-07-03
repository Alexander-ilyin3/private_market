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
}) => {
  const {
    label,
    variant = 'outlined',
  } = meta
  return (
    <FormControl
      fullWidth
      variant={variant}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        value={value || ''}
        {...handlers}
      >
        {items.map(item => <MenuItem value={item.value}>{item.label}</MenuItem>)}
        {/* <MenuItem value={1}>Новая почта</MenuItem>
        <MenuItem value={2}>Интайм</MenuItem>
        <MenuItem value={3}>Самовывоз</MenuItem> */}
      </Select>
    </FormControl>
  )
}

Selector.defaultProps = {
  value: 0,
  meta: {},
}

Selector.propTypes = {
  value: PropTypes.number,
  handlers: PropTypes.object.isRequired,
  meta: PropTypes.object,
  items: PropTypes.array.isRequired,
}

export default Selector
