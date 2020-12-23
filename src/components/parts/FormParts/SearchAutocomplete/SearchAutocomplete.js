import React, { useState } from 'react'

import PropTypes from 'prop-types'

import {
  TextField,
} from '@material-ui/core'
import debounce from 'lodash/debounce'
import { Autocomplete } from '@material-ui/lab'

import { getHelperText } from 'components/parts/ReactiveForm/Helpers'

const defaultMeta = {
  variant: 'outlined',
  fullWidth: true,
  type: 'text',
}

const throttledChanges = debounce((value, service, handler) => {
  service(value).then(iems => handler(iems))
}, 500)

const SearchAutocomplete = ({
  value,
  errors,
  touched,
  invalid,
  handlers,
  meta = defaultMeta,
  InputProps,
  service,
  disabled,
}) => {
  const [searchList, setSearchList] = useState([])

  const handleInput = async (text) => {
    throttledChanges(text, service, setSearchList)
  }

  meta = { ...defaultMeta, ...meta }
  const {
    label,
    placeholder,
    variant,
    fullWidth,
    type,
    errorMessages,
  } = meta

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => handlers.onChange(newValue)}
      getOptionSelected={() => true}
      options={searchList || []}
      openOnFocus
      getOptionLabel={option => (option ? option.name : '')}
      disabled={disabled}
      renderInput={(params) => {
        params.value = params.value
        return (
          <TextField
            onChange={event => handleInput(event.target.value)}
            onFocus={() => {
              if (!value) {
                handleInput('')
              }
            }}
            error={touched && invalid}
            label={label}
            variant={variant || 'outlined'}
            fullWidth={fullWidth}
            margin='normal'
            type={type || 'text'}
            placeholder={placeholder || label}
            InputProps={InputProps}
            onBlur={handlers.onBlur}
            helperText={
              touched && invalid && getHelperText(errors, errorMessages)
            }
            {...params}
          />
        )
      }}
    />
  )
}

SearchAutocomplete.defaultProps = {
  value: {},
  errors: {},
  touched: false,
  invalid: false,
  handlers: {},
  meta: {},
  InputProps: {},
  service: () => { },
  disabled: false,
}

SearchAutocomplete.propTypes = {
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  errors: PropTypes.object,
  touched: PropTypes.bool,
  invalid: PropTypes.bool,
  handlers: PropTypes.object,
  meta: PropTypes.object,
  InputProps: PropTypes.object,
  service: PropTypes.func,
  disabled: PropTypes.bool,
}

export default SearchAutocomplete
