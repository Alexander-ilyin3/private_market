import React from 'react'
import Grid from '@material-ui/core/Grid'

import PropTypes from 'prop-types'

const RenderColumnItem = ({ label, value }) => (
  <Grid key={label} container spacing={0}>
    <Grid item xs={4} style={{ display: 'flex', alignItems: 'center' }}>
      {label}
    </Grid>
    <Grid item xs={8}>
      {value}
    </Grid>
  </Grid>
)

RenderColumnItem.defaultProps = {
  label: '',
  value: '',
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
}

export default RenderColumnItem
