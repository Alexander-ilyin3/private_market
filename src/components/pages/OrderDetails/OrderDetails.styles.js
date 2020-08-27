export const styles = theme => ({
  detailsList: {
    [theme.breakpoints.down('xl')]: {
      padding: '20px 180px',
    },
    [theme.breakpoints.down('md')]: {
      padding: '20px 50px',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '10px 0',
    },
  },
  detail: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px',
  },
  odd: {
    backgroundColor: '#ebedee',
  },
})
