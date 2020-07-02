import React from 'react'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'


import RenderColumnItems from 'components/parts/RenderColumnItems'
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
      {(user.customerEmail) && <RenderColumnItems items={recipient} />}
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
