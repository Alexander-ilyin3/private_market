import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';


export default createMuiTheme({
    palette:{
        primary: {main: '#5c6bc0'},
        secondary: {main: '#18c5a9'},
        warning: '#f39c12',
        error:  {main: red[600]},
        text:{primary: '#979797'},
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
    typography: { useNextVariants: true },
});