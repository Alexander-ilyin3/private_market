import React from 'react'
import PropTypes from 'prop-types'

import { TextField } from '@material-ui/core'

const defaultMeta = {
  variant: 'outlined',
  fullWidth: true,
  type: 'text',
}

const getHelperText = (errors = {}, errorMessages) => {
  if (errorMessages) {
    const existErrors = Object.keys(errors).filter(key => errors[key])
    return errorMessages[existErrors[0]]
  }
  return (
    <>
      {(errors.required && 'Поле обязательно к заполнению')
      || (errors.passwordInvalid && 'Некоректный пароль')
      || (errors.notMatched && 'Пароли не совпадают')}
    </>
  )
}

const PasswordInputRender = ({
  value,
  errors,
  touched,
  invalid,
  handlers,
  meta,
  InputProps,
}) => {
  meta = { ...defaultMeta, ...meta }
  const {
    label,
    placeholder,
    variant,
    fullWidth,
    type,
    disabled,
    errorMessages,
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
      InputProps={InputProps}
      helperText={
        touched && invalid && getHelperText(errors, errorMessages)
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
  InputProps: {},
}

PasswordInputRender.propTypes = {
  value: PropTypes.string,
  errors: PropTypes.object,
  touched: PropTypes.bool,
  invalid: PropTypes.bool,
  handlers: PropTypes.object,
  meta: PropTypes.object,
  InputProps: PropTypes.object,
}

export default PasswordInputRender
