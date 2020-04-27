import React, { Component } from 'react'
import PropTypes from 'prop-types'


import {
  Paper,
} from '@material-ui/core'
import DataTable from 'mui-datatables'

const columns = ['Внутрений номер категории', 'Название', 'Родительская категория']

class ProductsCetegories extends Component {
  componentDidMount() {
    const { getProductCategories } = this.props
    getProductCategories({ page: 0, rowsPerPage: 5 })
  }

  onTableChange = (eventType, state) => {
    const { getProductCategories } = this.props
    const { page, rowsPerPage } = state
    if (['changeRowsPerPage', 'changePage'].indexOf(eventType) > -1) {
      getProductCategories({ page, rowsPerPage })
    }
  }

  render() {
    const { onTableChange } = this
    const { productCategories = {} } = this.props
    const { categories = [], config = {} } = productCategories
    const { page, rowsPerPage, count } = config

    const options = {
      download: false,
      print: false,
      search: false,
      viewColumns: false,
      filter: false,
      count,
      page,
      serverSide: true,
      rowsPerPage,
      rowsPerPageOptions: [5, 10, 15],
      onTableChange,
      textLabels: {
        filter: {
          all: 'Все',
          reset: 'Сброс',
          title: 'Фильтр',
        },
        body: {
          noMatch: 'Нет Совпадений',
          toolTip: 'Сортировать',
        },
        pagination: {
          displayRows: 'строк из',
          next: 'Вперед',
          previous: 'Назад',
          rowsPerPage: 'На странице',
        },
        selectedRows: {
          delete: 'Удалить',
          deleteAria: '',
          text: '',
        },
        toolbar: {
          downloadCsv: 'Скачать в CSV',
          filterTable: 'Фильтры',
          print: 'Распечатать',
          search: 'Поиск',
          viewColumns: 'Показывать колонки',
        },
        viewColumns: {
          title: 'Показывать',
          // titleAria: '',
        },
      },
    }

    return (
      <Paper>
        <DataTable
          key={count}
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
