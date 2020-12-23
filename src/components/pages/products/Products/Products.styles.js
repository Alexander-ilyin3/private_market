const styles = theme => ({
  // Bar: {
  //   padding: '20px 50px',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  // },
  // rightmenuElements: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   justifyContent: 'spacearound',
  //   alignItems: 'center',
  // },
  // searchBar: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  hover: {
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      color: theme.palette.secondary.main,
      cursor: 'pointer',
    },
  },
  withImageBreak: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
})

export default styles
