import React from 'react'

export const getHelperText = (errors = {}, errorMessages) => {
  if (errorMessages) {
    const existErrors = Object.keys(errors).filter(key => errors[key])
    return errorMessages[existErrors[0]]
  }
  return (
    <>
      {(errors.required && 'Поле обязательно к заполнению')}
    </>
  )
}
