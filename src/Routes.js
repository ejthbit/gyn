import LoginPageForm from '@components/LoginPageForm/LoginPageForm'
import Navbar from '@components/Navbar/Navbar'
import ProtectedRoute from '@components/ProtectedRoute/ProtectedRoute'
import { Grid, LinearProgress } from '@material-ui/core'
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
                    <Grid>
                        <LinearProgress />
                    </Grid>
                }
            >
                <Route path="*" children={<Navbar />} />
                <Switch>
                    <Route path="/" exact children={<LandingPage />} />
                    <ProtectedRoute path={routingPaths.admin} children={<AdminView />} shouldLogin />
                    <Route path={routingPaths.login} exact children={<LoginPageForm />} />
                    <Route path={routingPaths.reservation} exact children={<Reservation />} />
                </Switch>
            </Suspense>
        </Router>
    )
}

export default Routes
