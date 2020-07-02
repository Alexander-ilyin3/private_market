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
  setDelivery,
  delivery,
  selectedDate,
  setSelectedDate,
}) => {
  const paymentAndDelivery = [
    {
      label: 'Дата и время отправки:',
      value: <AppDateTimePicker label='Дата и время отправки:' value={selectedDate} onChange={setSelectedDate} />,
    },
    {
      label: 'Способ доставки:',
      value: (
        <FormControl
          fullWidth
          variant='outlined'
        >
          <InputLabel>Доставка</InputLabel>
          <Select
            label='Способ доставки'
            onChange={e => setDelivery({ ...delivery, type: e.target.value })}
            value={delivery.type || ''}
          >
            <MenuItem value={1}>Новая почта</MenuItem>
            <MenuItem value={2}>Интайм</MenuItem>
            <MenuItem value={3}>Самовывоз</MenuItem>
          </Select>
        </FormControl>
      ),
    },
    {
      hide: delivery.type !== 1,
      label: 'Город:',
      value: (
        <TextField
          variant='outlined'
          onInput={e => setDelivery({ ...delivery, city: e.target.value })}
          label='Город'
          margin='normal'
          fullWidth
        />
      ),
    },
    {
      hide: delivery.type !== 1,
      label: 'Склад:',
      value: (
        <TextField
          variant='outlined'
          onInput={e => setDelivery({ ...delivery, warehouse: e.target.value })}
          label='Склад'
          margin='normal'
          fullWidth
        />
      ),
    },
    // {
    //   label: 'Оплата:',
    //   value: (
    //     <FormControl
    //       fullWidth
    //       variant='outlined'
    //     >
    //       <InputLabel>Доставка</InputLabel>
    //       <Select
    //         label='Доставка'
    //         onChange={e => setPayment(e.target.value)}
    //         defaultValue={payment}
    //       >
    //         <MenuItem value={1}>Visa</MenuItem>
    //         <MenuItem value={2}>Mastercard</MenuItem>
    //         <MenuItem value={3}>Privat 24</MenuItem>
    //         <MenuItem value={4}>Наложенный платеж</MenuItem>
    //       </Select>
    //     </FormControl>
    //   ),
    // },
  ]
  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant='h5'>
        Доставка
      </Typography>
      <RenderColumnItems items={paymentAndDelivery} />
    </Paper>
  )
}

Delivery.propTypes = {
  delivery: PropTypes.object.isRequired,
  setDelivery: PropTypes.func.isRequired,
  selectedDate: PropTypes.object.isRequired,
  setSelectedDate: PropTypes.func.isRequired,
}

export default Delivery
