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
      this.forceUpdate()
    })
  }

  render() {
    const { render } = this.props
    const { controlGroup } = this.state
    return (
      <FormContext.Provider value={controlGroup}>
        <FormGroup render={render} />
      </FormContext.Provider>
    )
  }
}


FormContainer.propTypes = {
  controlGroup: PropTypes.instanceOf(ControlGroup).isRequired,
  render: PropTypes.func.isRequired,
}
