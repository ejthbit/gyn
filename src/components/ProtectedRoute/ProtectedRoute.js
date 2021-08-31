import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { isLoggedIn } from 'src/store/administration/selectors'

const ProtectedRoute = ({ children, shouldLogin = false, ...restOfProps }) => {
    const isAuthenticated = useSelector(isLoggedIn)

    return (
        <Route
            {...restOfProps}
            render={({ location }) =>
                isAuthenticated ? (
                    children
                ) : shouldLogin ? (
                    <Redirect to={{ pathname: '/login', state: { from: location } }} />
                ) : (
                    <Redirect to={{ pathname: '/', state: { from: location } }} />
                )
            }
        />
    )
}
ProtectedRoute.propTypes = {
    children: PropTypes.node,
    shouldLogin: PropTypes.bool,
}

export default ProtectedRoute
