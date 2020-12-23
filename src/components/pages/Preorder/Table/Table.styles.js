export const styles = theme => ({
  orderButton: {
    margin: 8,
  },
  Attributes: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    display: 'inline-block',
    // alignItems: 'center',
    // justifyContent: 'right',
    '& > *': {
      display: 'inline-block',
    },
  },
  value: {
    [theme.breakpoints.up('sm')]: {
      minWidth: '120px',
      display: 'inline-block',
      height: '100%',
    },
  },
})
