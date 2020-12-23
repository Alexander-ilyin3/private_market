import React from 'react'
import PropTypes from 'prop-types'

import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import AccessTime from '@material-ui/icons/AccessTime'
import DateFnsUtils from '@date-io/date-fns'

const AppTimePicker = ({ value, onChange }) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <TimePicker
      margin='normal'
      label='Время отправки'
      value={value}
      onChange={onChange}
      inputVariant='outlined'
      ampm={false}
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <IconButton>
              <AccessTime />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  </MuiPickersUtilsProvider>
)

AppTimePicker.defaultProps = {
  value: new Date(),
  onChange: () => {},
}

AppTimePicker.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
}

export default AppTimePicker
