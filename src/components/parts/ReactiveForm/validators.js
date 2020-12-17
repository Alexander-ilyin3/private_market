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

const phoneValidator = (value) => {
  const invalid = !value.match(/\(\d\d\d\)\d\d\d-\d\d-\d\d/)
  return invalid ? { phoneInvalid: invalid } : null
}

const minValue = min => (value) => {
  const invalid = value < min
  return invalid ? { lessThenMin: invalid } : null
}

const fixedLength = length => (value) => {
  const invalid = value && value.length !== length
  return invalid ? { invalidLength: invalid } : null
}

const onlyInteger = (value) => {
  if (typeof value !== 'string') value = String(value)
  const valid = value.match(/^\d+?$/)
  return valid ? null : { onlyInteger: !valid }
}

export {
  emailValidator,
  required,
  password,
  compareWith,
  validateSibling,
  phoneValidator,
  minValue,
  onlyInteger,
  fixedLength,
}
