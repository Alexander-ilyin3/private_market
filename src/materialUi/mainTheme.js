import { createMuiTheme } from '@material-ui/core/styles'
import defaultTheme from '@material-ui/core/styles/defaultTheme'
import red from '@material-ui/core/colors/red'

const theme = defaultTheme

export default createMuiTheme({
  palette: {
    primary: { main: '#4a5ab9', contrastText: '#fff' },
    secondary: { main: '#18c5a9', contrastText: '#fff' },
    warning: { main: '#f39c12' },
    error: { main: red[600] },
    text: { primary: '#34495f', secondary: '#b4bcc8' },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    menuBackground: '#304357',
  },
  typography: {
    useNextVariants: true,
    fontFamily: [
      'Ubuntu',
      'Cantarell',
      'Open Sans',
      'Helvetica Neue',
      'sans-serif',
    ].join(','),

  },
  overrides: {

    MuiChip: {
      root: {
        borderRadius: 3,
        cursor: 'pointer',
        textDecoration: 'none',
      },
    },

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
    MuiTableCell: {
      root: {
        fontFamily: 'inherit',
      },
      body: {
        color: '#34495f',
      },
    },
    MUIDataTableHeadCell: {
      root: {
        backgroundColor: '#ebedee',
        color: '#495057',
        fontSize: '14px',
        fontWeight: 700,
      },
      fixedHeaderCommon: {
        backgroundColor: '#ebedee',
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
      cellStackedSmall: {
        [theme.breakpoints.down('sm')]: {
          display: 'inline-block',
          wordWrap: 'break-word',
          whiteSpace: 'unset',
          width: '50%',
          height: 'auto',
          borderBottom: 'none',
          boxSizing: 'border-box',
        },
      },
      responsiveStackedSmall: {
        [theme.breakpoints.down('sm')]: {
          width: '50%',
          textAlign: 'end',
          height: 'auto',
          borderBottom: 'none',
          wordWrap: 'break-word',
          whiteSpace: 'unset',
          boxSizing: 'border-box',
        },
      },
    },
  },
  mixins: {

  },
})
