import React from 'react'
import PropTypes from 'prop-types'

import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'

import AppDateTimePicker from 'components/parts/FormParts/DateTimePicker'
import RenderColumnItems from 'components/parts/RenderColumnItems'


const Delivery = ({
  payment,
  setPayment,
}) => {
  const paymentRows = [
    {
      label: 'Оплата:',
      value: (
        <FormControl
          fullWidth
          variant='outlined'
        >
          <InputLabel>Доставка</InputLabel>
          <Select
            label='Доставка'
            onChange={e => setPayment(e.target.value)}
            defaultValue={payment}
          >
            <MenuItem value={1}>Visa</MenuItem>
            <MenuItem value={2}>Mastercard</MenuItem>
            <MenuItem value={3}>Privat 24</MenuItem>
            <MenuItem value={4}>Наложенный платеж</MenuItem>
          </Select>
        </FormControl>
      ),
    },
    {
      // hide: delivery.type !== 1,
      label: 'Плательщик доставки:',
      value: (
        <TextField
          variant='outlined'
          // onInput={e => setDelivery({ ...delivery, city: e.target.value })}
          label='Плательщик доставки'
          margin='normal'
          fullWidth
        />
      ),
    },
    {
      // hide: delivery.type !== 1,
      label: 'Плательщик за наложку:',
      value: (
        <TextField
          variant='outlined'
          // onInput={e => setDelivery({ ...delivery, warehouse: e.target.value })}
          label='Плательщик за наложку'
          margin='normal'
          fullWidth
        />
      ),
    },
    {
      // hide: delivery.type !== 1,
      label: 'Плательщик за наложку:',
      value: (
        <TextField
          variant='outlined'
          // onInput={e => setDelivery({ ...delivery, warehouse: e.target.value })}
          label='Плательщик за наложку'
          margin='normal'
          fullWidth
        />
      ),
    },
  ]
  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant='h5'>
        Оплата
      </Typography>
      <RenderColumnItems items={paymentRows} />
    </Paper>
  )
}

Delivery.propTypes = {
  // delivery: PropTypes.object.isRequired,
  // setDelivery: PropTypes.func.isRequired,
  // selectedDate: PropTypes.object.isRequired,
  // setSelectedDate: PropTypes.func.isRequired,
}

export default Delivery
