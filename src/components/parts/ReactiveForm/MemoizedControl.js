import React from 'react'

export default React.memo((props) => {
  const {
    value,
    errors = {},
    touched,
    invalid,
    onInput,
    onBlur,
    render = () => {},
    meta,
  } = props
  return (
    <>
      {render({
        value,
        errors,
        touched,
        invalid,
        handlers: {
          onInput,
          onBlur,
        },
        meta,
      })}
    </>
  )
})
