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
  }

  onUpdated = (name, value) => {
    this.touched = true
    this.values[name] = value
    this.valid = !this.keys.find(key => this.controls[key].invalid)
    this.subscriber(this)
  }

  get = name => this.controls.find(control => control.name === name)

  getValuesForced = () => {
    const values = Object.fromEntries(this.keys.map(
      controlName => [controlName, this.controls[controlName].value],
    ))
    return values
  }

  validateAll = () => {
    this.valid = true
    Object.keys(this.controls).forEach((control) => {
      const valid = this.controls[control].touch()
      if (!valid) this.valid = false
    })
    return this.valid
  }

  registerUpdateSubscriber(subscriber) {
    this.subscriber = subscriber
  }
}
