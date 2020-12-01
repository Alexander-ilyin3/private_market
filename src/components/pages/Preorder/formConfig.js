import { warehouseAutocomplete } from 'services/api/order.service'
import { ControlGroup, validators } from 'components/parts/ReactiveForm'

const {
  required,
  phoneValidator,
  minValue,
  onlyInteger,
} = validators


const patternValidatorCreator = (pattern, messageName) => function patternValidator(value) {
  if (value.match(pattern)) {
    return null
  }
  return { [messageName]: true }
}

export const createForm = () => {
  const form = new ControlGroup({
    deliveryType: { value: 1, meta: { label: 'Способ доставки', type: 'select', withLabel: true }, validators: [required] },
    city: {
      meta: {
        label: 'Город',
        withLabel: true,
        hide: true,
        type: 'autocomplete',
      },
      validators: [required],
    },
    warehouse: {
      meta: {
        label: 'Склад',
        withLabel: true,
        hide: true,
        type: 'autocomplete',
        itemsList: [],
      },
      validators: [required],
    },

    customerType: { value: 2, meta: { label: 'Юр/Физ лицо', type: 'select' }, validators: [required] },
    name: {
      meta: {
        label: 'Название / ФИО',
        errorMessages: {
          not3Name: 'Введите имя фамилию и отчество разделяя их пробелами',
          not2Name: 'Введите имя и фамилию разделяя их пробелами (отчество - опционально)',
        },
      },
      validators: [required],
    },
    phone: {
      value: '0',
      meta: {
        label: 'Телефон',
        errorMessages: { phoneInvalid: 'Недеййствительный' },
        type: 'masked',
      },
      validators: [required, phoneValidator],
    },
    paymentType: { meta: { label: 'Способ оплаты', type: 'select' }, validators: [required] },
    pymentAmount: {
      meta: {
        label: 'Сумма',
        errorMessages: {
          lessThenMin: 'Не может быть меньше 0',
          onlyInteger: 'Только целые числа',
        },
      },
      validators: [required, minValue(0), onlyInteger],
    },
    deliveryPayer: { meta: { label: 'Плательщик доставки', type: 'select' }, validators: [required] },
    CODPayer: { meta: { label: 'Платит за наложку', type: 'select', hide: true }, validators: [required] },
    insuranceAmount: {
      value: 300,
      meta: {
        label: 'Страховка',
        errorMessages: {
          lessThenMin: 'Не может быть меньше чем 300',
        },
      },
      validators: [required, minValue(300)],
    },
    insurancePayment: { meta: { label: 'Форма оплаты', type: 'select' }, validators: [required] },
    EDRPOU: { meta: { label: 'ЕДРПОУ', hide: true }, validators: [required] },
    toDoor: { meta: { label: 'Адресная Доставка', type: 'checkbox', hide: true } },
    deliveryAddress: { meta: { label: 'Улица, номер дома, квартиры', withLabel: true, hide: true }, validators: [required] },
    comment: { },
  })

  const cityFormItem = form.get('city')
  const warehouseFormItem = form.get('warehouse')
  const paymentTypeFormItem = form.get('paymentType')
  const CODPayerFormItem = form.get('CODPayer')
  const toDoorFormItem = form.get('toDoor')
  const deliveryAddress = form.get('deliveryAddress')
  const nameFormItem = form.get('name')
  const deliveryTypeFormItem = form.get('deliveryType')
  const customerTypeFormItem = form.get('customerType')

  const name3PartsValidator = patternValidatorCreator(/^\s*\S+\s+\S+\s+\S+\s*$/, 'not3Name')
  const name2or3PartsValidator = patternValidatorCreator(/^\s*\S+\s+\S+(\s+\S+)?\s*$/, 'not2Name')

  nameFormItem.resetValidators([(value) => {
    const deliveryTypeValue = deliveryTypeFormItem.value
    const toDoorValue = toDoorFormItem.value
    const customerTypeValue = customerTypeFormItem.value
    if (deliveryTypeValue === 2 && toDoorValue && customerTypeValue === 2) {
      return name3PartsValidator(value)
    }
    if (customerTypeValue === 2) {
      return name2or3PartsValidator(value)
    }
    return required(value)
  }])

  paymentTypeFormItem.valueChanges((val) => {
    CODPayerFormItem.setMeta({ hide: val !== 1 })
  })

  deliveryTypeFormItem.valueChanges((val) => {
    cityFormItem.setMeta({ hide: val !== 2 })
    warehouseFormItem.setMeta({ hide: val !== 2 || toDoorFormItem.value })
    toDoorFormItem.setMeta({ hide: val !== 2 })
    deliveryAddress.setMeta({ hide: val !== 2 || !toDoorFormItem.value })
  })

  toDoorFormItem.valueChanges((val) => {
    deliveryAddress.setMeta({ hide: !val })
    nameFormItem.validate()
  })

  cityFormItem.valueChanges(async (val) => {
    warehouseFormItem.setValue('')
    if (val && val.city_ref) {
      const warehouseList = await warehouseAutocomplete(val.city_ref)
      warehouseFormItem.setMeta({
        itemsList: warehouseList.map(
          ({ warehous_ref, name }) => ({ value: warehous_ref, label: name }),
        ),
      })
    } else {
      warehouseFormItem.setMeta({
        itemsList: [],
      })
    }
  })

  form.get('customerType').valueChanges((val) => {
    const edrpou = form.get('EDRPOU')
    if (val === 2) {
      edrpou.setMeta({ hide: true })
    } else {
      edrpou.setMeta({ hide: false })
    }
  })

  return form
}
