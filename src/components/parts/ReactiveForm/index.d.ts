import { FunctionComponent, ReactElement } from 'react'

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
export const FormControl: FunctionComponent<FormControlPropsT>

export interface IMeta {
  label?: string,
  withLabel?: boolean,
  type?: InputTypes,
  itemsList?: [],
  errorMessages?: { [messageName: string]: string }
  [key: string]: any,
}

export interface IControlConfig {


  meta?: IMeta,
  value?: any,
  validators?: ValidatorT[]
  hide: (values: {[key: string]: any}) => void
}

export interface IFormConfig {
  [controlName: string]: IControlConfig
}

type ValidatorT = (value: any) => ({ [key: string]: string })
type OnValueChangedT = (value: any) => void
type OnValidChangedT = (valid: boolean, item: Control) => void
type ValuesT = { [controlName: string]: any }

export interface IControlConfig {

  disabled: ((values: ValuesT) => boolean) | boolean;
  meta?: IMeta;
  value?: any;
  validators?: ValidatorT[];
  hide: (values: {[key: string]: any}) => void;
}

export class Control {
  constructor(config: IControlConfig)
  private configUpdate: () => void
  private onUpdated: (name: string, value: any) => void
  private onValueChanged: OnValueChangedT
  private onValidChanged: OnValidChangedT
  private render: () => {}
  private validators: ValidatorT[]

  /**
    * Name of form item
  */
  public name: string

  /**
    * True if item is touched by user
  */
  public touched: boolean

  /**
    * False, if some of validators retuned error
  */
  public vlaid: boolean

  /**
    * List of available errors
  */
  public errors: { [key: string]: string }

  /**
    * Current item value
  */
  public value: any

  /**
    * True, if some of validators retuned error
  */
  public invalid: boolean

  /**
    * Metadata. Passes to the render method
  */
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

  public setError: (error: string, message: string) => void

  /**
   * Function called by parent form if form is updated
  */ 
  public formUpdated: (form: ControlGroup) => void

  /**
   * Immediately set visibility of element
  */  
  public setHide: (hide: boolean) => void

  /**
   * Register valid changes handler
  */  
  public validChanges: (cb: OnValidChangedT) => void
}

type ApiMethodT = (data: any) => Promise<any>
type submitHandlerT = (form: ControlGroup, apiMethod: ApiMethodT) => void
type SubscriberT = (form: ControlGroup) => void


export class ControlGroup {
  constructor(config: IFormConfig)

  private subscriber: SubscriberT
  private submitHandler: submitHandlerT
  private validChangedHandler: () => void
  private configUpdate: () => void
  private onUpdated: (name: string, value: any) => void
  private setAsSubmited: () => void
  private setAsInvalid: () => void
  private setValid: (valid: boolean) => void
  private validateAll: () => boolean

  public registerUpdateSubscriber: (subscriber: SubscriberT) => void

  /**
   * List of controls objects
  */ 
  public controls: { [key: name]: Control }

  /**
   * List of form items names
  */ 
  public keys: string[]

  /**
   * True if some one form item is touched
  */ 
  public touched: boolean

  /**
   * True if submit function called
  */ 
  public submited: boolean
  
  /**
   * True if all of items is true
  */ 
  public valid: boolean

  /**
   * Object (key: val) names of controls with value
  */ 
  public values: ValuesT

  /**
   * Initiate form submiting (Called submit handler passed to the onSubmit function)
  */ 
  public submit: (apiMethod: ApiMethodT) => void

  /**
   * Return form item by name
  */ 
  public get: (name: string) => Control
  
  /**
   * Forced return bject (key: val) names of controls with value
  */ 
  public getValuesForced: () => ValuesT

  /**
   * Forced recalculate form with it curent values
  */ 
  public recalculate: () => void

  /**
   * Attach submit handler
  */ 
  public onSubmit: (handler: submitHandlerT) => void
  public onValidChanged: (handler: () => void) => void

}
