import React from 'react'
import PropTypes from 'prop-types'

import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import { Typography } from '@material-ui/core'

import { getHelperText } from 'components/parts/ReactiveForm/Helpers'

const RenderItem = ({ label, value, disabled }) => (
  <MenuItem disabled={disabled} key={value} value={value}>{label}</MenuItem>
)

RenderItem.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  value: PropTypes.any.isRequired,
}

RenderItem.defaultProps = {
  disabled: false,
}

const Selector = ({
  value,
  handlers,
  meta,
  items,
  style,
  errors,
  touched,
  invalid,
}) => {
  const {
    label,
    variant = 'outlined',
    itemsList,
    errorMessages,
  } = meta
  return (
    <FormControl
      fullWidth
      variant={variant}
      style={style}
      error={touched && invalid}
      margin='normal'
    >
      <InputLabel>{label}</InputLabel>
      {items && items.length > 0 && (
      <Select
        label={label}
        value={value}
        {...handlers}
      >
        {items && items.length > 0 && items.map(RenderItem)}
        {itemsList && itemsList.length > 0 && itemsList.map(RenderItem)}
      </Select>
      )}
      {touched && invalid && <Typography variant='caption' color='error'>{getHelperText(errors, errorMessages)}</Typography>}
    </FormControl>
  )
}

Selector.defaultProps = {
  value: 0,
  meta: {},
  style: {},
  items: [],
  errors: {},
  touched: false,
  invalid: false,
}

Selector.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  handlers: PropTypes.object.isRequired,
  meta: PropTypes.object,
  items: PropTypes.array,
  style: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.bool,
  invalid: PropTypes.bool,
}

export default Selector
