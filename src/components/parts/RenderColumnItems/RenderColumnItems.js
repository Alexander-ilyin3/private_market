import React from 'react'
import Grid from '@material-ui/core/Grid'

const RenderColumnItems = ({ items }) => items
  .filter(item => !item.hide)
  .map(item => (
    <Grid key={item.label} container spacing={0}>
      <Grid item xs={4} style={{ display: 'flex', alignItems: 'center' }}>
        {item.label}
      </Grid>
      <Grid item xs={8}>
        {item.value}
      </Grid>
    </Grid>
  ))

export default RenderColumnItems
