import React from 'react'
import PropTypes from 'prop-types'

import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import EventIcon from '@material-ui/icons/Event'
import DateFnsUtils from '@date-io/date-fns'

const AppDateTimePicker = ({ value, onChange, label }) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <DateTimePicker
      margin='normal'
      format='dd.MM.yyyy HH:mm'
      label={label}
      ampm={false}
      value={value}
      onChange={onChange}
      inputVariant='outlined'
      autoOk
      fullWidth
      minDate={Date.now()}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton>
              <EventIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  </MuiPickersUtilsProvider>
)

AppDateTimePicker.defaultProps = {
  value: new Date(),
  onChange: () => { },
  label: '',
}

AppDateTimePicker.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
  label: PropTypes.string,
}

export default AppDateTimePicker
