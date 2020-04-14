import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import { MuiThemeProvider } from '@material-ui/core/styles'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { store } from './reducers'
import theme from './materialUi/mainTheme'

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.register({
//     onUpdate: (registration) => {console.log('Registration on update',registration)},
//     onSuccess: (registration) => {console.log('Registration on success',registration)},
//     testData: 'asdas',
// });
