import React, { memo } from 'react'
import PropTypes from 'prop-types'

import DataTable from 'mui-datatables'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const options = {
  download: false,
  print: false,
  search: false,
  filter: false,
  viewColumns: false,
  selectableRowsHeader: false,
  selectableRows: 'none',
  pagination: false,
}

const themePaperWithoutShadow = theme => createMuiTheme({
  overrides: {
    ...theme.overrides,
    MuiPaper: {
      root: {
        boxShadow: 'unset',
      },
      elevation4: {
        boxShadow: 'unset',
      },
    },
  },
})


const Table = memo(({
  products,
  // classes,
}) => {
  const columns = [
    { name: 'id', label: '', options: { display: false } },
    {
      name: 'image',
      label: ' ',
      options: {
        customBodyRender: value => <img alt='Картинка' height='50' src={value} />,
      },
    },
    { name: 'name', label: ' ' },
    {
      name: 'count',
      label: 'Количество',
    },
    { name: 'price', label: 'Цена', options: { customBodyRender: value => Number(value).toFixed(2) } },
    { name: 'total', label: 'Сумма' },
  ]
  const productsWithTotal = products.map(
    product => ({ ...product, total: (product.price * product.count).toFixed(2) }),
  )
  return (
    <Paper>
      <MuiThemeProvider theme={themePaperWithoutShadow}>
        <DataTable
          columns={columns}
          data={productsWithTotal}
          title='Список товаров в заказе'
          options={options}
        />
      </MuiThemeProvider>
    </Paper>
  )
})

Table.defaultProps = {
  products: [],
}

Table.propTypes = {
  products: PropTypes.array,
}

export default Table
