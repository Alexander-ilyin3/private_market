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
    deliveryType: { value: 2, meta: { label: 'Способ доставки', type: 'select', withLabel: true }, validators: [required] },
    city: {
      meta: { label: 'Город', withLabel: true, type: 'autocomplete' },
      hide: ({ deliveryType }) => deliveryType !== 2,
      validators: [required],
    },
    warehouse: {
      meta: {
        label: 'Склад',
        withLabel: true,
        type: 'autocomplete',
        itemsList: [],
      },
      validators: [required],
      hide: ({ deliveryType, toDoor }) => deliveryType !== 2 || toDoor,
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
    paymentType: { value: 1, meta: { label: 'Способ оплаты', type: 'select' }, validators: [required] },
    paymentAmount: {
      meta: {
        label: 'Сумма',
        errorMessages: {
          lessThenMin: 'Не может быть меньше 0',
          onlyInteger: 'Только целые числа',
        },
      },
      validators: [required, minValue(0), onlyInteger],
    },
    deliveryPayer: { value: 2, meta: { label: 'Плательщик доставки', type: 'select' }, validators: [required] },
    CODPayer: {
      value: 2,
      meta: { label: 'Платит за наложку', type: 'select' },
      hide: ({ paymentType }) => paymentType !== 1,
      validators: [required],
    },
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
    insurancePayment: { value: 2, meta: { label: 'Форма оплаты', type: 'select' }, validators: [required] },
    EDRPOU: { meta: { label: 'ЕДРПОУ' }, validators: [required], hide: ({ customerType }) => customerType === 2 },
    toDoor: {
      meta: { label: 'Адресная Доставка', type: 'checkbox' },
      hide: ({ deliveryType }) => deliveryType !== 2,
    },
    deliveryStreet: {
      meta: {
        label: 'Улица',
        withLabel: true,
        type: 'autocomplete',
      },
      validators: [required],
      hide: ({ deliveryType, toDoor }) => deliveryType !== 2 || !toDoor,
    },
    deliveryHouseNumber: {
      meta: {
        label: 'Номер дома',
      },
      validators: [required],
      hide: ({ deliveryType, toDoor }) => deliveryType !== 2 || !toDoor,
    },
    deliveryApartamentNumber: {
      meta: {
        label: 'Номер квартиры',
      },
      hide: ({ deliveryType, toDoor }) => deliveryType !== 2 || !toDoor,
    },
    comment: { },
  })

  const cityFormItem = form.get('city')
  const warehouseFormItem = form.get('warehouse')
  const toDoorFormItem = form.get('toDoor')
  const deliveryStreet = form.get('deliveryStreet')
  const nameFormItem = form.get('name')
  const deliveryTypeFormItem = form.get('deliveryType')
  const customerTypeFormItem = form.get('customerType')
  const deliveryHouseNumberFormItem = form.get('deliveryHouseNumber')
  const deliveryApartamentNumberFormItem = form.get('deliveryApartamentNumber')

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

  customerTypeFormItem.valueChanges(() => {
    nameFormItem.validate()
  })
  toDoorFormItem.valueChanges(() => {
    nameFormItem.validate()
  })

  cityFormItem.valueChanges(async (val) => {
    warehouseFormItem.setValue('')
    deliveryStreet.setValue('')
    deliveryHouseNumberFormItem.setValue('')
    deliveryApartamentNumberFormItem.setValue('')
    if (val && val.city_ref) {
      const warehouseList = await warehouseAutocomplete(val.city_ref)
      warehouseFormItem.setMeta({
        itemsList: warehouseList.map(
          ({ warehous_ref, name }) => ({ value: warehous_ref, label: name }),
        ),
      })
      deliveryStreet.setMeta({ city_ref: val.city_ref })
    } else {
      warehouseFormItem.setMeta({
        itemsList: [],
      })
      deliveryStreet.setMeta({ city_ref: '' })
    }
  })

  form.recalculate()
  return form
}
