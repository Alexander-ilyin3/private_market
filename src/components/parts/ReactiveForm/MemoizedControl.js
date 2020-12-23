import React from 'react'

export default React.memo((props) => {
  const {
    value,
    errors = {},
    touched,
    invalid,
    onInput,
    onBlur,
    onChange,
    render = () => {},
    meta,
    disabled,
  } = props
  const mappedProps = {
    value,
    errors,
    touched,
    invalid,
    handlers: {
      onInput,
      onBlur,
      onChange,
    },
    meta,
    disabled,
  }
  if (['select'].includes(meta.type)) {
    mappedProps.handlers.onClose = onBlur
  }
  return (
    <>
      {render(mappedProps)}
    </>
  )
})
