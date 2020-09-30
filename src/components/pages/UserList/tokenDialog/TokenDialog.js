import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { setAllTokens } from 'services/api/token'

const FormDialog = ({
  open,
  token,
  close,
  userId,
  onSuccess,
  code,
}) => {
  const [newToken, setNewToken] = useState(token || '')
  const [newCode, setNewCode] = useState(code || '')

  const handleClose = () => {
    close()
  }

  const handleSave = async () => {
    if (await setAllTokens({ userId, token: newToken, code: newCode })) {
      handleClose()
      onSuccess()
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Токен пользователя</DialogTitle>
        <DialogContent>
          <DialogContentText>
            { token ? 'Изменить токен' : 'Установить токен' }
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Токен'
            fullWidth
            defaultValue={token}
            onInput={({ target }) => setNewToken(target.value)}
          />
          <DialogContentText>
            { code ? 'Изменить код' : 'Установить код' }
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Код'
            fullWidth
            defaultValue={code}
            onInput={({ target }) => setNewCode(target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Отмена
          </Button>
          <Button onClick={handleSave} color='primary'>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

FormDialog.defaultProps = {
  open: false,
  token: '',
  userId: null,
  code: '',
}

FormDialog.propTypes = {
  open: PropTypes.bool,
  token: PropTypes.string,
  close: PropTypes.func.isRequired,
  userId: PropTypes.number,
  onSuccess: PropTypes.func.isRequired,
  code: PropTypes.string,
}


export default FormDialog
