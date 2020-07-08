// /* eslint-disable no-restricted-imports */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core'

import DataTable from 'mui-datatables'
import debounce from 'lodash/debounce'

import { textLabels } from 'config/tableConfig/textLabels'
import { productViewPath } from 'config/routes'
import { addProduct } from 'services/cart/cartService'

import ToOrderInput from 'components/parts/FormParts/ToOrderInput'

import BagesMap from './Bages'

// import SearchComponent from 'components/parts/DataTableParts/SearchComponent'


class Products extends PureComponent {
  state = {
    diplayed: {
      id: false,
      image: true,
      name: true,
      category_name: false,
      vendor_name: false,
      vendor_code: false,
      barcode: false,
      volume: false,
      weight: false,
      uktz: false,
      price: true,
      pr: true,
      status: true,
      toOrder: true,
    },
  }

  throttledChanges = debounce((value) => {
    const { getProductList } = this.props
    getProductList(value)
  }, 500)

  componentDidMount() {
    const { getProductList, location } = this.props
    const { search } = location
    const paramsEntries = search.slice(1).split('&').map(item => item.split('='))
    const paramsMap = Object.fromEntries(paramsEntries)
    const { category_id } = paramsMap
    getProductList({
      page: 1,
      limit: 10,
      searchText: null,
      category_id,
    })
  }

  onTableChange = (eventType, state) => {
    if (['changeRowsPerPage', 'changePage', 'search', 'filterChange'].indexOf(eventType) > -1) {
      if (['changeRowsPerPage', 'changePage'].indexOf(eventType) > -1) {
        const diplayed = Object.fromEntries(state.columns.map(col => [col.name, col.display]))
        this.setState({ diplayed })
      }
      const { config } = this.props
      const {
        filterList,
        page,
        rowsPerPage,
        searchText,
      } = state

      if (eventType === 'search' && searchText && searchText.length < 3) return

      const max_price = filterList[10][0]
      const vendor = filterList[4][0]
      const category_id = filterList[3]

      const dependenciesKeys = [
        'page',
        'limit',
        'count',
        'max_price',
        'searchText',
        'vendor',
        'category_id',
      ]
      const mapconfigToState = (key) => {
        switch (key) {
          case 'limit':
            return state.rowsPerPage
          case 'max_price':
            return max_price
          case 'vendor':
            return vendor
          case 'category_id':
            return category_id
          default:
            return state[key]
        }
      }

      const compareSelectedVendors = (confVendors = [], stateVendors = []) => {
        if (confVendors.length !== stateVendors.length) return false
        return !confVendors.find((vendor, i) => vendor !== stateVendors[i])
      }

      if (dependenciesKeys.find((key) => {
        if (key === 'selectedVendors') return !(compareSelectedVendors(config[key], mapconfigToState(key)))
        return config[key] !== mapconfigToState(key)
      })) {
        this.throttledChanges({
          page: page + 1,
          limit: rowsPerPage,
          search_text: searchText,
          max_price,
          vendor,
          category_id,
        })
      }
    }
  }

  navigateToProductPage = (row) => {
    const { history } = this.props
    history.push(productViewPath.replace(':id', row[0]))
  }

  getProductByRow = (rowIndex) => {
    const { products = [] } = this.props
    return products[rowIndex]
  }

  render() {
    const { onTableChange } = this
    const {
      products = [],
      // getSearchAutocomplete,
      config,
      vendors,
      categories = [],
    } = this.props

    const {
      page,
      limit,
      count,
      max_price,
      searchText,
      vendor,
      category_id,
    } = config

    const { diplayed } = this.state

    const serverSideFilterList = [[], [], [], [], [], [], [], [], [], [], []]
    const selectedCategory = categories.find(cat => cat.id === Number(category_id))
    serverSideFilterList[3] = selectedCategory ? [selectedCategory] : []
    serverSideFilterList[4] = vendor ? [vendor] : []
    serverSideFilterList[10] = max_price ? [max_price] : []

    const columns = [
      { name: 'id', label: 'id', options: { display: diplayed.id, filter: false } },
      {
        name: 'image',
        label: 'Изображение товара',
        options: {
          display: diplayed.image,
          filter: false,
          customBodyRender: value => <img alt='Картинка' height='50' src={value} />,
        },
      },
      { name: 'name', label: 'Название', options: { display: diplayed.name, filter: false } },
      {
        name: 'category_name',
        label: 'Категория',
        options: {
          display: diplayed.category_name,
          filterList: [Number(category_id)],
          customFilterListOptions: {
            render: v => v.name,
          },
          filterOptions: {
            display: (filterList, onChange, index, column) => (
              <FormControl>
                <InputLabel htmlFor='select-multiple-chip'>
                  Категория
                </InputLabel>
                <Select
                  defaultValue={filterList[3][0] || ''}
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
        label: 'Вендор',
        options: {
          display: diplayed.vendor_name,
          filterList: [vendor],
          filterOptions: {
            names: vendors,
          },
        },
      },
      { name: 'vendor_code', label: 'Артикул', options: { display: diplayed.vendor_code, filter: false } },
      { name: 'barcode', label: 'Баркод', options: { display: diplayed.barcode, filter: false } },
      { name: 'volume', label: 'Объем', options: { display: diplayed.volume, filter: false } },
      { name: 'weight', label: 'Вес', options: { display: diplayed.weight, filter: false } },
      { name: 'uktz', label: 'УКТЗ', options: { display: diplayed.uktz, filter: false } },
      {
        name: 'price',
        label: 'РЦЦ',
        options: {
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
      { name: 'pr', label: 'Цена', options: { display: diplayed.pr, filter: false } },
      {
        name: 'status',
        label: 'В наличии',
        options: {
          display: diplayed.status,
          customBodyRender: val => <BagesMap value={val} />,
          filter: false,
        },
      },
      {
        name: 'toOrder',
        label: 'В заказ',
        options: {
          display: diplayed.toOrder,
          customBodyRender: (_val, row) => (
            <ToOrderInput
              buttonColor='secondary'
              buttonContent='+'
              onAdd={count => addProduct({ count, product: this.getProductByRow(row.rowIndex) })}
            />
          ),
          filter: false,
        },
      },
    ]


    const options = {
      download: false,
      print: false,
      serverSide: true,
      count,
      page,
      selectableRowsHeader: false,
      selectableRows: 'none',
      rowsPerPage: limit,
      rowsPerPageOptions: [5, 10, 15],
      onTableChange,
      textLabels,
      serverSideFilterList,
      searchText,
      onRowClick: this.navigateToProductPage,
    }

    return (
      <Paper>
        <DataTable
          columns={columns}
          data={products}
          title='СПИСОК ТОВАРОВ'
          options={{
            ...options,
            // customSearchRender: (searchText, handleSearch, hideSearch, options) => (
            //   <SearchComponent
            //     searchText={searchText}
            //     handleSearch={handleSearch}
            //     inputChanged={getSearchAutocomplete}
            //     hideSearch={hideSearch}
            //     list={searchAutocomleteList}
            //     options={options}
            //   />
            // ),
          }}
        />
      </Paper>
    )
  }
}

Products.defaultProps = {
  products: [],
  // searchAutocomleteList: [],
  config: {},
  vendors: [],
  categories: [],
}

Products.propTypes = {
  getProductList: PropTypes.func.isRequired,
  // getSearchAutocomplete: PropTypes.func.isRequired,
  products: PropTypes.array,
  history: PropTypes.object.isRequired,
  config: PropTypes.object,
  vendors: PropTypes.array,
  categories: PropTypes.array,
  location: PropTypes.object.isRequired,
}

export default Products
