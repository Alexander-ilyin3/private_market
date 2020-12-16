const styles = theme => ({
  root: {
    // padding: 10,
  },
  avatarBlock: {
    display: 'flex',
    padding: 6,
  },
  statusWithIcon: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 14,
    marginTop: 8,
  },
  statusRow: {
    display: 'flex',
  },
  avatar: {
    width: 110,
    height: 110,
    margin: '0 12px',
  },
  smallAvatar: {
    width: 60,
    height: 60,
    marginRight: 16,
  },
  tabsBar: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
  },
  headreWuthBtn: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  logoutContainer: {
    padding: 15,
  },
})

export { styles }
