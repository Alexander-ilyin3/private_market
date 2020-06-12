import React, { useEffect, useState } from 'react'
import Paper from '@material-ui/core/Paper'
import DataTable from 'mui-datatables'


import { textLabels } from 'config/tableConfig/textLabels'


const OrderList = ({ orderListInfo, getOrderList }) => {
  const { config, orders } = orderListInfo
  const { count } = config

  const [localConfig, setConfig] = useState({
    page: 0,
    limit: 10,
  })

  const { page, limit } = localConfig

  const [displayed, setDisplayed] = useState({
    created_at: true,
    customer_id: false,
    date_delivery: true,
    delivery: true,
    id: false,
    payment_delivery: true,
    recipient_adress: true,
    recipient_email: true,
    recipient_name: true,
    recipient_phone: true,
    total_price: true,
    ttn: true,
    updated_at: true,
    volume: true,
    weight: true,
  })

  useEffect(() => {
    getOrderList({ limit, page: page + 1 })
  }, [page, limit, getOrderList])

  const onTableChange = (eventType, state) => {
    const { page, rowsPerPage } = state
    if (['changeRowsPerPage', 'changePage'].indexOf(eventType) > -1) {
      const diplayed = Object.fromEntries(state.columns.map(col => [col.name, col.display]))
      setDisplayed(diplayed)
      setConfig({ page, limit: rowsPerPage })
    }
  }

  console.log(localConfig)

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
    rowsPerPageOptions: [5, 10, 15],
    onTableChange,
    textLabels,
    search: false,
    // serverSideFilterList,
    // searchText,
    // onRowClick: this.navigateToProductPage,
  }

  const columns = [
    { name: 'id', label: 'ID', options: { sort: false, display: displayed.id } },
    { name: 'customer_id', label: 'ID клиента', options: { sort: false, display: displayed.customer_id } },
    { name: 'created_at', label: 'Создан', options: { sort: false, display: displayed.created_at } },
    { name: 'date_delivery', label: 'Дата отправки', options: { sort: false, display: displayed.date_delivery } },
    { name: 'delivery', label: 'Способ отправки', options: { sort: false, display: displayed.delivery } },
    { name: 'payment_delivery', label: 'Способ оплаты', options: { sort: false, display: displayed.payment_delivery } },
    { name: 'recipient_adress', label: 'Адрес получателя', options: { sort: false, display: displayed.recipient_adress } },
    { name: 'recipient_email', label: 'Email получателя', options: { sort: false, display: displayed.recipient_email } },
    { name: 'recipient_name', label: 'Имя получателя', options: { sort: false, display: displayed.recipient_name } },
    { name: 'recipient_phone', label: 'Телефон получателя', options: { sort: false, display: displayed.recipient_phone } },
    { name: 'total_price', label: 'Итоговая цена', options: { sort: false, display: displayed.total_price } },
    { name: 'ttn', label: 'ТТН', options: { sort: false, display: displayed.ttn } },
    { name: 'updated_at', label: 'Обновлен', options: { sort: false, display: displayed.updated_at } },
    { name: 'volume', label: 'Объем', options: { sort: false, display: displayed.volume } },
    { name: 'weight', label: 'Вес', options: { sort: false, display: displayed.weight } },
  ]

  return (
    <Paper>
      <DataTable
        data={orders}
        options={options}
        columns={columns}
      />
    </Paper>
  )
}

export default OrderList
