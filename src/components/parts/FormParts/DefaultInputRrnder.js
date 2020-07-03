import React from 'react'
import PropTypes from 'prop-types'

import { TextField } from '@material-ui/core'

const defaultMeta = {
  variant: 'outlined',
  fullWidth: true,
  type: 'text',
}

const PasswordInputRender = ({
  value,
  errors,
  touched,
  invalid,
  handlers,
  meta,
}) => {
  meta = { ...defaultMeta, ...meta }
  const {
    label,
    placeholder,
    variant,
    fullWidth,
    type,
    disabled,
  } = meta
  return (
    <TextField
      disabled={disabled}
      label={label}
      {...handlers}
      defaultValue={value}
      error={touched && invalid}
      variant={variant || 'outlined'}
      fullWidth={fullWidth}
      margin='normal'
      type={type || 'text'}
      placeholder={placeholder || label}
      helperText={
        touched && invalid && (
          (errors.required && 'Поле обязательно к заполнению')
          || (errors.passwordInvalid && 'Некоректный пароль')
          || (errors.notMatched && 'Пароли не совпадают')
        )
      }
    />
  )
}

PasswordInputRender.defaultProps = {
  value: '',
  errors: {},
  touched: false,
  invalid: false,
  handlers: {},
  meta: {},
}

PasswordInputRender.propTypes = {
  value: PropTypes.string,
  errors: PropTypes.object,
  touched: PropTypes.bool,
  invalid: PropTypes.bool,
  handlers: PropTypes.object,
  meta: PropTypes.object,
}

export default PasswordInputRender
