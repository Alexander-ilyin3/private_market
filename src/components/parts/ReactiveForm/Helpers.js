const defaultMessages = {
  required: 'Поле обязательно к заполнению',
}

export const getHelperText = (errors = {}, errorMessages) => {
  const existErrors = Object.keys(errors).filter(key => errors[key])
  if (errorMessages) {
    if (errorMessages[existErrors[0]]) {
      return errorMessages[existErrors[0]]
    }
    return defaultMessages[existErrors[0]]
  }
  return defaultMessages[existErrors[0]]
}
