/* eslint-disable no-restricted-imports */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  TextField,
} from '@material-ui/core'

import debounce from 'lodash/debounce'

import { Autocomplete } from '@material-ui/lab'


export default class Search extends PureComponent {
  throttledChanges = debounce((value) => {
    const { inputChanged } = this.props
    inputChanged(value)
  }, 500)

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown, false)
  }

  onKeyDown = (event) => {
    const { hideSearch } = this.props
    if (event.keyCode === 27) {
      hideSearch()
    }
  }


  inputChanged(value) {
    if (value) {
      this.throttledChanges(value)
    }
  }

  render() {
    const {
      searchText,
      handleSearch,
      list,
    } = this.props
    return (
      <Autocomplete
        value={searchText}
        onChange={(event, newValue) => handleSearch(newValue)}
        getOptionSelected={() => true}
        options={list}
        getOptionLabel={option => option}
        renderInput={(params) => {
          params.value = params.value || searchText
          return (
            <TextField
              onChange={event => this.inputChanged(event.target.value)}
              {...params}
              variant='standard'
            />
          )
        }}
      />
    )
  }
}

Search.defaultProps = {
  searchText: '',
  list: [],
}

Search.propTypes = {
  searchText: PropTypes.string,
  handleSearch: PropTypes.func.isRequired,
  inputChanged: PropTypes.func.isRequired,
  hideSearch: PropTypes.func.isRequired,
  list: PropTypes.array,
  options: PropTypes.object.isRequired,
}
