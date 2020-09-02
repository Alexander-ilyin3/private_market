import React from 'react'

import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

// import AppDateTimePicker from 'components/parts/FormParts/DateTimePicker'
import { FormControl as RFormControl } from 'components/parts/ReactiveForm'
import SelectorRender from 'components/parts/FormParts/Selector'
import CityAutocomplete from 'components/parts/FormParts/SearchAutocomplete/CityAutocomplete'
import WarehouseAutocomplete from 'components/parts/FormParts/SearchAutocomplete/WarehouseAutocomplete'

const Delivery = ({ deliveryMethods }) => (
  <Paper style={{ padding: 16 }}>
    <Typography variant='h5'>
      Доставка
    </Typography>
    {/* <RFormControl
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
    /> */}
    {deliveryMethods && deliveryMethods.length > 0 && (
      <RFormControl
        name='deliveryType'
        render={props => (
          <SelectorRender
            {...props}
            items={deliveryMethods.map(({ id, name }) => ({ value: id, label: name }))}
          />
        )}
      />
    )}
    {/* <RFormControl name='toDoor' render={CheckBoxRender} /> */}
    <RFormControl name='city' render={CityAutocomplete} />
    <RFormControl
      name='warehouse'
      render={WarehouseAutocomplete}
    />
    {/* <RFormControl name='deliveryAddress' render={DefaultInputRender} /> */}
  </Paper>
)

export default Delivery
