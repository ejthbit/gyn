import DateFnsUtils from '@date-io/date-fns'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import csLocale from 'date-fns/locale/cs'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import gynBookingTheme from './gynBookingTheme'
import { store } from './store/store'

ReactDOM.render(
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={csLocale}>
        <MuiThemeProvider theme={gynBookingTheme}>
            <Provider store={store}>
                <CssBaseline />
                <App />
            </Provider>
        </MuiThemeProvider>
    </MuiPickersUtilsProvider>,
    document.getElementById('root')
)
