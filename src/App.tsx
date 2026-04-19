import { AdministrationPage, Login, ProtectedRoute } from '@ejthbit/reservation-app'
import { Box, CircularProgress } from '@mui/material'
import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '@components/Navbar/Navbar'
import routingPaths from './routingPaths'

const LandingPage = lazy(() => import('./pages/LandingPage/LandingPage'))
const ReservationPage = lazy(() => import('./pages/ReservationPage'))

const App = () => (
    <Suspense
        fallback={
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <CircularProgress size={40} />
            </Box>
        }
    >
        <Navbar />
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path={routingPaths.reservation} element={<ReservationPage />} />
            <Route path={routingPaths.login} element={<Login onGetUser={() => undefined} />} />
            <Route
                path={`${routingPaths.admin}/*`}
                element={
                    <ProtectedRoute shouldLogin loginPath={routingPaths.login}>
                        <AdministrationPage />
                    </ProtectedRoute>
                }
            />
        </Routes>
    </Suspense>
)

export default App
