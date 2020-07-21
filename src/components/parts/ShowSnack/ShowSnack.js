import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

import { sliceStack } from 'storage/actions/snack.actions'

const Alert = props => <MuiAlert elevation={6} variant='filled' {...props} />

const defaultMessages = {
  error: 'Ой! Кажется что то пошло не так',
  warning: 'Внимание!',
  info: 'Инфо',
  success: 'Успешно',
}


const Snack = ({ variant, message }) => {
  const snackVariant = variant || 'warning'
  let snackMessage = defaultMessages[variant]
  if (message) snackMessage = message
  return (
    <Alert severity={snackVariant}>
      {snackMessage}
    </Alert>
  )
}

Snack.defaultProps = {
  variant: '',
  message: '',
}

Snack.propTypes = {
  variant: PropTypes.string,
  message: PropTypes.string,
}

const ShowSnack = ({ snackPack }) => {
  const [open, setOpen] = React.useState(false)
  const [messageInfo, setMessageInfo] = React.useState(undefined)

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      setMessageInfo({ ...snackPack[0] })
      sliceStack()
      setOpen(true)
    } else if (snackPack.length && messageInfo && open) {
      setOpen(false)
    }
  }, [snackPack, messageInfo, open])


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const handleExited = () => {
    setMessageInfo(undefined)
  }

  return (
    <Snackbar
      key={messageInfo ? messageInfo.key : undefined}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      onExited={handleExited}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Snack {...messageInfo} />
    </Snackbar>
  )
}

ShowSnack.propTypes = {
  snackPack: PropTypes.array.isRequired,
}

export default ShowSnack
