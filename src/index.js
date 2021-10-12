import { LocalizationProvider } from '@mui/lab'
import DateAdapter from '@mui/lab/AdapterDateFns'
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material'
import { cs } from 'date-fns/locale'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import gynBookingTheme from './gynBookingTheme'
import { store } from './store/store'

ReactDOM.render(
    <LocalizationProvider dateAdapter={DateAdapter} locale={cs}>
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={gynBookingTheme}>
                <Provider store={store}>
                    <CssBaseline />
                    <App />
                </Provider>
            </ThemeProvider>
        </StyledEngineProvider>
    </LocalizationProvider>,
    document.getElementById('root')
)
