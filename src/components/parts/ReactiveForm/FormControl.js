import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import RenderColumnItem from 'components/parts/RenderColumnItem'

import { FormContext } from './formContext'
import MemoizedControl from './MemoizedControl'

const FormControl = ({ name, render }) => {
  const { controls } = useContext(FormContext)
  const control = controls[name]
  if (!control) {
    console.error(`Control config for the "${name}" field is not found. Please check your form config`)
    return ''
  }
  const {
    value,
    errors,
    touched,
    valid,
    invalid,
    meta,
    hide,
    disabled,
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
    disabled,
  }
  if (['select', 'picker', 'checkbox', 'autocomplete'].includes(meta.type)) {
    props.onChange = controls[name].setValue
  }
  if (['masked'].includes(meta.type)) {
    delete props.onInput
    props.onChange = controls[name].setValue
  }
  if (hide) return <></>
  if (meta.withLabel) {
    return <RenderColumnItem key={name} label={meta.label} value={<MemoizedControl {...props} />} />
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
