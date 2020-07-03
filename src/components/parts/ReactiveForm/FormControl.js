import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'

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
  if (['select', 'picker', 'checkbox'].includes(meta.type)) {
    props.onChange = controls[name].setValue
  }
  if (meta.hide) return <></>
  if (meta.withLabel) {
    return (
      <Grid key={meta.label} container spacing={0}>
        <Grid item xs={4} style={{ display: 'flex', alignItems: 'center' }}>
          {meta.label}
        </Grid>
        <Grid item xs={8}>
          <MemoizedControl
            {...props}
          />
        </Grid>
      </Grid>
    )
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
