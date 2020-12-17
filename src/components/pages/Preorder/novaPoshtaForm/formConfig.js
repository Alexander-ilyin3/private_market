import { warehouseAutocomplete } from 'services/api/order.service'
import { calculateCartTotal } from 'services/cart/cartHelpers'
import { store } from 'storage'
import { getCart } from 'storage/selectors/cart.selector'
import { ControlGroup, validators } from 'components/parts/ReactiveForm'
import { showSnack } from 'storage/actions/snack.actions'


const {
  required,
  phoneValidator,
  minValue,
  onlyInteger,
  fixedLength,
} = validators

const notLessThenCartTotalValidator = value => (
  minValue(calculateCartTotal(getCart(store.getState())))(value)
    ? { lessThenCartTotal: true }
    : null
)

const patternValidatorCreator = (pattern, messageName) => function patternValidator(value) {
  if (value.match(pattern)) {
    return null
  }
  return { [messageName]: true }
}

const COD = 1
const RECEIVER = 1
const SENDER = 2
const CASH = 1
const CASHLESS = 2

export const createForm = () => {
  const form = new ControlGroup({
    city: {
      meta: { label: 'Город', withLabel: true, type: 'autocomplete' },
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
      hide: ({ toDoor }) => toDoor,
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
          lessThenCartTotal: 'Сумма наложенного платежа не может быть меньше суммы заказа',
        },
      },
      validators: [required, notLessThenCartTotalValidator, onlyInteger],
      hide: ({ paymentType }) => paymentType !== 1,
    },
    deliveryPayer: { value: RECEIVER, meta: { label: 'Плательщик доставки', type: 'select' }, validators: [required] },
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
      validators: [required, minValue(300), onlyInteger],
    },
    insurancePayment: { value: CASH, meta: { label: 'Форма оплаты', type: 'select' }, validators: [required] },
    EDRPOU: {
      meta: {
        label: 'ЕДРПОУ',
        errorMessages: { onlyInteger: 'Только числа', invalidLength: 'Должно быть 12 знаков' },
      },
      validators: [required, onlyInteger, fixedLength(12)],
      hide: ({ customerType }) => customerType === 2,
    },
    toDoor: {
      meta: { label: 'Адресная Доставка', type: 'checkbox' },
    },
    deliveryStreet: {
      meta: {
        label: 'Улица',
        withLabel: true,
        type: 'autocomplete',
      },
      validators: [required],
      hide: ({ toDoor }) => !toDoor,
    },
    deliveryHouseNumber: {
      meta: {
        label: 'Номер дома',
      },
      validators: [required],
      hide: ({ toDoor }) => !toDoor,
    },
    deliveryApartamentNumber: {
      meta: {
        label: 'Номер квартиры',
      },
      validators: [required],
      hide: ({ toDoor }) => !toDoor,
    },
    comment: { },
  })

  const cityFormItem = form.get('city')
  const warehouseFormItem = form.get('warehouse')
  const toDoorFormItem = form.get('toDoor')
  const deliveryStreet = form.get('deliveryStreet')
  const nameFormItem = form.get('name')
  const customerTypeFormItem = form.get('customerType')
  const deliveryHouseNumberFormItem = form.get('deliveryHouseNumber')
  const deliveryApartamentNumberFormItem = form.get('deliveryApartamentNumber')
  const insurancePaymentFormItem = form.get('insurancePayment')
  const paymentTypeFormItem = form.get('paymentType')
  const deliveryPayerFormItem = form.get('deliveryPayer')

  const name3PartsValidator = patternValidatorCreator(/^\s*\S+\s+\S+\s+\S+\s*$/, 'not3Name')
  const name2or3PartsValidator = patternValidatorCreator(/^\s*\S+\s+\S+(\s+\S+)?\s*$/, 'not2Name')

  form.get('paymentAmount').validChanges((valid, { touched }) => {
    if (!valid && touched) {
      showSnack({
        message: 'Рекомендуем брать с клиента предоплату в размере вашей прибыли от заказа',
        variant: 'info',
      })
    }
  })


  insurancePaymentFormItem.valueChanges((val) => {
    if (
      paymentTypeFormItem.value === COD
      && deliveryPayerFormItem.value === SENDER
      && val !== CASHLESS
    ) {
      setTimeout(() => showSnack({
        message: 'Oтправитель оплачивает услуги новой почты только по безналичному расчету',
        variant: 'warning',
      }), 10)
      insurancePaymentFormItem.setValue(CASHLESS)
    }
  })
  paymentTypeFormItem.valueChanges((val) => {
    if (val === COD && deliveryPayerFormItem.value === SENDER) {
      insurancePaymentFormItem.setValue(CASHLESS)
    }
  })
  deliveryPayerFormItem.valueChanges((val) => {
    if (val === SENDER && paymentTypeFormItem.value === COD) {
      insurancePaymentFormItem.setValue(CASHLESS)
    }
  })

  nameFormItem.resetValidators([(value) => {
    const toDoorValue = toDoorFormItem.value
    const customerTypeValue = customerTypeFormItem.value
    if (toDoorValue && customerTypeValue === 2) {
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
