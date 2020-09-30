import React from 'react'

import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core'
import ToolTip from '@material-ui/core/Tooltip'

import { addProduct } from 'services/cart/cartService'
import { productViewPath } from 'config/routes'

import ToOrderInput from 'components/parts/FormParts/ToOrderInput'
import TooltipInfo from 'components/parts/TooltipInfo'

import BagesMap from './Bages'


const renderColumns = ({
  incoming,
  diplayed,
  throttledChanges,
  tooltipsOpened,
}) => {
  const {
    products = [],
    config,
    vendors,
    categories = [],
    classes,
  } = incoming

  const {
    max_price,
    vendor,
    category_id,
  } = config

  const navigateToProductPage = ({ rowData }) => {
    const { history } = incoming
    history.push(productViewPath.replace(':id', rowData[0]))
  }

  const getProductByRow = rowIndex => products[rowIndex]

  return [
    { name: 'id', label: 'id', options: { viewColumns: false, display: diplayed.id, filter: false } },
    {
      name: 'image',
      // label: 'Изображение',
      options: {
        viewColumns: false,
        // customHeadRender: props => <TableHeadCell {...props} options={{}}> </TableHeadCell>,
        display: diplayed.image,
        filter: false,
        // customBodyRender: (value, row) => (
        //   <img
        //     onClick={() => navigateToProductPage(row)}
        //     className={classes.hover}
        //     alt='Картинка'
        //     height='50'
        //     src={value}
        //   />
        // ),
      },
    },
    {
      name: 'vendor_code',
      label: 'Артикул',
      options: {
        display: diplayed.vendor_code,
        filter: false,
        sort: false,
      },
    },
    {
      name: 'name',
      label: 'Название',
      options: {
        fixedHeader: false,
        viewColumns: false,
        // customHeadRender: (props, p2, p3) => { console.log({ props, p2, p3 });
        // return <div>Name</div>
        // /*<TableHeadCell {...props} options={{ filter: true }}> sort </TableHeadCell>*/},
        display: diplayed.name,
        filter: false,
        customBodyRender: (value, row) => (
          <div
            onClick={() => navigateToProductPage(row)}
            className={`${classes.hover} ${classes.withImageBreak}`}
            // style={{ display: 'inline-block' }}
          >
            <img
              style={{ marginRight: 5 }}
              alt='Картинка'
              height='50'
              src={getProductByRow(row.rowIndex).image}
            />
            {value}
          </div>
        ),
      },
    },
    {
      name: 'category_name',
      label: 'Категория',
      options: {
        customHeadLabelRender: () => <TooltipInfo open={tooltipsOpened} title='Фильтруйте каталог по бренду или группе товаров'><div>Категория</div></TooltipInfo>,
        sort: false,
        display: diplayed.category_name,
        filterList: [Number(category_id)],
        customFilterListOptions: {
          render: v => v.name,
        },
        customBodyRender: (value, row) => (
          <ToolTip title={`фильтровать по категории ${value}`}>
            <div
              className={classes.hover}
              onClick={() => throttledChanges({
                category_id: getProductByRow(row.rowIndex).category_id,
              })}
            >
              {value}
            </div>
          </ToolTip>
        ),
        filterOptions: {
          display: (filterList, onChange, index, column) => (
            <FormControl>
              <InputLabel htmlFor='select-multiple-chip'>
                Категория
              </InputLabel>
              <Select
                defaultValue={filterList[4][0] || ''}
                onChange={(event) => {
                  onChange(event.target.value, index, column)
                }}
              >
                {categories.map(item => (
                  <MenuItem key={item.category_id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ),
        },
        filterType: 'custom',
      },
    },
    {
      name: 'vendor_name',
      label: 'Бренд',
      options: {
        sort: false,
        customBodyRender: (value, row) => (
          <ToolTip title={`фильтровать по бренду ${value}`}>
            <div
              className={classes.hover}
              onClick={() => throttledChanges({
                vendor: getProductByRow(row.rowIndex).vendor_name,
              })}
            >
              {value}
            </div>
          </ToolTip>
        ),
        display: diplayed.vendor_name,
        filterList: [vendor],
        filterOptions: {
          names: vendors,
        },
      },
    },
    { name: 'barcode', label: 'Штрихкод', options: { sort: false, display: diplayed.barcode, filter: false } },
    { name: 'volume', label: 'Объем', options: { sort: false, display: diplayed.volume, filter: false } },
    { name: 'weight', label: 'Вес', options: { sort: false, display: diplayed.weight, filter: false } },
    { name: 'uktz', label: 'УКТЗ', options: { sort: false, display: diplayed.uktz, filter: false } },
    {
      name: 'price',
      label: 'РЦЦ',
      options: {
        sort: true,
        viewColumns: false,
        display: diplayed.price,
        filterList: [max_price],
        filterType: 'custom',
        filterOptions: {
          logic: () => false,
          display: (list, onChange, index, column) => (
            <TextField defaultValue={list[11][0]} label='РЦЦ (до)' onInput={e => onChange([e.target.value], index, column)} />
          ),
        },
      },
    },
    {
      name: 'individual_price',
      label: 'Цена',
      options: {
        sort: true,
        viewColumns: false,
        display: diplayed.individual_price,
        filter: false,
      },
    },
    {
      name: 'status',
      label: 'Наличие',
      options: {
        sort: true,
        viewColumns: false,
        // customHeadRender: props => (
        //   <TableHeadCell {...props} options={{ ...props }}>
        // <div style={{ minWidth: 60 }} /></TableHeadCell>
        // ),
        display: diplayed.status,
        customBodyRender: val => <BagesMap value={val} />,
        filter: false,
      },
    },
    {
      name: 'toOrder',
      label: 'В заказ',
      options: {
        customHeadLabelRender: () => <TooltipInfo open={tooltipsOpened} title='Добавляйте товары в заказ'><div>В заказ</div></TooltipInfo>,
        sort: false,
        viewColumns: false,
        display: diplayed.toOrder,
        customBodyRender: (_val, row) => (
          <ToOrderInput
            buttonColor='secondary'
            buttonContent='+'
            onAdd={count => addProduct({ count, product: getProductByRow(row.rowIndex) })}
          />
        ),
        filter: false,
      },
    },
  ]
}


export default renderColumns
