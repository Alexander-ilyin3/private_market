export const styles = theme => ({
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
  paymentItem: {
    display: 'flex',
    alignItems: 'center',
  },
})
