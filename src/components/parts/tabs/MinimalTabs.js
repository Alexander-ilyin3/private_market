import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'

const MinimalTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs)

export default MinimalTabs
