import React, { Component } from 'react'
import {
  Paper,
} from '@material-ui/core'
import DataTable from 'mui-datatables'

const columns = ['Внутрений номер категории', 'Название', 'Родительская категория']
const data = [
  [115, 'Продуктики', 'Другие продуктики'],
  [115, 'Продуктики', 'Другие продуктики'],
  [115, 'Продуктики', 'Другие продуктики'],
  [115, 'Продуктики', 'Другие продуктики'],
  [115, 'Продуктики', 'Другие продуктики'],
  [115, 'Продуктики', 'Другие продуктики'],
  [115, 'Продуктики', 'Другие продуктики'],
  [115, 'Продуктики', 'Другие продуктики'],
  [115, 'Продуктики', 'Другие продуктики'],
  [115, 'Продуктики', 'Другие продуктики'],
  [115, 'Продуктики', 'Другие продуктики'],
  [115, 'Продуктики', 'Другие продуктики'],
  [115, 'Продуктики', 'Другие продуктики'],
  [115, 'Продуктики', 'Другие продуктики'],
  [115, 'Продуктики', 'Другие продуктики'],
]

class ProductsCetegories extends Component {
  state = {
    count: 0,
    page: 0,
    rowsPerPage: 5,
  }

  componentDidMount() {

  }

  onChangePage = (page) => {
    this.setState({ page })
  }

  onChangeRowsPerPage = (rowsPerPage) => {
    this.setState({ rowsPerPage })
  }

  render() {
    const { count, rowsPerPage, page } = this.state
    const { onChangePage, onChangeRowsPerPage } = this


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
      onChangePage,
      onChangeRowsPerPage,
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
          data={data}
          title='КАТЕГОРИИ ТОВАРОВ'
          options={{ ...options }}
        />
      </Paper>
    )
  }
}

export default ProductsCetegories
