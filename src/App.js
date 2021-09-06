import ScrollRestoration from '@components/ScrollRestoration'
import ScrollTop from '@components/ScrollTop/ScrollTop'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './Routes'

const App = () => {
    return (
        <>
            <Router>
                <ScrollRestoration>
                    <Routes />
                    <ScrollTop />
                </ScrollRestoration>
            </Router>
        </>
    )
}

export default App
