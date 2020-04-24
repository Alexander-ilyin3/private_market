import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { FormContext } from './formContext'
import FormGroup from './FormGroup'
import { ControlGroup } from './ControlGroup'

export default class FormContainer extends Component {
  constructor(props) {
    super(props)
    const { controlGroup } = props
    this.state = {
      controlGroup: props.controlGroup,
    }
    controlGroup.registerUpdateSubscriber((controlGroup) => {
      this.setState({ controlGroup })
    })
  }

  render() {
    const { children } = this.props
    const { controlGroup } = this.state
    return (
      <FormContext.Provider value={controlGroup}>
        <FormGroup>{children}</FormGroup>
      </FormContext.Provider>
    )
  }
}


FormContainer.propTypes = {
  controlGroup: PropTypes.instanceOf(ControlGroup).isRequired,
  children: PropTypes.node.isRequired,
}
