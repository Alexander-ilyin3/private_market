import React from 'react'

import PropTypes from 'prop-types'

const FormControl = ({ name, render }) => <>{render(name)}</>

export default FormControl

FormControl.propTypes = {
  name: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
}
