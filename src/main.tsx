import '@ejthbit/reservation-app/style.css'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { UserProvider } from '@ejthbit/reservation-app'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import gynBookingTheme from './theme'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <ThemeProvider theme={gynBookingTheme}>
            <CssBaseline />
            <UserProvider>
                <App />
            </UserProvider>
        </ThemeProvider>
    </BrowserRouter>,
)
