import React, { Component } from 'react'
import PropTypes from 'prop-types'


import {
  Paper,
} from '@material-ui/core'
import DataTable from 'mui-datatables'

import { textLabels } from 'config/tableConfig/textLabels'

const columns = [
  { name: 'id', label: 'id', options: { display: 'false' } },
  'Внутрений номер категории',
  'Название',
  'Родительская категория',
]

class ProductsCetegories extends Component {
  componentDidMount() {
    const { getProductCategories } = this.props
    getProductCategories({ page: 0, limit: 5 })
  }

  onTableChange = (eventType, state) => {
    const { getProductCategories } = this.props
    const { page, rowsPerPage } = state
    if (['changeRowsPerPage', 'changePage'].indexOf(eventType) > -1) {
      getProductCategories({ page, limit: rowsPerPage })
    }
  }

  render() {
    const { onTableChange } = this
    const { productCategories = {} } = this.props
    const { categories = [], config = {} } = productCategories
    const { page, limit, count } = config

    const options = {
      download: false,
      print: false,
      search: false,
      filter: false,
      count,
      page,
      serverSide: true,
      rowsPerPage: limit,
      rowsPerPageOptions: [5, 10, 15],
      onTableChange,
      textLabels,
    }

    return (
      <Paper>
        <DataTable
          columns={columns}
          data={categories}
          title='КАТЕГОРИИ ТОВАРОВ'
          options={{ ...options }}
        />
      </Paper>
    )
  }
}


ProductsCetegories.propTypes = {
  productCategories: PropTypes.object.isRequired,
  getProductCategories: PropTypes.func.isRequired,
}

export default ProductsCetegories
