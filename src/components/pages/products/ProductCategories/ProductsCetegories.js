import React, { Component } from 'react'
import PropTypes from 'prop-types'


import {
  Paper,
  Typography,
} from '@material-ui/core'
import DataTable from 'mui-datatables'

import { textLabels } from 'config/tableConfig/textLabels'

const columns = [
  { name: 'id', label: 'id', options: { display: 'false', sort: false } },
  { name: 'externalId', label: 'Внутрений номер категории', options: { sort: false } },
  { name: 'name', label: 'Название', options: { sort: false } },
  { name: 'parentName', label: 'Родительская категория', options: { sort: false } },
]

class ProductsCetegories extends Component {
  componentDidMount() {
    const { getProductCategories } = this.props
    getProductCategories({ page: 1, limit: 10 })
  }

  shouldComponentUpdate(nextProps) {
    const { productCategories } = this.props
    return nextProps.productCategories !== productCategories
  }

  onTableChange = (eventType, state) => {
    const { getProductCategories } = this.props
    const { page, rowsPerPage } = state
    if (['changeRowsPerPage', 'changePage'].indexOf(eventType) > -1) {
      getProductCategories({ page: page + 1, limit: rowsPerPage })
    }
  }

  render() {
    const { onTableChange } = this
    const { productCategories = {} } = this.props
    const { categories = [], config = {}, err } = productCategories
    const { page, limit, count } = config

    const options = {
      download: false,
      print: false,
      search: false,
      filter: false,
      selectableRowsHeader: false,
      selectableRows: 'none',
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
        <Typography
          variant='h4'
          color='error'
          align='center'
        >
          {err}
        </Typography>
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
