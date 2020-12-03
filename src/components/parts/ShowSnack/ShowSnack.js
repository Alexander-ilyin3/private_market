import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

import { sliceStack } from 'storage/actions/snack.actions'
import { store } from 'storage'
import { snackInfo } from 'storage/selectors/snack.selector'

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

class ShowSnack extends Component {
  processing = false

  state = {
    snacks: [],
  }

  setMessageInfo = (info) => {
    const { snacks } = this.state
    this.setState({ snacks: [...snacks, info] })
  }

  componentDidUpdate = () => {
    const { snackPack } = this.props
    if (snackPack.length > 0) {
      const addToQue = () => {
        if (!this.processing) {
          this.processing = true
          const snackPack = snackInfo(store.getState())
          this.setMessageInfo({
            ...snackPack[0],
            id: parseInt(Math.random() * 10000000000000000, 10),
          })
          sliceStack()
          setTimeout(() => {
            this.processing = false
            if (snackInfo(store.getState()).length > 0) {
              addToQue()
            }
          }, 200)
        }
      }
      addToQue()
    }
  }

  handleClose = (reason, id) => {
    if (reason === 'timeout') {
      const { snacks } = this.state
      this.setState({ snacks: snacks.filter(snack => snack.id !== id) })
    } else {
      this.setState({ snacks: [] })
    }
  }

  exitedHandler = (id) => {
    const { snacks } = this.state
    this.setState({ snacks: snacks.filter(snack => snack.id !== id) })
  }

  render() {
    const { snacks } = this.state
    return snacks.map((snack, i) => (
      <Snackbar
        style={{ top: (snacks.length - i - 1) * 60 }}
        key={snack.id}
        open
        autoHideDuration={6000}
        onClose={(event, reason) => this.handleClose(reason, snack.id)}
        onExited={() => this.exitedHandler(snack.id)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        // TransitionProps={{  }}
      >
        <Snack {...snack} />
      </Snackbar>
    ))
  }
}

ShowSnack.propTypes = {
  snackPack: PropTypes.array.isRequired,
}

export default ShowSnack
