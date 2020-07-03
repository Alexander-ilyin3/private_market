import React from 'react'

import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

import AppDateTimePicker from 'components/parts/FormParts/DateTimePicker'
import { FormControl as RFormControl } from 'components/parts/ReactiveForm'
import DefaultInputRender from 'components/parts/FormParts/DefaultInputRrnder'
import CheckBoxRender from 'components/parts/FormParts/CheckBoxRender'


const Delivery = () => (
  <Paper style={{ padding: 16 }}>
    <Typography variant='h5'>
      Доставка
    </Typography>
    <RFormControl
      name='dateTime'
      render={({
        value,
        handlers,
        meta,
      }) => {
        const {
          label,
        } = meta
        return (
          <AppDateTimePicker label={label} value={value} {...handlers} />
        )
      }
      }
    />
    <RFormControl
      name='deliveryType'
      render={({
        value,
        handlers,
        meta,
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
              <MenuItem value={1}>Новая почта</MenuItem>
              <MenuItem value={2}>Интайм</MenuItem>
              <MenuItem value={3}>Самовывоз</MenuItem>
            </Select>
          </FormControl>
        )
      }}
    />
    <RFormControl name='toDoor' render={CheckBoxRender} />
    <RFormControl name='city' render={DefaultInputRender} />
    <RFormControl name='warehouse' render={DefaultInputRender} />
    <RFormControl name='deliveryAddress' render={DefaultInputRender} />
  </Paper>
)

export default Delivery
