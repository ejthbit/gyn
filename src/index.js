import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { cs } from 'date-fns/locale'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import gynBookingTheme from './gynBookingTheme'
import { store } from './store/store'
import { LocalizationProvider } from '@mui/x-date-pickers'

ReactDOM.render(
    <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={cs}
        localeText={{ okButtonLabel: 'Potvrdit', cancelButtonLabel: 'Zavřít' }}
    >
        <ThemeProvider theme={gynBookingTheme}>
            <Provider store={store}>
                <CssBaseline />
                <App />
            </Provider>
        </ThemeProvider>
    </LocalizationProvider>,
    document.getElementById('root')
)
