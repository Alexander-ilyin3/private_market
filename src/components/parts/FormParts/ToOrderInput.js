import React from 'react'
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
  } = props
  return (
    <TextField
      variant='outlined'
      type='number'
      className={
        classNames(classes.text, {
          [classes.textWithSingleCharButton]: (typeof buttonContent === 'string') && buttonContent.length < 2,
        })
      }
      onClick={e => e.stopPropagation()}
      InputProps={{
        endAdornment: (
          <Button
            variant='contained'
            onClick={onAdd}
            color={buttonColor}
            className={classNames(classes.toOrderButon, { [classes.singleChar]: (typeof buttonContent === 'string') && buttonContent.length < 2 })}
          >
            {buttonContent}
          </Button>
        ),
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
}

ToOrderInput.defaultProps = {
  classes: {},
  buttonColor: 'default',
  buttonContent: 'Add',
  onAdd: () => {},
}

export default withStyles(styles)(ToOrderInput)
