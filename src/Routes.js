/* eslint-disable react/no-children-prop */
import Navbar from '@components/Navbar/Navbar'
import { Grid, LinearProgress } from '@material-ui/core'
import React, { Suspense, lazy } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import routingPaths from './routingPaths'

const AdminView = lazy(() => import('./pages/adminView/AdminView'))
const Reservation = lazy(() => import('@components/reservation/ReservationStepper'))
const LandingPage = lazy(() => import('./pages/LandingPage/LandingPage'))

const Routes = () => {
    return (
        <Router>
            <Suspense
                fallback={
                    <Grid>
                        <LinearProgress />
                    </Grid>
                }
            >
                <Route path="*" children={<Navbar />} />
                <Switch>
                    <Route path="/" exact children={<LandingPage />} />
                    <Route path={routingPaths.admin} exact children={<AdminView />} />
                    <Route path={routingPaths.reservation} exact children={<Reservation />} />
                </Switch>
            </Suspense>
        </Router>
    )
}

export default Routes
