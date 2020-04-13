
const styles = theme => ({
  body: {
      padding: 20,
  },
  root: {
      [theme.breakpoints.down('sm')]: {
          margin: 5,
      }
  }
});

export { styles }
