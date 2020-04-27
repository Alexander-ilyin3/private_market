import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { FormContext } from './formContext'
import FormControl from './FormControl'

const FormGroup = (props) => {
  const form = useContext(FormContext)
  const { controls } = form
  const { render } = props
  if (render) {
    return render(form)
  }
  const elements = Object.keys(controls)
    .map(controlName => <FormControl name={controlName} />)

  return <>{elements}</>
}


FormGroup.propTypes = {
  render: PropTypes.func.isRequired,
}


export default FormGroup
