import React from 'react'
import PropTypes from 'prop-types'

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

const AppDatePicker = ({ value, onChange }) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker
      margin='normal'
      format='dd.MM.yyyy'
      label='Дата отправки'
      value={value}
      onChange={onChange}
      inputVariant='outlined'
      autoOk
      fullWidth
      InputAdornmentProps={{
        position: 'start',
      }}
    />
  </MuiPickersUtilsProvider>
)

AppDatePicker.defaultProps = {
  value: new Date(),
  onChange: () => { },
}

AppDatePicker.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
}

export default AppDatePicker
