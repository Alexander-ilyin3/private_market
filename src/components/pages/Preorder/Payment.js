import React from 'react'
import PropTypes from 'prop-types'

import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'

import { FormControl as RFormControl } from 'components/parts/ReactiveForm'
import DefaultInputRender from 'components/parts/FormParts/DefaultInputRrnder'
import SelectorRender from 'components/parts/FormParts/Selector'
import RenderColumnItem from 'components/parts/RenderColumnItem'
import InputAsLabel from 'components/parts/FormParts/InputAsLabel'


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
      <RenderColumnItem
        labelWeight={6}
        label={(
          <RFormControl
            name='paymentType'
            render={props => (
              <InputAsLabel>
                <SelectorRender
                  {...props}
                  items={[
                    { value: 1, label: 'Visa' },
                    { value: 2, label: 'Mastercard' },
                    { value: 3, label: 'Privat 24' },
                    { value: 4, label: 'Наложенный платеж' },
                  ]}
                />
              </InputAsLabel>
            )}
          />
        )}
        value={<RFormControl name='pymentAmount' render={DefaultInputRender} />}
      />
      <RenderColumnItem
        labelWeight={6}
        label={(
          <RFormControl
            name='deliveryPayer'
            render={props => (
              <InputAsLabel>
                <SelectorRender
                  {...props}
                  items={[
                    { value: 1, label: 'Отправитель' },
                    { value: 2, label: 'Получатель' },
                  ]}
                />
              </InputAsLabel>
            )}
          />
        )}
        value={(
          <RFormControl
            name='CODPayer'
            render={props => (
              <InputAsLabel>
                <SelectorRender
                  {...props}
                  items={[
                    { value: 1, label: 'Отправитель' },
                    { value: 2, label: 'Получатель' },
                  ]}
                />
              </InputAsLabel>
            )}
          />
        )}
      />
      <RenderColumnItem
        labelWeight={6}
        label={(
          <RFormControl
            name='insurancePayment'
            render={props => (
              <InputAsLabel>
                <SelectorRender
                  {...props}
                  items={[
                    { value: 1, label: 'Расчет наличными' },
                    { value: 2, label: 'Безналичный расчет' },
                  ]}
                />
              </InputAsLabel>
            )}
          />
        )}
        value={(
          <RFormControl name='insuranceAmount' render={DefaultInputRender} />
        )}
      />
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
