import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper'
import DataTable from 'mui-datatables'
import Button from '@material-ui/core/Button'
import debounce from 'lodash/debounce'
import PropTypes from 'prop-types'

import { textLabels } from 'config/tableConfig/textLabels'

import TokenDialog from './tokenDialog'

const throttledChanges = debounce((value, getUserList) => {
  getUserList(value)
}, 500)

const UserList = ({
  userData = {},
  getUserList,
  setStatus,
  openTokenDialog,
}) => {
  // console.log(userData)
  const { customers = [], config = {} } = userData
  const [localConfig, setconfig] = useState({
    page: 0,
    limit: 10,
    searchText: '',
  })
  const {
    count,
  } = config

  const {
    page,
    limit,
    searchText,
  } = localConfig

  const [displayed, setDisplayed] = useState({
    city: true,
    customer_email: true,
    customer_lastname: true,
    customer_name: true,
    customer_phone: true,
    customer_position: true,
    customer_website: true,
    house_number: true,
    id_customer: false,
    id_manager_supplier: true,
    office_number: true,
    roles: true,
    status: true,
    street: true,
    actions: true,
  })

  const request = () => {
    throttledChanges({
      page: page + 1,
      limit,
      search_text: searchText,
    }, getUserList)
  }

  const handleTokenUpdated = () => {
    request()
  }

  useEffect(() => {
    request()
  }, [limit, page, searchText, getUserList])


  const onTableChange = (eventType, state) => {
    if (['changeRowsPerPage', 'changePage', 'search'].indexOf(eventType) > -1) {
      const {
        page,
        columns,
        searchText: newSearchText,
        rowsPerPage,
      } = state

      if (
        eventType === 'search'
        && searchText
        && newSearchText
        && newSearchText.length < 3
        && searchText.length < 3
      ) return
      const diplayed = Object.fromEntries(columns.map(col => [col.name, col.display]))
      setDisplayed(diplayed)
      setconfig({ page, limit: rowsPerPage, searchText: newSearchText })
    }
  }


  const columns = [
    { name: 'id_customer', label: 'id', options: { display: displayed.id_customer, sort: false } },
    { name: 'customer_email', label: 'Email', options: { display: displayed.customer_email, sort: false } },
    { name: 'customer_name', label: 'Имя', options: { display: displayed.customer_name, sort: false } },
    { name: 'customer_lastname', label: 'Фамилия', options: { display: displayed.customer_lastname, sort: false } },
    { name: 'customer_phone', label: 'Телефон', options: { display: displayed.customer_phone, sort: false } },
    { name: 'customer_position', label: 'Должность', options: { display: displayed.customer_position, sort: false } },
    { name: 'customer_website', label: 'Сайт', options: { display: displayed.customer_website, sort: false } },
    { name: 'street', label: 'Улица', options: { display: displayed.street, sort: false } },
    { name: 'house_number', label: '№ дома', options: { display: displayed.house_number, sort: false } },
    { name: 'office_number', label: '№ офиса', options: { display: displayed.office_number, sort: false } },
    {
      name: 'roles',
      label: 'Роли',
      options: {
        display: displayed.roles,
        sort: false,
        customBodyRender: value => value.map(role => role.display_name).join(', '),
      },
    },
    {
      name: 'status',
      label: 'Статус',
      options: {
        display: displayed.status,
        sort: false,
        customBodyRender: value => (value ? 'Активен' : 'Неактивен'),
      },
    },
    { name: 'id_manager_supplier', label: 'ID менеджера', options: { display: displayed.id_manager_supplier, sort: false } },
    {
      name: 'actions',
      label: 'Действия',
      options: {
        display: displayed.actions,
        sort: false,
      },
    },
  ]

  const statusIndex = columns.findIndex(column => column.name === 'status')
  const idIndex = columns.findIndex(column => column.name === 'id_customer')
  const actionsIndex = columns.findIndex(column => column.name === 'actions')
  const getUserById = id => customers.find(customer => customer.id_customer === id) || {}
  if (columns[actionsIndex]) {
    columns[actionsIndex].options = {
      ...columns[actionsIndex].options,
      customBodyRender: (_v, meta) => {
        const { rowData } = meta
        return (
          <div>
            <Button
              color='secondary'
              variant='contained'
              size='small'
              fullWidth
              style={{ marginBottom: 4 }}
              disabled={!!rowData[statusIndex]}
              onClick={() => setStatus({ id: rowData[idIndex], status: 1 })}
            >
              Активировать
            </Button>
            <Button
              color='primary'
              variant='contained'
              fullWidth
              size='small'
              style={{ marginBottom: 4 }}
              disabled={!rowData[statusIndex]}
              onClick={() => openTokenDialog({
                token: getUserById(rowData[idIndex]).token_1c,
                code: getUserById(rowData[idIndex]).code_1c,
                userId: rowData[idIndex],
              })}
            >
              Токен
            </Button>
            <Button
              className='warning'
              variant='contained'
              fullWidth
              size='small'
              disabled={!rowData[statusIndex]}
              onClick={() => setStatus({ id: rowData[idIndex], status: 0 })}
            >
              Заблокировать
            </Button>
          </div>
        )
      },
    }
  }

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
    // serverSideFilterList,
    searchText,
    // onRowClick: this.navigateToProductPage,
  }

  return (
    <Paper>
      <TokenDialog onSuccess={handleTokenUpdated} />
      <DataTable
        data={customers}
        options={options}
        columns={columns}
      />
    </Paper>
  )
}

UserList.defaultProps = {
  userData: {},
}

UserList.propTypes = {
  userData: PropTypes.object,
  getUserList: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  openTokenDialog: PropTypes.func.isRequired,
}

export default UserList
