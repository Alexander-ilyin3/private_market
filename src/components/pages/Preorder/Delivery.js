import React from 'react'

import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

import AppDateTimePicker from 'components/parts/FormParts/DateTimePicker'
import { FormControl as RFormControl } from 'components/parts/ReactiveForm'
import DefaultInputRender from 'components/parts/FormParts/DefaultInputRrnder'
import CheckBoxRender from 'components/parts/FormParts/CheckBoxRender'
import SelectorRender from 'components/parts/FormParts/Selector'


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
      render={props => (
        <SelectorRender
          {...props}
          items={[
            { value: 1, label: 'Новая почта' },
            { value: 2, label: 'Интайм' },
            { value: 3, label: 'Самовывоз' },
          ]}
        />
      )}
    />
    <RFormControl name='toDoor' render={CheckBoxRender} />
    <RFormControl name='city' render={DefaultInputRender} />
    <RFormControl name='warehouse' render={DefaultInputRender} />
    <RFormControl name='deliveryAddress' render={DefaultInputRender} />
  </Paper>
)

export default Delivery
