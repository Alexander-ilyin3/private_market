import React from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'
import DataTable from 'mui-datatables'

import { calculateCartTotal } from 'services/cart/cartHelpers'

const Preorder = (props) => {
  const { cart } = props
  const cartData = cart.map(item => ({
    ...item.product,
    count: item.count,
    total: (Number(item.product.price.replace(',', '')) * item.count).toLocaleString(),
  }))

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

  const columns = [
    { name: 'name', label: 'Название' },
    {
      name: 'image',
      label: 'Изображение',
      options: {
        customBodyRender: value => <img alt='Картинка' height='50' src={value} />,
      },
    },
    { name: 'count', label: 'Количество' },
    { name: 'price', label: 'Цена' },
    { name: 'total', label: 'Всего' },
  ]

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={7}>
        <DataTable
          columns={columns}
          data={cartData}
          title='Список товаров в заказе'
          options={{ ...options }}
        />
      </Grid>
      <Grid item xs={12} lg={5}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper style={{ padding: 16 }}>
              <Typography variant='h5'>
                Оплата и доставка
              </Typography>
              <Grid container spacing={0}>
                <Grid item xs={4}>
                  Итоговая цена
                </Grid>
                <Grid item xs={8}>
                  {calculateCartTotal(cart)}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper style={{ padding: 16 }}>
              <Typography variant='h5'>
                Получатель
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Preorder
