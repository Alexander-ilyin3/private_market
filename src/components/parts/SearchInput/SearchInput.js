import React, { useState } from 'react'
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField'
import Search from '@material-ui/icons/Search'
import Close from '@material-ui/icons/Close'


import TooltipInfo from 'components/parts/TooltipInfo'


const SearchInput = ({
  onSearch,
  tooltipsOpened,
  tooltipTitle,
  position,
  minValue,
}) => {
  const [text, setText] = useState('')
  const search = (value) => {
    if (value === text) return
    setText(value)
    if (value && value.length < minValue) return
    onSearch(value)
  }
  let justifyContent = 'flex-end'
  switch (position) {
    case 'start':
      justifyContent = 'flex-start'
      break
    case 'end':
      justifyContent = 'flex-end'
      break
    case 'center':
      justifyContent = 'center'
      break
    default:
      justifyContent = 'flex-end'
      break
  }
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent,
        width: '100%',
      }}
    >
      <TooltipInfo open={tooltipsOpened} title={tooltipTitle}>
        <div
          style={{
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
      </TooltipInfo>
    </div>
  )
}

SearchInput.propTypes = {
  onSearch: PropTypes.func.isRequired,
  tooltipsOpened: PropTypes.bool,
  tooltipTitle: PropTypes.string,
  position: PropTypes.string,
  minValue: PropTypes.number,
}

SearchInput.defaultProps = {
  tooltipsOpened: false,
  tooltipTitle: '',
  position: 'end',
  minValue: 3,
}

export default SearchInput
