import React, { memo } from 'react'
import PropTypes from 'prop-types'

import DataTable from 'mui-datatables'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'


import Clear from '@material-ui/icons/Clear'
import DeleteForever from '@material-ui/icons/DeleteForever'

import { setCount, clearCart, removeFromCart } from 'services/cart/cartService'
import { calculateCartTotal } from 'services/cart/cartHelpers'

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
  cart,
  classes,
}) => {
  const cartData = cart.map(item => ({
    ...item.product,
    count: item.count,
    total: (
      typeof item.product.individual_price === 'string'
        ? Number(item.product.individual_price.replace(',', ''))
        : item.product.individual_price
        * item.count
    ).toLocaleString(),
  }))
  const getProductByRowMeta = (meta) => {
    const { rowData } = meta
    const id = rowData[0]
    return cart.find(item => item.product.id === id).product
  }

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
      options: {
        customBodyRender: (value, meta) => (
          <TextField
            defaultValue={value}
            type='number'
            variant='outlined'
            inputProps={{
              min: 1,
              step: 1,
            }}
            onChange={(e) => {
              const { value } = e.target
              const product = getProductByRowMeta(meta)
              setCount({ count: +value, product })
            }}
          />
        ),
      },
    },
    { name: 'individual_price', label: 'Цена' },
    { name: 'total', label: 'Сумма' },
    {
      name: 'delete',
      label: ' ',
      options: {
        customBodyRender: (_row, meta) => {
          const product = getProductByRowMeta(meta)
          return (
            <IconButton onClick={() => { removeFromCart(product.id) }}>
              <DeleteForever />
            </IconButton>
          )
        },

      },
    },
  ]
  return (
    <Paper>
      <MuiThemeProvider theme={themePaperWithoutShadow}>
        <DataTable
          columns={columns}
          data={cartData}
          title='Список товаров в заказе'
          options={{ ...options }}
        />
      </MuiThemeProvider>
      <Typography
        variant='subtitle1'
        align='right'
        paragraph
        style={{ marginRight: 18 }}
      >
        <IconButton onClick={clearCart}>
          <Clear />
        </IconButton>
      Удалить все товары из заказа
      </Typography>
      <Grid container style={{ padding: '6px 18px' }}>
        <Grid item xs={12}>
          <Typography variant='h5' align='right'>
            <span className={classes.Attributes}>
              Сумма:
              <span className={classes.value}>
                {calculateCartTotal(cart).toLocaleString()}
              </span>
            </span>
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
})

Table.defaultProps = {
  cart: [],
  classes: {},
}

Table.propTypes = {
  cart: PropTypes.array,
  classes: PropTypes.object,
}

export default Table
