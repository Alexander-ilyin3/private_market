export class Control {
  constructor(
    controlName,
    configs,
    onUpdated,
    configUpdate,
  ) {
    this.configUpdate = configUpdate
    this.onUpdated = onUpdated
    this.onValueChanged = () => {}
    this.onValidChanged = () => {}
    const {
      validators = [],
      render,
      value = '',
      meta = {},
      hide,
      disabled,
    } = configs
    this.checkDisabled = disabled
    this.hideCheck = hide
    this.name = controlName
    this.render = render
    this.validators = validators
    this.touched = false
    this.valid = !(this.validators.length > 0)
    this.errors = {}
    this.value = value
    this.invalid = this.validators.length > 0
    this.meta = meta
    if (typeof disabled === 'boolean') {
      this.disabled = disabled
    }
  }

  valueChanges = (cb) => {
    this.onValueChanged = cb
  }

  validChanges = (cb) => {
    this.onValidChanged = cb
  }

  setMeta = (meta) => {
    this.meta = { ...this.meta, ...meta }
    this.configUpdate()
  }

  validate = () => {
    let newErrors = {}
    const { hide } = this
    if (hide) {
      this.valid = true
      this.invalid = false
      this.errors = newErrors
      return this.valid
    }
    this.validators.forEach((validator) => {
      if (validator && (validator instanceof Function)) {
        newErrors = { ...newErrors, ...validator(this.value) }
      }
    })
    const prevValid = this.valid
    this.valid = !Object.keys(newErrors).find(errorName => newErrors[errorName])
    this.invalid = !this.valid
    this.errors = newErrors
    if (prevValid !== this.valid) {
      this.onValidChanged(this.valid, this)
    }
    return this.valid
  }

  setValue = (event) => {
    let value = null
    if (
      typeof event === 'string'
      || typeof event === 'number'
      || event instanceof Date
      || this.meta.type === 'autocomplete'
    ) {
      value = event
    } else {
      const { type } = event.target
      if (type === 'checkbox') {
        const { checked } = event.target
        value = checked
      } else if (!type || ['password', 'text', 'textarea'].includes(type)) {
        const { target } = event
        value = target.value
      }
    }

    this.value = value
    this.validate()
    this.onUpdated(this.name, this.value)
    this.onValueChanged(value)
  }

  setError = (error, message) => {
    this.errors = { [error]: true }
    this.touched = true
    this.invalid = true
    this.valid = false
    const prevMessages = this.meta.errorMessages || {}
    this.setMeta({ errorMessages: { ...prevMessages, [error]: message } })
    this.onUpdated(this.name, this.value)
  }

  addValidator = (newValidator) => {
    this.validators = [...this.validators, newValidator]
    this.validate()
  }

  addValidators = (validators) => {
    this.validators = [...this.validators, ...validators]
    this.validate()
  }

  removeValidators = () => {
    this.validators = []
    this.validate()
  }

  resetValidators = (validators) => {
    this.removeValidators()
    this.addValidators(validators)
    this.validate()
  }

  blur = () => {
    this.touch()
    this.onUpdated(this.name, this.value)
  }

  touch = () => {
    this.touched = true
    return this.validate()
  }

  recalculate() {
    this.setValue(this.value)
  }

  formUpdated({ values }) {
    if (this.hideCheck) {
      this.hide = this.hideCheck(values)
    }
    if (this.checkDisabled && typeof this.checkDisabled === 'function') {
      this.disabled = this.checkDisabled(values)
    }
  }

  setHide(hide) {
    this.hide = hide
  }
}
