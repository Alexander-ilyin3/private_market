const styles = theme => ({
  toolbar: {
      ...theme.mixins.toolbar,
      backgroundColor: '#4c6c8b',
      height: 64,
      alignItems: 'middle',
      display: 'flex',
  },
  root: {
      backgroundColor: theme.palette.menuBackground,
      color: theme.palette.text.secondary,
  },
  menuIcon: {
      color: 'inherit',
  },
  focus: {
      color: '#fff',
      backgroundColor: 'rgba(255, 255, 255, 0.14)!important'
  },
  topIcon: {
      marginRight: 0,
      marginLeft: -5,
  },
  link: {
      color: 'inherit',
      textDecoration: 'none',
      wordWrap: 'nowrap',
  },
  listButton: {
      // '& :hover': {
      //     backgroundColor: 'rgba(255, 255, 255, 0.14)'
      // },

  }
});

export { styles }