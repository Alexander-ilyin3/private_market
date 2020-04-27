import { Control } from './Control'


export class ControlGroup {
  constructor(controls = []) {
    this.keys = Object.keys(controls)
    this.controls = Object.fromEntries(this.keys.map(
      controlName => [controlName, new Control(controlName, controls[controlName], this.onUpdated)],
    ))
    this.subscriber = () => {}
    this.touched = false
    this.submited = false
    this.valid = false
    this.values = Object.fromEntries(this.keys.map(
      controlName => [controlName, this.controls[controlName].value],
    ))
    this.submitHandler = () => {}
    this.validChangedHandler = () => {}
  }

  submit = (e) => {
    e.preventDefault()
    this.setAsSubmited()
    if (!this.valid) {
      this.validateAll()
    }
    this.subscriber(this)
    if (this.valid) this.submitHandler(this)
  }


  onUpdated = (name, value) => {
    this.touched = true
    this.values[name] = value
    this.setValid(!this.keys.find(key => this.controls[key].invalid))
    this.subscriber(this)
  }

  get = name => this.controls[name]

  getValuesForced = () => {
    const values = Object.fromEntries(this.keys.map(
      controlName => [controlName, this.controls[controlName].value],
    ))
    return values
  }

  setValid = (valid) => {
    if (valid !== this.valid) {
      this.valid = valid
      this.validChangedHandler()
      this.subscriber(this)
    }
  }

  onValidChanged = (handler) => {
    this.validChangedHandler = handler
  }

  validateAll = () => {
    if (Object.keys(this.controls).find(control => !this.controls[control].touch())) {
      this.setValid(false)
    } else {
      this.setValid(true)
    }
    return this.valid
  }

  onSubmit = (handler) => {
    this.submitHandler = handler
  }

  setAsSubmited = () => {
    this.submited = true
    this.validChangedHandler()
  }

  setAsInvalid = () => {
    this.setValid(false)
    this.touched = true
  }

  registerUpdateSubscriber(subscriber) {
    this.subscriber = subscriber
  }
}
