function emailValidator(value) {
  const invalid = !value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  return invalid ? { emailInvalid: invalid } : null
}

function required(value) {
  return !value ? { required: !value } : null
}

export { emailValidator, required }
