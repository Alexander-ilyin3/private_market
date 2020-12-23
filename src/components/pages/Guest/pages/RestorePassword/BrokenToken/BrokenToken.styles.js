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
    borderLeft: `4px solid ${theme.palette.error.main}`,
    padding: 11,
    paddingRight: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export { styles }
