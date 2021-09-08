import ScrollRestoration from '@components/ScrollRestoration'
import ScrollTop from '@components/ScrollTop/ScrollTop'
import AutomaticLogoutDialog from '@components/AutomaticLogoutDialog'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './Routes'

const App = () => {
    return (
        <>
            <Router basename={process.env.NODE_ENV !== 'production' ? '/' : process.env.PROD_WEB_BASE_CONTEXT_PATH}>
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
