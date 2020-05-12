import React, { Component } from 'react'
import PropTypes from 'prop-types'


import {
  Paper,
  Typography,
} from '@material-ui/core'
import DataTable from 'mui-datatables'

import { productsPath } from 'config/routes'

import { textLabels } from 'config/tableConfig/textLabels'

class ProductsCetegories extends Component {
  state = {
    diplayed: {
      id: false,
      externalId: true,
      name: true,
      parentName: true,
    },
  }

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
      const diplayed = Object.fromEntries(state.columns.map(col => [col.name, col.display]))
      this.setState({ diplayed })
      getProductCategories({ page: page + 1, limit: rowsPerPage })
    }
  }

  toProductsCategory(id) {
    const { history } = this.props
    history.push(`${productsPath}?category_id=${id}`)
  }

  render() {
    const { diplayed } = this.state
    const columns = [
      { name: 'id', label: 'id', options: { display: diplayed.id, sort: false } },
      { name: 'externalId', label: 'Внутрений номер категории', options: { display: diplayed.externalId, sort: false } },
      { name: 'name', label: 'Название', options: { display: diplayed.name, sort: false } },
      { name: 'parentName', label: 'Родительская категория', options: { display: diplayed.parentName, sort: false } },
    ]
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
      onRowClick: (row) => {
        this.toProductsCategory(row[0])
      },
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
  history: PropTypes.object.isRequired,
}

export default ProductsCetegories
