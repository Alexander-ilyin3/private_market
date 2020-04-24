export class Control {
  constructor(controlName, configs, onUpdated) {
    this.onUpdated = onUpdated
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
    const { value } = event.target
    this.value = value
    this.validate()
    this.onUpdated(this.name, this.value)
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
