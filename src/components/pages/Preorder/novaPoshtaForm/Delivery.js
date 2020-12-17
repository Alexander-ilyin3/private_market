import React from 'react'

import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

// import AppDateTimePicker from 'components/parts/FormParts/DateTimePicker'
import { FormControl as RFormControl } from 'components/parts/ReactiveForm'
import CityAutocomplete from 'components/parts/FormParts/SearchAutocomplete/CityAutocomplete'
import WarehouseAutocomplete from 'components/parts/FormParts/SearchAutocomplete/WarehouseAutocomplete'
import CheckBoxRender from 'components/parts/FormParts/CheckBoxRender'
import DefaultInputRender from 'components/parts/FormParts/DefaultInputRrnder'
import StreetAutocomplete from 'components/parts/FormParts/SearchAutocomplete/StreetAutocomplete'
import RenderColumnItem from 'components/parts/RenderColumnItem'
import InputAsLabel from 'components/parts/FormParts/InputAsLabel'

const Delivery = () => (
  <Paper style={{ padding: 16 }}>
    <Typography variant='h5'>
      Доставка
    </Typography>
    <RFormControl name='city' render={CityAutocomplete} />
    <RFormControl name='toDoor' render={CheckBoxRender} />
    <RFormControl name='warehouse' render={WarehouseAutocomplete} />
    <RFormControl name='deliveryStreet' render={StreetAutocomplete} />
    <RenderColumnItem
      labelWeight={6}
      label={<InputAsLabel><RFormControl name='deliveryHouseNumber' render={DefaultInputRender} /></InputAsLabel>}
      value={<RFormControl name='deliveryApartamentNumber' render={DefaultInputRender} />}
    />
  </Paper>
)

export default Delivery
