import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Paper,
} from '@material-ui/core'

import DataTable from 'mui-datatables'
import debounce from 'lodash/debounce'
import { textLabels } from 'config/tableConfig/textLabels'
import { checkAccessByLevel } from 'config/roles'
import SearchInput from 'components/parts/SearchInput'

import renderColumns from './renderColumns'

const MemoizedTableRender = React.memo(props => (
  <Paper>
    <DataTable
      {...props}
    />
  </Paper>
))

class Products extends PureComponent {
  state = {
    diplayed: {
      id: false,
      image: false,
      name: true,
      category_name: true,
      vendor_name: true,
      vendor_code: true,
      barcode: false,
      volume: false,
      weight: false,
      uktz: false,
      price: true,
      individual_price: checkAccessByLevel(2),
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
      search_text: '',
      max_price: null,
      vendor: null,
    })
  }

  onTableChange = (eventType, state) => {
    if (eventType === 'columnViewChange') {
      const diplayed = Object.fromEntries(state.columns.map(col => [col.name, col.display]))
      this.setState({ diplayed })
    }
    if (['changeRowsPerPage', 'changePage'].indexOf(eventType) > -1) {
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
          default:
            return state[key]
        }
      }


      if (dependenciesKeys.find(key => config[key] !== mapconfigToState(key))) {
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

  onFilterChange = (changedColumn, filterList, type, changedColumnIndex) => {
    const filterFieldsMap = {
      category_name: 'category_id',
      vendor_name: 'vendor',
      price: 'max_price',
    }
    this.throttledChanges({ [filterFieldsMap[changedColumn]]: filterList[changedColumnIndex][0] })
  }

  onSearch = (value) => {
    this.throttledChanges({
      search_text: value,
    })
  }

  render() {
    const { onTableChange, onFilterChange } = this
    const {
      products = [],
      config,
      newOrder,
      width,
    } = this.props
    const {
      page,
      limit,
      count,
    } = config


    const { diplayed } = this.state

    const columns = renderColumns({
      diplayed,
      incoming: this.props,
      throttledChanges: this.throttledChanges,
      tooltipsOpened: newOrder,
      width,
    })


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
      onFilterChange,
      textLabels,
      search: false,
    }

    return (
      <MemoizedTableRender
        columns={columns}
        data={products}
        title={<SearchInput tooltipsOpened={newOrder} tooltipTitle='Ищите товары в каталоге по артикулу или названию' onSearch={this.onSearch} />}
        options={{
          ...options,
        }}
      />
    )
  }
}

Products.defaultProps = {
  products: [],
  // searchAutocomleteList: [],
  config: {},
  // vendors: [],  // vendors: PropTypes.array,
  newOrder: false,
  width: '',
}

Products.propTypes = {
  getProductList: PropTypes.func.isRequired,
  // getSearchAutocomplete: PropTypes.func.isRequired,
  products: PropTypes.array,
  config: PropTypes.object,
  // vendors: PropTypes.array,
  location: PropTypes.object.isRequired,
  newOrder: PropTypes.bool,
  width: PropTypes.string,
}

export default Products
