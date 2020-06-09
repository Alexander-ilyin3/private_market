import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import { checkAlloved } from 'config/roles'

const PrivateRoute = ({
  // component: Component,
  allowedRoles,
  history,
  ...rest
}) => {
  if (checkAlloved({ allowedRoles })) {
    return (
      <Route
        {...rest}
      />
    )
  }
  history.goBack()
  return ''
}

PrivateRoute.defaultProps = {
  allowedRoles: null,
}

PrivateRoute.propTypes = {
  // component: PropTypes.node.isRequired,
  allowedRoles: PropTypes.array,
  history: PropTypes.object.isRequired,
}

export default PrivateRoute
