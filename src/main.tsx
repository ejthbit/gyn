import '@fontsource/nunito/400.css'
import '@fontsource/nunito/700.css'
import '@fontsource/nunito/900.css'
import '@ejthbit/reservation-app/style.css'
import { CookieConsentProvider } from '@components/CookieConsent/CookieConsent'
import { ReservationProvider } from '@components/Reservation/ReservationProvider'
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
                <CookieConsentProvider>
                    <ReservationProvider>
                        <App />
                    </ReservationProvider>
                </CookieConsentProvider>
            </UserProvider>
        </ThemeProvider>
    </BrowserRouter>
)
