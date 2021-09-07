import ScrollRestoration from '@components/ScrollRestoration'
import ScrollTop from '@components/ScrollTop/ScrollTop'
import AutomaticLogoutDialog from '@components/AutomaticLogoutDialog'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './Routes'

const App = () => {
    return (
        <>
            <Router>
                <ScrollRestoration>
                    <AutomaticLogoutDialog />
                    <Routes />
                    <ScrollTop />
                </ScrollRestoration>
            </Router>
        </>
    )
}

export default App
