const styles = theme => ({
  root: {
      display: 'flex',
      height: '200px',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
  },
  bage: {
      margin: 10,
      marginBottom: 30,
      borderLeft: `4px solid ${theme.palette.secondary.main}`,
      padding: 11,
      paddingRight: 16,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  },
  link: {
      textDecoration: 'none',
      '&:visited': {
          color: theme.palette.primary.main,
      }
  }
});

export { styles }
