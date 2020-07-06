import React from 'react'
import Grid from '@material-ui/core/Grid'

import PropTypes from 'prop-types'

const RenderColumnItem = ({ label, value, labelWeight }) => (
  <Grid key={label} container spacing={0}>
    <Grid item xs={12} sm={labelWeight || 4} style={{ display: 'flex', alignItems: 'center' }}>
      {label}
    </Grid>
    <Grid item xs={12} sm={labelWeight ? 12 - labelWeight : 8}>
      {value}
    </Grid>
  </Grid>
)

RenderColumnItem.defaultProps = {
  label: '',
  value: '',
  labelWeight: null,
}

RenderColumnItem.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.element,
  ]),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.element,
  ]),
  labelWeight: PropTypes.number,
}

export default RenderColumnItem
