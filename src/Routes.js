/* eslint-disable react/no-children-prop */
import AdminToolbar from '@components/adminView/AdminToolbar'
import Navbar from '@components/Navbar/Navbar'
import ProtectedRoute from '@components/ProtectedRoute/ProtectedRoute'
import { Grid, LinearProgress } from '@material-ui/core'
import React, { Suspense, lazy } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import routingPaths from './routingPaths'

const AdminView = lazy(() => import('./pages/adminView/AdminView'))
const Reservation = lazy(() => import('@components/reservation/ReservationStepper'))
const LandingPage = lazy(() => import('./pages/LandingPage/LandingPage'))

const Routes = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    return (
        <Router>
            <Suspense
                fallback={
                    <Grid>
                        <LinearProgress />
                    </Grid>
                }
            >
                <Route path="*" children={isAuthenticated ? <AdminToolbar /> : <Navbar />} />
                <Switch>
                    <Route path="/" exact children={<LandingPage />} />
                    <ProtectedRoute path={routingPaths.admin} children={<AdminView />} />
                    <Route path={routingPaths.reservation} exact children={<Reservation />} />
                </Switch>
            </Suspense>
        </Router>
    )
}

export default Routes
