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
      newErrors = { ...newErrors, ...validator(this.value) }
    })
    this.valid = !Object.keys(newErrors).find(errorName => newErrors[errorName])
    this.invalid = !this.valid
    this.errors = newErrors
    this.onUpdated(this.name, this.value)
    return this.valid
  }

  setValue = (event) => {
    const { value } = event.target
    this.value = value
    this.validate()
  }

  blur = () => {
    this.touch()
  }

  touch = () => {
    this.touched = true
    return this.validate()
  }
}
