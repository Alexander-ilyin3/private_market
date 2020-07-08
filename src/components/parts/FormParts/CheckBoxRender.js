import React from 'react'
import PropTypes from 'prop-types'

import { Checkbox, Typography, FormControlLabel } from '@material-ui/core'

const defaultMeta = {
  align: 'right',
}

const CheckboxInputRender = ({
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
    withLabel,
  } = meta
  return (
    <div>
      <Typography
        align={align}
      >
        <FormControlLabel
          label={withLabel ? '' : label}
          labelPlacement='start'
          control={(
            <Checkbox
              label={label}
              {...handlers}
              checked={value}
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

CheckboxInputRender.defaultProps = {
  value: '',
  errors: {},
  touched: false,
  invalid: false,
  handlers: {},
  meta: {},
}

CheckboxInputRender.propTypes = {
  value: PropTypes.string,
  errors: PropTypes.object,
  touched: PropTypes.bool,
  invalid: PropTypes.bool,
  handlers: PropTypes.object,
  meta: PropTypes.object,
}

export default CheckboxInputRender
