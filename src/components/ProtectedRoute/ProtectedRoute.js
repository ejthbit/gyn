import PropTypes from 'prop-types'
import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const ProtectedRoute = ({ children, ...restOfProps }) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated')

    return (
        <Route
            {...restOfProps}
            render={({ location }) =>
                isAuthenticated ? children : <Redirect to={{ pathname: '/', state: { from: location } }} />
            }
        />
    )
}
ProtectedRoute.propTypes = {
    children: PropTypes.node,
}

export default ProtectedRoute
