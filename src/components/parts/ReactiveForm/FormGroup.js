import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { FormContext } from './formContext'
import MemoizedControl from './MemoizedControl'
import FormControl from './FormControl'


export default class FormGroup extends Component {
  constructor(props) {
    super(props)
    this.childs = props.children
  }


  wrapWithProps = (settings) => {
    const { name, render } = settings
    const { controls } = this.context
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

  renderChildren = (children, key) => {
    if (!children) return null
    if (!children.map) {
      if (children.type === FormControl) {
        return this.wrapWithProps(children.props)
      }
      const { props } = children
      if (!props || !props.children) {
        return children
      }
      const innerChildren = props.children
      return (
        <children.type {...children.props} key={key}>
          {this.renderChildren(innerChildren, key)}
        </children.type>
      )
    }
    return children.map((child, key) => this.renderChildren(child, key))
  }

  render() {
    const { controls } = this.context
    if (this.childs) {
      return this.renderChildren(this.childs)
    }
    const elements = Object.keys(controls)
      .map(controlName => this.wrapWithProps({ name: controlName }))

    return <>{elements}</>
  }
}

FormGroup.contextType = FormContext

FormGroup.defaultProps = {
  children: <></>,
}

FormGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
  ]),
}
