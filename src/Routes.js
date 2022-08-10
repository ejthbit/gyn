import LoginPageForm from '@components/LoginPageForm/LoginPageForm'
import Navbar from '@components/Navbar/Navbar'
import ProtectedRoute from '@components/ProtectedRoute/ProtectedRoute'
import { Box, CircularProgress } from '@mui/material'
import { isMobile } from '@utilities/checkDeviceType'
import LandingAlert from '@components/LandingWelcome/LandingAlert'
import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import routingPaths from './routingPaths'

const AdminView = lazy(() => import('./pages/adminView/AdminView'))
const Reservation = lazy(() => import('@components/reservation/ReservationStepper'))
const LandingPage = lazy(() => import('./pages/LandingPage/LandingPage'))

const Routes = () => {
    return (
        <Router basename={process.env.NODE_ENV !== 'production' ? '/' : process.env.PROD_WEB_BASE_CONTEXT_PATH}>
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
                <Route
                    path="*"
                    children={
                        <>
                            <LandingAlert />
                            <Navbar />
                        </>
                    }
                />
                <Switch>
                    <Route path="/" exact children={<LandingPage />} />
                    <ProtectedRoute path={routingPaths.admin} children={<AdminView />} shouldLogin />
                    <Route path={routingPaths.login} exact children={<LoginPageForm />} />
                    <Route
                        path={routingPaths.reservation}
                        exact
                        children={
                            <Box marginLeft={isMobile ? '5%' : '30%'} marginRight={isMobile ? '5%' : '30%'}>
                                <Reservation />
                            </Box>
                        }
                    />
                </Switch>
            </Suspense>
        </Router>
    )
}

export default Routes
