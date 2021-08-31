import AdminToolbar from '@components/adminView/AdminToolbar'
import LoginPageForm from '@components/LoginPageForm/LoginPageForm'
import Navbar from '@components/Navbar/Navbar'
import ProtectedRoute from '@components/ProtectedRoute/ProtectedRoute'
import { Grid, LinearProgress } from '@material-ui/core'
import React, { lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import routingPaths from './routingPaths'
import { isLoggedIn } from './store/administration/selectors'

const AdminView = lazy(() => import('./pages/adminView/AdminView'))
const Reservation = lazy(() => import('@components/reservation/ReservationStepper'))
const LandingPage = lazy(() => import('./pages/LandingPage/LandingPage'))

const Routes = () => {
    const isAuthenticated = useSelector(isLoggedIn)
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
                    <ProtectedRoute path={routingPaths.admin} children={<AdminView />} shouldLogin />
                    <Route path={routingPaths.login} exact children={<LoginPageForm />} />
                    <Route path={routingPaths.reservation} exact children={<Reservation />} />
                </Switch>
            </Suspense>
        </Router>
    )
}

export default Routes
