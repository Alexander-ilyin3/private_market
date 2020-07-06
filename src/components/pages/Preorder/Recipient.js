import React from 'react'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'

import { FormControl as RFormControl } from 'components/parts/ReactiveForm'
import DefaultInputRender from 'components/parts/FormParts/DefaultInputRrnder'
import CheckBoxRender from 'components/parts/FormParts/CheckBoxRender'
import SelectorRender from 'components/parts/FormParts/Selector'


import RenderColumnItem from 'components/parts/RenderColumnItem'
import MaskedPhone from 'components/assets/MaskedPhone'

const Recipient = ({ user, setRecipienName, setRecipientPhone }) => {
  const recipient = [
    {
      label: 'Имя:',
      value: (
        <TextField
          fullWidth
          margin='normal'
          variant='outlined'
          defaultValue={`${user.customerName} ${user.customerLastname}`}
          onChange={e => setRecipienName(e.target.value)}
        />
      ),
    },
    {
      label: 'Адрес:',
      value: (
        <Typography paragraph>
          {
            [
              user.city,
              user.street,
              user.houseNumber,
              user.officeNumber,
            ].filter(item => !!item).join(', ')
          }
        </Typography>
      ),
    },
    {
      label: 'Email:',
      value: <Typography paragraph>{user.customerEmail}</Typography>,
    },
    {
      label: 'Телефон:',
      value: (
        <TextField
          fullWidth
          margin='normal'
          variant='outlined'
          onInput={e => setRecipientPhone(e.target.value)}
          InputProps={{
            inputComponent: MaskedPhone,
          }}
          defaultValue={user.customerPhone}
        />
      ),
    },
  ]
  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant='h5'>
        Получатель
      </Typography>
      <RenderColumnItem
        label={
          (
            <RFormControl
              name='customerType'
              render={
                props => (
                  <SelectorRender
                    {...props}
                    style={{ marginTop: 8, marginRight: 7 }}
                    items={[
                      { value: 1, label: 'Юр. илицо' },
                      { value: 2, label: 'ФИО' },
                    ]}
                  />
                )
              }
            />
          )
        }
        value={
          <RFormControl name='name' render={DefaultInputRender} />
        }
      />
      {/* {(user.customerEmail) && <RenderColumnItems items={recipient} />} */}
    </Paper>
  )
}

Recipient.defaultProps = {
  user: {},
}

Recipient.propTypes = {
  user: PropTypes.object,
  setRecipienName: PropTypes.func.isRequired,
  setRecipientPhone: PropTypes.func.isRequired,
}

export default Recipient
