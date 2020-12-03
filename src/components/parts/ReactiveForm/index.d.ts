import { SFC, ReactElement } from 'react'

export type InputTypes = 'select' | 'picker' | 'checkbox' | 'autocomplete' | 'masked' | 'text'

interface RenderFormItemPropsT {
  value: any,
  errors: {},
  touched: boolean,
  invalid: boolean,
  handlers: {
    onInput: (e: Event) => void,
    onBlur: (e: Event) => void,
    onChange: (e: Event) => void,
  },
  meta: IMeta,
}

export type RenderFormItemT = (props: RenderFormItemPropsT) => ReactElement

interface FormControlPropsT {
  name: string
  render: RenderFormItemT
}
export const FormControl: SFC<FormControlPropsT>

export interface IMeta {
  label?: string,
  withLabel?: boolean,
  hide?: boolean,
  type?: InputTypes,
  itemsList?: [],
  errorMessages?: { [messageName: string]: string }
  [key: string]: any,
}

export interface IControlConfig {
  meta?: IMeta,
  value?: any,
  validators?: ValidatorT[]
}

export interface IFormConfig {
  [controlName: string]: IControlConfig
}

type ValidatorT = (value: any) => ({ [key: string]: string })
type OnValueChangedT = (value: any) => void

export class Control {
  constructor(config: IControlConfig)
  private configUpdate: () => void
  private onUpdated: (name: string, value: any) => void
  private onValueChanged: OnValueChangedT
  private render: () => {}
  private validators: ValidatorT[]

  public name: string
  public touched: boolean
  public vaid: boolean
  public errors: { [key: string]: string }
  public value: any
  public invalid: boolean
  public meta: IMeta

  /**
    * Subscribe on validator 
  */
  valueChanges: (cb: OnValueChangedT) => void

  /**
    * Add new or replace exist meta item
  */
  setMeta: (meta: IMeta) => void

  /**
    * Force validation
  */
  validate: () => boolean

  /**
    * Force set value
  */
  setValue: (event: any) => void


  /**
    * Add new validator to the form control
  */
  addValidator: (newValidator: ValidatorT) => void

  /**
   * Add few validators in array
  */
  addValidators: (validators: ValidatorT[]) => void

  /**
   * Replace current validators by new walidators list
  */
  resetValidators: (validators: ValidatorT[]) => void
  /**
    * Remove all form control validators
  */
  removeValidators: () => void

  /**
    * Trigger blur event native form control
  */
  blur: () => void

  /**
   * Trigger touch event on native form control
  */
  touch: () => void
}

type ValuesT = { [controlName: string]: any }
type ApiMethodT = (data: any) => Promise<any>
type submitHandlerT = (form: ControlGroup, apiMethod: ApiMethodT) => void
type SubscriberT = (form: ControlGroup) => void


export class ControlGroup<C> {
  constructor(config: IFormConfig)

  private subscriber: SubscriberT
  private submitHandler: submitHandlerT
  private validChangedHandler: () => void

  public controls: Control[]
  public keys: string[]
  public touched: boolean
  public submited: boolean
  public valid: boolean
  public values: ValuesT
  public submit: (apiMethod: ApiMethodT) => void
  public cofigUbpdate: () => void
  public onUpdated: (name: string, value: any) => void
  public get: (name: string) => Control
  public getValuesForced: () => ValuesT
  public setValid: (valid: boolean) => void
  public onValidChanged: (handler: () => void) => void
  public validateAll: () => boolean
  public onSubmit: (handler: submitHandlerT) => void
  public setAsSubmited: () => void
  public setAsInvalid: () => void
  public registerUpdateSubscriber: (subscriber: SubscriberT) => void
}
