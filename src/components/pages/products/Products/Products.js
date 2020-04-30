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

import SearchComponent from '../../../parts/DataTableParts/SearchComponent'


class Products extends PureComponent {
  throttledChanges = debounce((value) => {
    const { getProductList } = this.props
    getProductList(value)
  }, 500)

  componentDidMount() {
    const { getProductList } = this.props
    getProductList({ page: 0, limit: 5, searchText: null })
  }

  onTableChange = (eventType, state) => {
    if (['changeRowsPerPage', 'changePage', 'search', 'filterChange', 'onFilterDialogClose'].indexOf(eventType) > -1) {
      const { config } = this.props
      const {
        page,
        rowsPerPage,
        searchText,
        filterList,
      } = state
      const maxAmount = filterList[11][0]
      const selectedVendors = filterList[5]

      const dependenciesKeys = [
        'page',
        'limit',
        'count',
        'maxAmount',
        'searchText',
        'selectedVendors',
      ]

      const mapconfigToState = (key) => {
        switch (key) {
          case 'limit':
            return state.rowsPerPage
          case 'maxAmount':
            return maxAmount
          case 'selectedVendors':
            return selectedVendors
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
          page,
          limit: rowsPerPage,
          searchText,
          maxAmount,
          selectedVendors,
        })
      }
    }
  }


  render() {
    const { onTableChange } = this
    const {
      products = [],
      getSearchAutocomplete,
      searchAutocomleteList,
      config,
    } = this.props
    const {
      page,
      limit,
      count,
      maxAmount,
      searchText,
      vendors,
      selectedVendors,
    } = config

    const columns = [
      { name: 'id', label: 'id', options: { display: 'false', filter: false } },
      { name: 'Внутрений номер товара', label: 'Внутрений номер товара', options: { filter: false } },
      { name: 'Изображение товара', label: 'Изображение товара', options: { filter: false } },
      { name: 'Название', label: 'Название', options: { filter: false } },
      { name: 'Категория', label: 'Категория', options: { filter: false } },
      {
        name: 'Вендор',
        label: 'Вендор',
        options: {
          filterList: selectedVendors,
          filterOptions: {
            names: [...vendors],
          },
        },
      },
      { name: 'Код вендора', label: 'Код вендора', options: { filter: false } },
      { name: 'Баркод', label: 'Баркод', options: { filter: false } },
      { name: 'Объем', label: 'Объем', options: { filter: false } },
      { name: 'Вес', label: 'Вес', options: { filter: false } },
      { name: 'УКТЗ', label: 'УКТЗ', options: { filter: false } },
      {
        name: 'Цена (до)',
        label: 'Цена (до)',
        options: {
          filterList: [maxAmount],
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

    const serverSideFilterList = [[], [], [], [], [], [], [], [], [], [], []]
    serverSideFilterList[11] = selectedVendors || []
    serverSideFilterList[5] = [maxAmount]

    const options = {
      download: false,
      print: false,
      count,
      page,
      serverSide: true,
      rowsPerPage: limit,
      rowsPerPageOptions: [5, 10, 15],
      onTableChange,
      textLabels,
      serverSideFilterList,
      searchText,
    }

    return (
      <Paper>
        <DataTable
          columns={columns}
          data={products}
          options={{
            ...options,
            customSearchRender: (searchText, handleSearch, hideSearch, options) => (
              <SearchComponent
                searchText={searchText}
                handleSearch={handleSearch}
                inputChanged={getSearchAutocomplete}
                hideSearch={hideSearch}
                list={searchAutocomleteList}
                options={options}
              />
            ),
          }}
        />
      </Paper>
    )
  }
}

Products.defaultProps = {
  products: [],
  searchAutocomleteList: [],
  config: {},
}

Products.propTypes = {
  getProductList: PropTypes.func.isRequired,
  getSearchAutocomplete: PropTypes.func.isRequired,
  products: PropTypes.array,
  searchAutocomleteList: PropTypes.array,
  config: PropTypes.object,
}

export default Products
