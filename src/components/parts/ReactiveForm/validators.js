function emailValidator(value) {
  const invalid = !value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  return invalid ? { emailInvalid: invalid } : null
}

function required(value) {
  return !value ? { required: !value } : null
}

function password(value) {
  const invalid = !value.match(/(?=^.{8,}$)^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/)
  return invalid ? { passwordInvalid: invalid } : null
}

const compareWith = control => (value) => {
  const invalid = control.value !== value
  return invalid ? { notMatched: invalid } : null
}
const validateSibling = siblng => () => {
  siblng.validate()
}

export {
  emailValidator,
  required,
  password,
  compareWith,
  validateSibling,
}
