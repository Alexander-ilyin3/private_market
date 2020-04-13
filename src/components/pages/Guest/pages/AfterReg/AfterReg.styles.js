const styles = theme => ({
  root: {
      display: 'flex',
      height: '200px',
      alignItems: 'center',
      justifyContent: 'center',
  },
  bage: {
      margin: 10,
      borderLeft: `4px solid ${theme.palette.primary.main}`,
      padding: 11,
      paddingRight: 16,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  }
});

export { styles }
