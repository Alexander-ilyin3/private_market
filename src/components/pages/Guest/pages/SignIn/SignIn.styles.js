const styles = theme => ({
  login: {
      maxWidth: 900,
      margin: '100px auto 50px',
      minHeight: 200,
      '&>*': {
          height: '100%',
      }
  },
  noAcc: {
      backgroundColor: theme.palette.primary.main,
      padding: '1.5rem 3rem',
      color: theme.palette.getContrastText(theme.palette.primary.main),
  },
  // entrance: {
  //     height: '100%',
  // },
  head: {
      position: 'relative',
  },
  avatar: {
      width: 60,
      height: 60,
      backgroundColor: theme.palette.common.white,
      color: theme.palette.primary.main,
      margin: 'auto',
      position: 'relative',
      top: '-30px',
      borderRadius: '50%',
      boxShadow: theme.shadows[5],
      '&>*': {
          fontSize: 35,
      }
  },
  card: {
      borderRadius: 0,
      boxShadow: theme.shadows[0],
      padding: 25,
  },
  title: {
      textAlign: 'center',
  },
  error: {
      border: '1px solid',
      borderColor: theme.palette.error.light,
  }
});

export { styles }
