import React, { useState } from 'react'
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField'
import Search from '@material-ui/icons/Search'
import Close from '@material-ui/icons/Close'


const SearchInput = ({ onSearch }) => {
  const [text, setText] = useState('')
  const search = (value) => {
    if (value === text) return
    setText(value)
    if (value && value.length < 3) return
    onSearch(value)
  }
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end',
        maxWidth: 350,
      }}
    >
      <TextField
        value={text}
        onInput={(e) => {
          const { value } = e.target
          search(value)
        }}
        InputProps={{
          startAdornment: <Search />,
          endAdornment: (
            <Close
              onClick={() => {
                search('')
              }}
              style={{ cursor: 'pointer' }}
            />
          ),
        }}
        variant='outlined'
      />
    </div>
  )
}

SearchInput.propTypes = {
  onSearch: PropTypes.func.isRequired,
}

export default SearchInput
