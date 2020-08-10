import { warehouseAutocomplete } from 'services/api/order.service'
import { ControlGroup, validators } from 'components/parts/ReactiveForm'

const { required, phoneValidator, minValue } = validators

export const form = new ControlGroup({
  // dateTime: { value: new Date(), meta: { label: 'Дата и время отправки:', type: 'picker', withLabel: true }, validators: [] },
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
      type: 'select',
      itemsList: [],
    },
    validators: [required],
  },
  // toDoor: {
  //   value: false,
  //   meta: {
  //     label: 'Адресная доставка',
  //     align: 'left',
  //     withLabel: true,
  //     hide: true,
  //     type: 'checkbox',
  //   },
  //   validators: [],
  // },
  deliveryAddress: { meta: { label: 'Адрес доставки', withLabel: true, hide: true }, validators: [] },

  customerType: { value: 2, meta: { label: 'Юр/Физ лицо', type: 'select' }, validators: [required] },
  name: { meta: { label: 'Название / ФИО' }, validators: [required] },
  phone: {
    value: '0',
    meta: {
      label: 'Телефон',
      withLabel: true,
      errorMessages: { phoneInvalid: 'Недеййствительный номер телефона' },
    },
    validators: [required, phoneValidator],
  },
  paymentType: { meta: { label: 'Способ оплаты', type: 'select' }, validators: [required] },
  pymentAmount: {
    value: 300,
    meta: {
      label: 'Сумма',
      errorMessages: {
        lessThenMin: 'Не может быть меньше чем 300',
      },
    },
    validators: [required, minValue(300)],
  },
  deliveryPayer: { meta: { label: 'Плательщик доставки', type: 'select' } },
  CODPayer: { meta: { label: 'Плательщик за наложку', type: 'select' } },
  insuranceAmount: { meta: { label: 'Сумма страховки' } },
  insurancePayment: { meta: { label: 'Способ оплаты страховки', type: 'select' } },
})

const cityFormItem = form.get('city')
const warehouseFormItem = form.get('warehouse')
// const toDoorFormItem = form.get('toDoor')
const deliveryAddressFormItem = form.get('deliveryAddress')

// toDoorFormItem.valueChanges((val) => {
//   deliveryAddressFormItem.setMeta({ hide: !val })
//   warehouseFormItem.setMeta({ hide: val })
// })

form.get('deliveryType').valueChanges((val) => {
  cityFormItem.setMeta({ hide: val !== 2 })
  warehouseFormItem.setMeta({ hide: val !== 2 })
  // toDoorFormItem.setMeta({ hide: val !== 2 })
  deliveryAddressFormItem.setMeta({ hide: val !== 2 })
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
