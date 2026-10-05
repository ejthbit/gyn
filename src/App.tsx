import AnnouncementsOverlay from '@components/Announcements/AnnouncementsOverlay'
import Navbar from '@components/Navbar/Navbar'
import { AdministrationPage, Login, ProtectedRoute } from '@ejthbit/reservation-app'
import { Box, CircularProgress } from '@mui/material'
import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
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
        <AnnouncementsOverlay />
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
            {/* The server falls back to index.html for every path (e.g. old /index.php links); send those home. */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </Suspense>
)

export default App
