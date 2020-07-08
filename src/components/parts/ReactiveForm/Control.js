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
    const {
      validators = [],
      render,
      value = '',
      meta = {},
    } = configs
    this.name = controlName
    this.render = render
    this.validators = validators
    this.touched = false
    this.valid = !(this.validators.length > 0)
    this.errors = {}
    this.value = value
    this.invalid = this.validators.length > 0
    this.meta = meta
  }

  valueChanges = (cb) => {
    this.onValueChanged = cb
  }

  setMeta = (meta) => {
    this.meta = { ...this.meta, ...meta }
    this.configUpdate()
  }

  validate = () => {
    let newErrors = {}
    this.validators.forEach((validator) => {
      if (validator && (validator instanceof Function)) {
        newErrors = { ...newErrors, ...validator(this.value) }
      }
    })
    this.valid = !Object.keys(newErrors).find(errorName => newErrors[errorName])
    this.invalid = !this.valid
    this.errors = newErrors
    return this.valid
  }

  setValue = (event) => {
    let value = null
    if (typeof event === 'string' || typeof event === 'number' || event instanceof Date) {
      value = event
    } else {
      const { type } = event.target
      if (type === 'checkbox') {
        const { checked } = event.target
        value = checked
      } else if (!type || ['password', 'text'].includes(type)) {
        const { target } = event
        value = target.value
      }
    }

    this.value = value
    this.validate()
    this.onUpdated(this.name, this.value)
    this.onValueChanged(value)
  }

  addValidator = (newValidator) => {
    this.validators = [...this.validators, newValidator]
  }

  blur = () => {
    this.touch()
    this.onUpdated(this.name, this.value)
  }

  touch = () => {
    this.touched = true
    return this.validate()
  }
}
