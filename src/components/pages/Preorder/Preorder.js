import React, { useState } from 'react'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Clear from '@material-ui/icons/Clear'
import DataTable from 'mui-datatables'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import DeleteForever from '@material-ui/icons/DeleteForever'

import { calculateCartTotal } from 'services/cart/cartHelpers'
import { overrides } from 'materialUi/mainTheme'
import { setCount, clearCart, removeFromCart } from 'services/cart/cartService'
import AppTimePicker from 'components/parts/FormParts/TimePicker'
import AppDatePicker from 'components/parts/FormParts/DatePicker'
import MaskedPhone from 'components/assets/MaskedPhone'


const themePaperWithoutShadow = () => createMuiTheme({
  overrides: {
    ...overrides,
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

const calculateFull = (cart, field) => cart.reduce(
  (prev, current) => prev + Number(current.count) * Number(current.product[field].replace(',', '')),
  0,
)


const Preorder = (props) => {
  const { cart, classes, user } = props
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

  const [selectedDate, setSelectedDate] = useState(
    new Date(Date.now()),
  )

  const renderColumnItems = items => items.map(item => (
    <Grid key={item.label} container spacing={0}>
      <Grid item xs={4} className={classes.paymentItem}>
        {item.label}
      </Grid>
      <Grid item xs={8}>
        {item.value}
      </Grid>
    </Grid>
  ))
  const getProductByRowMeta = (meta) => {
    const { rowData } = meta
    const id = rowData[0]
    return cart.find(item => item.product.id === id).product
  }

  const columns = [
    { name: 'id', label: '', options: { display: false } },
    { name: 'name', label: 'Название' },
    {
      name: 'image',
      label: 'Изображение',
      options: {
        customBodyRender: value => <img alt='Картинка' height='50' src={value} />,
      },
    },
    {
      name: 'count',
      label: 'Количество',
      options: {
        customBodyRender: (value, meta) => (
          <TextField
            defaultValue={value}
            type='number'
            variant='outlined'
            onChange={(e) => {
              const { value } = e.target
              const product = getProductByRowMeta(meta)
              setCount({ count: +value, product })
            }}
          />
        ),
      },
    },
    { name: 'price', label: 'Цена' },
    { name: 'total', label: 'Всего' },
    {
      name: 'delete',
      label: 'Удалить',
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

  const paymentAndDelivery = [
    { label: 'Итоговая цена:', value: <Typography style={{ color: '#ff4081' }} variant='h5'>{calculateCartTotal(cart).toLocaleString()}</Typography> },
    {
      label: 'Дата отправки:',
      value: <AppDatePicker value={selectedDate} onChange={setSelectedDate} />,
    },
    {
      label: 'Время отправки:',
      value: <AppTimePicker value={selectedDate} onChange={setSelectedDate} />,
    },
    {
      label: 'Доставка:',
      value: (
        <FormControl
          fullWidth
          variant='outlined'
        >
          <InputLabel>Доставка</InputLabel>
          <Select
            label='Доставка'
          >
            <MenuItem value={1}>Новая почта</MenuItem>
            <MenuItem value={2}>Интайм</MenuItem>
            <MenuItem value={3}>Самовывоз</MenuItem>
          </Select>
        </FormControl>
      ),
    },
    { label: 'ТТН:', value: <TextField variant='outlined' label='ТТН' margin='normal' fullWidth /> },
    {
      label: 'Оплата:',
      value: (
        <FormControl
          fullWidth
          variant='outlined'
        >
          <InputLabel>Доставка</InputLabel>
          <Select
            label='Доставка'
          >
            <MenuItem value={1}>Visa</MenuItem>
            <MenuItem value={2}>Mastercard</MenuItem>
            <MenuItem value={3}>Privat 24</MenuItem>
            <MenuItem value={4}>Наложенный платеж</MenuItem>
          </Select>
        </FormControl>
      ),
    },
  ]

  const recipient = [
    {
      label: 'Имя:',
      value: (
        <TextField
          fullWidth
          margin='normal'
          variant='outlined'
          defaultValue={`${user.customerName} ${user.customerLastname}`}
        />
      ),
    },
    {
      label: 'Адрес:',
      value: (
        <Typography paragraph>
          {
            [
              user.city,
              user.street,
              user.houseNumber,
              user.officeNumber,
            ].filter(item => !!item).join(', ')
          }
        </Typography>
      ),
    },
    {
      label: 'Email:',
      value: <Typography paragraph>{user.customerEmail}</Typography>,
    },
    {
      label: 'Телефон:',
      value: (
        <TextField
          fullWidth
          margin='normal'
          variant='outlined'
          InputProps={{
            inputComponent: MaskedPhone,
          }}
          defaultValue={user.customerPhone}
        />
      ),
    },
  ]

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={7}>
        <Paper>
          <MuiThemeProvider theme={themePaperWithoutShadow()}>
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
            <Grid item xs={12} sm={6}>
              <Typography variant='subtitle1'>
                <span className={classes.Attributes}>
                  <span className={classes.value}>Вес:</span> {calculateFull(cart, 'weight').toLocaleString()}
                </span>
              </Typography>
              <Typography variant='subtitle1'>
                <span className={classes.Attributes}>
                  <span className={classes.value}>Объем:</span> {calculateFull(cart, 'volume').toLocaleString()}
                </span>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='h5' align='right'>
                <span className={classes.Attributes}>
                  Сумма:
                  <span className={classes.value}>
                    {calculateCartTotal(cart).toLocaleString()}
                  </span>
                </span>
              </Typography>
              <Typography align='right'>
                <span className={classes.Attributes}>
                  <span>
                    Ваш баланс
                    <br />
                    с учетом заказа:
                  </span>
                  <span className={classes.value}>{0}</span>
                </span>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} lg={5}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper style={{ padding: 16 }}>
              <Typography variant='h5'>
                Оплата и доставка
              </Typography>
              {renderColumnItems(paymentAndDelivery)}
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper style={{ padding: 16 }}>
              <Typography variant='h5'>
                Получатель
              </Typography>
              {(user.customerEmail) && renderColumnItems(recipient)}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Preorder
