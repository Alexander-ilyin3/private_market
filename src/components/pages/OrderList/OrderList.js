import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import DataTable from 'mui-datatables'
import PropTypes from 'prop-types'
import SearchInput from 'components/parts/SearchInput'


import { textLabels } from 'config/tableConfig/textLabels'

import { orderDetailsPath } from 'config/routes'
import { checkAccessByLevel, roleAccessLevel, onlyAdminOrGreater } from 'config/roles'


const OrderList = ({ orderListInfo, getOrderList }) => {
  const customerNameColumnViewed = checkAccessByLevel(roleAccessLevel.admin)
  const { config, orders } = orderListInfo
  const { count } = config

  const [localConfig, setConfig] = useState({
    page: 0,
    limit: 10,
    search_query: '',
  })

  const { page, limit, search_query } = localConfig

  const [displayed, setDisplayed] = useState({
    id_1c: true,
    customer_name: customerNameColumnViewed,
    created_at: false,
    updated_at: false,
    deliveryType: true,
    paymentType: true,
    customerType: false,
    name: true,
    phone: true,
    total_price: true,
    city: true,
    warehouse: true,
    CODPayer: false,
    pyment_amount: true,
    insuranceAmount: false,
    paymentForm: false,
    deliveryPayer: false,
    weight: false,
    volume: false,
    status: true,
    ttn: true,
  })

  useEffect(() => {
    const query = { limit, page: page + 1 }
    if (onlyAdminOrGreater()) query.search_query = search_query
    getOrderList(query)
  }, [page, limit, search_query, getOrderList])

  const history = useHistory()

  const onTableChange = (eventType, state) => {
    const { page, rowsPerPage } = state
    if (['changeRowsPerPage', 'changePage'].indexOf(eventType) > -1) {
      const diplayed = Object.fromEntries(state.columns.map(col => [col.name, col.display]))
      setDisplayed(diplayed)
      setConfig({ page, limit: rowsPerPage, search_query })
    }
  }

  const onSearch = (search_query) => {
    setConfig({ ...localConfig, search_query, page: 0 })
  }

  const columns = [
    { name: 'id_1c', label: 'Номер заказа', options: { sort: false, display: displayed.id_1c } },
    { name: 'id', label: 'ID', options: { sort: false, display: false, viewColumns: false } },
    { name: 'customer_name', label: 'Kлиент', options: { sort: false, display: displayed.customer_name, viewColumns: customerNameColumnViewed } },
    { name: 'created_at', label: 'Создан', options: { sort: false, display: displayed.created_at } },
    { name: 'updated_at', label: 'Обновлен', options: { sort: false, display: displayed.updated_at } },
    {
      name: 'status',
      label: 'Статус',
      options: {
        customBodyRender: status => (status ? status.comment : 'Не установлен'),
        sort: false,
        display: displayed.status,
      },
    },
    { name: 'ttn', label: 'ТТН', options: { sort: false, display: displayed.ttn } },
    { name: 'deliveryType', label: 'Способ отправки', options: { sort: false, display: displayed.deliveryType } },
    { name: 'paymentType', label: 'Способ оплаты', options: { sort: false, display: displayed.paymentType } },
    { name: 'customerType', label: 'Тип пользователя', options: { sort: false, display: displayed.customerType } },
    { name: 'name', label: 'Имя получателя', options: { sort: false, display: displayed.name } },
    { name: 'phone', label: 'Телефон получателя', options: { sort: false, display: displayed.phone } },
    { name: 'total_price', label: 'Итоговая цена', options: { sort: false, display: displayed.total_price } },
    { name: 'city', label: 'Город', options: { sort: false, display: displayed.city } },
    { name: 'warehouse', label: 'Отделение', options: { sort: false, display: displayed.warehouse } },
    { name: 'CODPayer', label: 'Платит за наложку', options: { sort: false, display: displayed.CODPayer } },
    { name: 'pyment_amount', label: 'Сумма платежа', options: { sort: false, display: displayed.pyment_amount } },
    { name: 'insuranceAmount', label: 'Страховка', options: { sort: false, display: displayed.insuranceAmount } },
    { name: 'paymentForm', label: 'Форма оплаты', options: { sort: false, display: displayed.paymentForm } },
    { name: 'deliveryPayer', label: 'Плательщик доставки', options: { sort: false, display: displayed.deliveryPayer } },


    { name: 'volume', label: 'Объем', options: { sort: false, display: displayed.volume } },
    { name: 'weight', label: 'Вес', options: { sort: false, display: displayed.weight } },
  ]

  const findProductByRowMeta = row => orders
    .find(order => order.id === row[columns.findIndex(({ name }) => name === 'id')])


  const options = {
    download: false,
    print: false,
    serverSide: true,
    count,
    page,
    filter: false,
    selectableRowsHeader: false,
    selectableRows: 'none',
    rowsPerPage: limit,
    rowsPerPageOptions: [10, 50, 100],
    onTableChange,
    textLabels,
    search: false,
    onRowClick: (row) => {
      history.push(orderDetailsPath.replace(':id', findProductByRowMeta(row).id))
    },
    // serverSideFilterList,
    // searchText,
    // onRowClick: this.navigateToProductPage,
  }

  return (
    <Paper>
      <DataTable
        data={orders}
        options={options}
        columns={columns}
        title={onlyAdminOrGreater() && <SearchInput tooltipsOpened={false} onSearch={onSearch} position='start' />}
      />
    </Paper>
  )
}


OrderList.defaultProps = {
  orderListInfo: {
    orders: [],
    config: {},
  },
}

OrderList.propTypes = {
  orderListInfo: PropTypes.shape({
    config: PropTypes.shape({
      count: PropTypes.number,
    }),
    orders: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      customer_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      created_at: PropTypes.string,
      updated_at: PropTypes.string,
      deliveryType: PropTypes.string,
      paymentType: PropTypes.string,
      customerType: PropTypes.string,
      name: PropTypes.string,
      phone: PropTypes.string,
      total_price: PropTypes.string,
      city: PropTypes.string,
      warehouse: PropTypes.string,
      CODPayer: PropTypes.string,
      pyment_amount: PropTypes.string,
      insuranceAmount: PropTypes.string,
      insurancePayment: PropTypes.string,
      deliveryPayer: PropTypes.string,
    })),
  }),
  getOrderList: PropTypes.func.isRequired,
}

export default OrderList
