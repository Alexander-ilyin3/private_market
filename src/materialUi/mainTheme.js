import { createMuiTheme } from '@material-ui/core/styles'
import red from '@material-ui/core/colors/red'


export default createMuiTheme({
  palette: {
    primary: { main: '#4a5ab9' },
    secondary: { main: '#18c5a9' },
    warning: '#f39c12',
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
      // outlinedPrimary: {
      //     borderColor: '#fff',
      //     borderWidth: 2,
      //     color: '#fff',
      // },
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
  },
  mixins: {

  },
})
