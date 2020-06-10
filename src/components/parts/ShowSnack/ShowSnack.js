import React from 'react'
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

import { hideSnack } from 'storage/actions/snack.actions'

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

const ShowSnack = ({ snackInfo }) => {
  const { open } = snackInfo
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={hideSnack}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Snack {...snackInfo} />
    </Snackbar>
  )
}

ShowSnack.propTypes = {
  snackInfo: PropTypes.object.isRequired,
}

export default ShowSnack
