import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'


const MinimalTab = withStyles(theme => ({
  root: {
    '&$selected': {
      color: '#1890ff',
      borderBottom: `1px solid ${theme.palette.primary.main}`,
    },
  },
  selected: {},
}))(props => <Tab {...props} />)

export default MinimalTab
