import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { TextField, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  toOrderButon: {
    boxSizing: 'content-box',
    whiteSpace: 'nowrap',
    marginRight: '-12px',
  },
  singleChar: {
    minWidth: 0,
  },
  text: {
    maxWidth: 200,
    minWidth: 180,
  },
  textWithSingleCharButton: {
    maxWidth: 120,
    minWidth: 100,
  },
})

const ToOrderInput = (props) => {
  const {
    classes,
    buttonColor,
    buttonContent,
    onAdd,
    disabled,
  } = props
  const [count, setCount] = useState(1)
  return (
    <TextField
      variant='outlined'
      type='number'
      disabled={disabled}
      className={
        classNames(classes.text, {
          [classes.textWithSingleCharButton]: (typeof buttonContent === 'string') && buttonContent.length < 2,
        })
      }
      onInput={e => setCount(e.target.value)}
      onClick={e => e.stopPropagation()}
      defaultValue={1}
      InputProps={{
        endAdornment: (
          <Button
            disabled={disabled}
            variant='contained'
            onClick={() => onAdd(count)}
            color={buttonColor}
            className={classNames(classes.toOrderButon, { [classes.singleChar]: (typeof buttonContent === 'string') && buttonContent.length < 2 })}
          >
            {buttonContent}
          </Button>
        ),
      }}
      // eslint-disable-next-line react/jsx-no-duplicate-props
      inputProps={{
        min: 1,
        step: 1,
      }}
    />
  )
}

ToOrderInput.propTypes = {
  classes: PropTypes.object,
  buttonColor: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'inherit',
  ]),
  buttonContent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  onAdd: PropTypes.func,
  disabled: PropTypes.bool,
}

ToOrderInput.defaultProps = {
  classes: {},
  buttonColor: 'default',
  buttonContent: 'Add',
  onAdd: () => { },
  disabled: false,
}

export default withStyles(styles)(ToOrderInput)
