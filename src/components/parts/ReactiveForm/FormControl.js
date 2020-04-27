import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { FormContext } from './formContext'
import MemoizedControl from './MemoizedControl'

const FormControl = ({ name, render }) => {
  const { controls } = useContext(FormContext)
  const control = controls[name]
  const {
    value,
    errors,
    touched,
    valid,
    invalid,
    meta,
  } = control
  const props = {
    key: name,
    render: render || control.render,
    value,
    errors,
    touched,
    valid,
    invalid,
    onInput: controls[name].setValue,
    onBlur: controls[name].blur,
    meta,
  }
  return (
    <MemoizedControl
      {...props}
    />
  )
}

export default FormControl

FormControl.propTypes = {
  name: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
}
