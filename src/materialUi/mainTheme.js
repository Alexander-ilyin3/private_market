import { createMuiTheme } from '@material-ui/core/styles'
import defaultTheme from '@material-ui/core/styles/defaultTheme'
import red from '@material-ui/core/colors/red'

const theme = defaultTheme

export default createMuiTheme({
  palette: {
    primary: { main: '#4a5ab9' },
    secondary: { main: '#18c5a9' },
    warning: { main: '#f39c12' },
    error: { main: red[600] },
    text: { primary: '#979797', secondary: '#b4bcc8' },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    menuBackground: '#304357',
  },
  typography: {
    useNextVariants: true,

  },
  overrides: {
    MuiButton: {

      raised: {
        fontWeight: 400,
      },

      outlinedSecondary: {
        borderColor: '#fff',
        color: '#fff',
      },
    },
    MuiOutlinedInput: {
      input: {
        padding: '0.65rem 1.25rem;',
      },
    },
    MuiInputLabel: {
      outlined: {
        transform: 'translate(14px, 13px) scale(1)',
      },
    },
    MuiTablePagination: {
      toolbar: {
        [theme.breakpoints.down('xs')]: {
          display: 'flex',
          flexDirection: 'column',
        },
      },
      actions: {
        [theme.breakpoints.down('xs')]: {
          margin: 0,
        },
      },
      input: {
        [theme.breakpoints.down('xs')]: {
          marginRight: 8,
        },
      },
    },
    MUIDataTableBodyCell: {
      cellStacked: {
        [theme.breakpoints.down('sm')]: {
          display: 'inline-block',
          wordWrap: 'break-word',
          whiteSpace: 'unset',
          width: '50%',
          height: 'auto',
          borderBottom: 'none',
        },
      },
      responsiveStacked: {
        [theme.breakpoints.down('sm')]: {
          width: '50% !important',
          textAlign: 'end',
          height: 'auto',
          borderBottom: 'none',
          wordWrap: 'break-word',
          whiteSpace: 'unset',
        },
      },
    },
  },
  mixins: {

  },
})
