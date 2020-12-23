import React from 'react'
import PropTypes from 'prop-types'

import DefaultInputRender from './DefaultInputRrnder'

const passwordMeta = {
  type: 'password',
}

const PasswordInputRender = (props) => {
  const { meta } = props
  const newProps = { ...props, meta: { ...meta, ...passwordMeta } }
  return <DefaultInputRender {...newProps} />
}

PasswordInputRender.defaultProps = {
  meta: {},
}

PasswordInputRender.propTypes = {
  meta: PropTypes.object,
}

export default PasswordInputRender
