import React from 'react'

import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

import { FormControl as RFormControl } from 'components/parts/ReactiveForm'
import DefaultInputRender from 'components/parts/FormParts/DefaultInputRrnder'
import SelectorRender from 'components/parts/FormParts/Selector'

import InputAsLabel from 'components/parts/FormParts/InputAsLabel'
import RenderColumnItem from 'components/parts/RenderColumnItem'
import MaskedPhone from 'components/assets/MaskedPhone'

const Recipient = () => (
  <Paper style={{ padding: 16 }}>
    <Typography variant='h5'>
      Получатель
    </Typography>
    <RenderColumnItem
      label={
        (
          <InputAsLabel>
            <RFormControl
              name='customerType'
              render={
                props => (
                  <SelectorRender
                    {...props}
                    items={[
                      { value: 1, label: 'Юр. лицо' },
                      { value: 2, label: 'ФИО' },
                    ]}
                  />
                )
              }
            />
          </InputAsLabel>
        )
      }
      value={
        <RFormControl name='name' render={DefaultInputRender} />
      }
    />
    {/* <RenderColumnItem
      label='Email:'
      value={<Typography paragraph>{user.customerEmail}</Typography>}
    /> */}
    <RFormControl
      name='phone'
      render={props => (
        <DefaultInputRender
          {...props}
          InputProps={{ inputComponent: MaskedPhone }}
        />
      )}
    />
  </Paper>
)


export default Recipient
