import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

export default function FormDialog({ open, token, close }) {
  const [newToken, setNewToken] = useState(token || '')


  const handleClose = () => {
    close()
  }

  const handleSave = async () => {
    console.log(newToken)
    handleClose()
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
