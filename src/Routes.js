import LoginPageForm from '@components/LoginPageForm/LoginPageForm'
import Navbar from '@components/Navbar/Navbar'
import ProtectedRoute from '@components/ProtectedRoute/ProtectedRoute'
import { Box, Grid, LinearProgress } from '@material-ui/core'
import React, { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom'
import routingPaths from './routingPaths'
import { match } from 'ramda'
import isNilOrEmpty from '@utilities/isNilOrEmpty'

const AdminView = lazy(() => import('./pages/adminView/AdminView'))
const Reservation = lazy(() => import('@components/reservation/ReservationStepper'))
const LandingPage = lazy(() => import('./pages/LandingPage/LandingPage'))

const Routes = () => {
    const { pathname } = useLocation()
    const isAdminRoute = !isNilOrEmpty(match(/admin/g, pathname))

    return (
        <Suspense
            fallback={
                <Grid>
                    <LinearProgress />
                </Grid>
            }
        >
            <Route path="*" children={<Navbar />} />
            <Box paddingTop={!isAdminRoute ? 18 : 0}>
                <Switch>
                    <Route path="/" exact children={<LandingPage />} />
                    <ProtectedRoute path={routingPaths.admin} children={<AdminView />} shouldLogin />
                    <Route path={routingPaths.login} exact children={<LoginPageForm />} />
                    <Route path={routingPaths.reservation} exact children={<Reservation />} />
                </Switch>
            </Box>
        </Suspense>
    )
}

export default Routes
