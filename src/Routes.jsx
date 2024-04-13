import Navbar from '@components/Navbar/Navbar'
import { Box, CircularProgress } from '@mui/material'
import { Suspense } from 'react'
import { Routes as RRoutes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage'

const Routes = () => (
    <Suspense
        fallback={
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }}
            >
                <CircularProgress size={40} />
            </Box>
        }
    >
        <RRoutes>
            <Route path="/" element={<Navbar />}>
                <Route path="/" element={<LandingPage />} />
            </Route>
        </RRoutes>
    </Suspense>
)

export default Routes
