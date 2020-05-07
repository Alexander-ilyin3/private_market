// /* eslint-disable no-restricted-imports */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Paper,
  TextField,
} from '@material-ui/core'

import DataTable from 'mui-datatables'
import debounce from 'lodash/debounce'

import { textLabels } from 'config/tableConfig/textLabels'
import { productViewPath } from 'config/routes'

// import SearchComponent from 'components/parts/DataTableParts/SearchComponent'


class Products extends PureComponent {
  throttledChanges = debounce((value) => {
    const { getProductList } = this.props
    getProductList(value)
  }, 500)

  componentDidMount() {
    const { getProductList } = this.props
    getProductList({ page: 1, limit: 10, searchText: null })
  }

  onTableChange = (eventType, state) => {
    if (['changeRowsPerPage', 'changePage', 'search', 'filterChange', 'onFilterDialogClose'].indexOf(eventType) > -1) {
      const { config } = this.props
      const {
        filterList,
        page,
        rowsPerPage,
        searchText,
      } = state

      if (eventType === 'search' && searchText && searchText.length < 3) return

      const max_price = filterList[11][0]
      const vendor = filterList[5][0]

      const dependenciesKeys = [
        'page',
        'limit',
        'count',
        'max_price',
        'searchText',
        'vendor',
      ]

      const mapconfigToState = (key) => {
        switch (key) {
          case 'limit':
            return state.rowsPerPage
          case 'max_price':
            return max_price
          case 'vendor':
            return vendor
          case 'search_text':
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
        })
      }
    }
  }

  navigateToProductPage = (row) => {
    const { history } = this.props
    history.push(productViewPath.replace(':id', row[0]))
  }

  render() {
    const { onTableChange } = this
    const {
      products = [],
      // getSearchAutocomplete,
      config,
      vendors,
    } = this.props
    const {
      page,
      limit,
      count,
      max_price,
      searchText,
      vendor,
    } = config

    const columns = [
      { name: 'id', label: 'id', options: { display: 'false', filter: false } },
      { name: 'external_id', label: 'Внутрений номер товара', options: { filter: false } },
      {
        name: 'image',
        label: 'Изображение товара',
        options: {
          filter: false,
          customBodyRender: value => <img alt='Картинка' height='50' src={value} />,
        },
      },
      { name: 'name', label: 'Название', options: { filter: false } },
      { name: 'category_name', label: 'Категория', options: { filter: false } },
      {
        name: 'vendor_name',
        label: 'Вендор',
        options: {
          filterList: [vendor],
          filterOptions: {
            names: vendors,
          },
        },
      },
      { name: 'vendor_code', label: 'Код вендора', options: { filter: false } },
      { name: 'barcode', label: 'Баркод', options: { filter: false } },
      { name: 'volume', label: 'Объем', options: { filter: false } },
      { name: 'weight', label: 'Вес', options: { filter: false } },
      { name: 'uktz', label: 'УКТЗ', options: { filter: false } },
      {
        name: 'price',
        label: 'Цена',
        options: {
          filterList: [max_price],
          filterType: 'custom',
          filterOptions: {
            logic: () => false,
            display: (list, onChange, index, column) => (
              <TextField defaultValue={list[11][0]} label='Цена (до)' onInput={e => onChange([e.target.value], index, column)} />
            ),
          },
        },
      },
    ]

    const serverSideFilterList = [[], [], [], [], [], [], [], [], [], [], [], []]
    serverSideFilterList[5] = vendor ? [vendor] : []
    serverSideFilterList[11] = max_price ? [max_price] : []

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
}

Products.propTypes = {
  getProductList: PropTypes.func.isRequired,
  // getSearchAutocomplete: PropTypes.func.isRequired,
  products: PropTypes.array,
  history: PropTypes.object.isRequired,
  config: PropTypes.object,
  vendors: PropTypes.array,
}

export default Products
