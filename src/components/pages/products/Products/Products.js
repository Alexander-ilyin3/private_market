// /* eslint-disable no-restricted-imports */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Paper,
} from '@material-ui/core'

import DataTable from 'mui-datatables'
import debounce from 'lodash/debounce'

import { textLabels } from 'config/tableConfig/textLabels'

import SearchInput from 'components/parts/SearchInput'

import renderColumns from './renderColumns'
// import SearchComponent from 'components/parts/DataTableParts/SearchComponent'


class Products extends PureComponent {
  state = {
    diplayed: {
      id: false,
      image: false,
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
    const { config } = this.props
    const { getProductList } = this.props
    const { count, page } = config
    if (count) delete config.count
    if (page) delete config.page
    getProductList({ ...config, ...value })
  }, 500)

  componentDidMount() {
    const { location } = this.props
    const { search } = location
    const paramsEntries = search.slice(1).split('&').map(item => item.split('='))
    const paramsMap = Object.fromEntries(paramsEntries)
    const { category_id } = paramsMap
    this.throttledChanges({
      page: 1,
      limit: 10,
      category_id,
    })
  }

  onTableChange = (eventType, state) => {
    if (eventType === 'columnViewChange') {
      const diplayed = Object.fromEntries(state.columns.map(col => [col.name, col.display]))
      this.setState({ diplayed })
    }
    if (['changeRowsPerPage', 'changePage', 'filterChange'].indexOf(eventType) > -1) {
      const { config } = this.props
      const {
        filterList,
        page,
        rowsPerPage,
      } = state

      // if (eventType === 'search' && searchText && searchText.length < 3) return

      const max_price = filterList[10][0]
      const vendor = filterList[5][0]
      const category_id = filterList[4]
      const dependenciesKeys = [
        'page',
        'limit',
        'count',
        'max_price',
        // 'searchText',
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
          max_price,
          vendor,
          category_id,
        })
      }
    }
  }

  onSearch = (value) => {
    this.throttledChanges({
      search_text: value,
    })
  }

  render() {
    const { onTableChange } = this
    const {
      products = [],
      // getSearchAutocomplete,
      config,
      categories = [],
    } = this.props

    const {
      page,
      limit,
      count,
      max_price,
      vendor,
      category_id,
    } = config

    const { diplayed } = this.state

    const columns = renderColumns({
      diplayed,
      incoming: this.props,
      throttledChanges: this.throttledChanges,
    })

    const serverSideFilterList = [[], [], [], [], [], [], [], [], [], [], []]
    const selectedCategory = categories.find(cat => cat.id === Number(category_id))
    serverSideFilterList[4] = selectedCategory ? [selectedCategory] : []
    serverSideFilterList[5] = vendor ? [vendor] : []
    serverSideFilterList[10] = max_price ? [max_price] : []


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
      search: false,
      // onRowClick: this.navigateToProductPage,
    }

    return (
      <Paper>
        <DataTable
          columns={columns}
          data={products}
          title={<SearchInput onSearch={this.onSearch} />}
          options={{
            ...options,
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
  // vendors: [],  // vendors: PropTypes.array,
  categories: [],
}

Products.propTypes = {
  getProductList: PropTypes.func.isRequired,
  // getSearchAutocomplete: PropTypes.func.isRequired,
  products: PropTypes.array,
  config: PropTypes.object,
  // vendors: PropTypes.array,
  categories: PropTypes.array,
  location: PropTypes.object.isRequired,
}

export default Products
