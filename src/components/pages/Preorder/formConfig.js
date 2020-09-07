import { warehouseAutocomplete } from 'services/api/order.service'
import { ControlGroup, validators } from 'components/parts/ReactiveForm'

const {
  required,
  phoneValidator,
  minValue,
  onlyInteger,
} = validators


const patternValidatorCreator = pattern => function patternValidator(value) {
  if (value.match(pattern)) {
    return null
  }
  return { notName: true }
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
          notName: 'Введите имя фамилию и отчество разделяя их пробелами',
        },
      },
      validators: [required, patternValidatorCreator(/^\s*\S+\s+\S+\s+\S+\s*$/)],
    },
    phone: {
      value: '0',
      meta: {
        label: 'Телефон',
        withLabel: true,
        errorMessages: { phoneInvalid: 'Недеййствительный' },
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
  })

  const cityFormItem = form.get('city')
  const warehouseFormItem = form.get('warehouse')
  const paymentTypeFormItem = form.get('paymentType')
  const CODPayerFormItem = form.get('CODPayer')

  paymentTypeFormItem.valueChanges((val) => {
    CODPayerFormItem.setMeta({ hide: val !== 1 })
  })

  form.get('deliveryType').valueChanges((val) => {
    cityFormItem.setMeta({ hide: val !== 2 })
    warehouseFormItem.setMeta({ hide: val !== 2 })
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
    const customerName = form.get('name')
    if (val === 2) {
      customerName.addValidator(patternValidatorCreator(/^\s*\S+\s+\S+\s+\S+\s*$/))
    } else {
      customerName.removeValidators()
      customerName.addValidator(required)
    }
  })

  return form
}
