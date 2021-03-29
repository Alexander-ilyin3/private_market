import React, { Component, forwardRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import Button from '@material-ui/core/Button'
import Slide from '@material-ui/core/Slide'
import Fade from '@material-ui/core/Fade'
import Grow from '@material-ui/core/Grow'

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


const Snack = forwardRef(({
  variant,
  message,
  onClose,
  noAutohide,
  duration,
}, ref) => {
  const snackVariant = variant || 'warning'

  useEffect(() => {
    if (noAutohide) return
    setTimeout(() => {
      onClose()
    }, duration)
  }, [duration, noAutohide, onClose])
  let snackMessage = defaultMessages[variant]
  if (message) snackMessage = message
  return (
    <div ref={ref} style={{ marginBottom: 8, display: 'flex', justifyContent: 'center' }}>
      <Alert
        onClose={onClose}
        severity={snackVariant}
        action={noAutohide && (
          <Button color='inherit' size='small' onClick={onClose}>
            ПОНЯТНО
          </Button>
        )}
      >
        {snackMessage}
      </Alert>
    </div>
  )
})

Snack.defaultProps = {
  variant: '',
  message: '',
  onClose: null,
  noAutohide: false,
  duration: 6000,
}

Snack.propTypes = {
  variant: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  noAutohide: PropTypes.bool,
  duration: PropTypes.number,
}

const animationMethodMap = {
  slide: Slide,
  fade: Fade,
  grow: Grow,
}

const animatedAlert = (snack, onClose) => {
  const { animationType = 'slide' } = snack
  const Animate = animationMethodMap[animationType]
  return (
    <Animate key={snack.id} direction='up' in={snack.show} mountOnEnter unmountOnExit>
      <Snack
        {...snack}
        onClose={() => onClose('timeout', snack.id)}
      />
    </Animate>
  )
}
class ShowSnack extends Component {
  processing = false

  state = {
    snacks: [],
  }

  setMessageInfo = (info) => {
    const { snacks } = this.state
    setTimeout(() => {
      this.setState({ snacks: [...snacks, info] })
    })
  }


  componentDidUpdate = () => {
    const { snackPack } = this.props
    if (snackPack.length > 0) {
      const addToQue = () => {
        if (!this.processing) {
          this.processing = true
          const snackPack = snackInfo(store.getState())
          const id = parseInt(Math.random() * 10000000000000000, 10)
          this.setMessageInfo({
            ...snackPack[0],
            id,
            show: true,
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

  remove = (id) => {
    const { snacks } = this.state
    this.setState({ snacks: snacks.filter(snack => snack.id !== id) })
  }

  handleClose = (reason, id) => {
    if (reason === 'timeout') {
      const { snacks } = this.state
      this.setState({
        snacks: snacks.map((snack) => {
          if (snack.id === id) {
            snack.show = false
          }
          return snack
        }),
      })
      setTimeout(() => this.remove(id), 1000)
    } else {
      const { snacks } = this.state
      this.setState({
        snacks: snacks.map((snack) => {
          const show = snack.noAutohide ? snack.show : false
          return ({ ...snack, show })
        }),
      })
      setTimeout(() => this.setState(
        currentState => ({ snacks: currentState.snacks.filter(snack => snack.show) }),
      ), 1000)
    }
  }

  exitedHandler = (id) => {
    const { snacks } = this.state
    this.setState({ snacks: snacks.filter(snack => snack.id !== id) })
  }

  render() {
    const { snacks } = this.state
    return (
      <Snackbar
        open
        autoHideDuration={0}
        onClose={(event, reason) => this.handleClose(reason, null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transitionDuration={1}
      >
        <div>
          {snacks.map(snack => animatedAlert(snack, this.handleClose))}
        </div>

      </Snackbar>
    )
  }
}

ShowSnack.propTypes = {
  snackPack: PropTypes.array.isRequired,
}

export default ShowSnack
