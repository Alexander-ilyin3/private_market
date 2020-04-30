import React from 'react'
import PropTypes from 'prop-types'

import { Checkbox, Typography, FormControlLabel } from '@material-ui/core'

const defaultMeta = {
  align: 'right',
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
    variant,
    align,
  } = meta
  return (
    <div>
      <Typography
        align={align}
      >
        <FormControlLabel
          label={label}
          labelPlacement='start'
          control={(
            <Checkbox
              label={label}
              {...handlers}
              defaultChecked={value}
              variant={variant || 'outlined'}
            />
          )}
        />
      </Typography>
      {touched && invalid && (
        <Typography color='error'>
          {(errors.required && 'Поле обязательно к заполнению')
            || (errors.passwordInvalid && 'Некоректный пароль')
            || (errors.notMatched && 'Пароли не совпадают')}
        </Typography>
      )}
    </div>
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
