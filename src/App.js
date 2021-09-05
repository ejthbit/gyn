import ScrollTop from '@components/ScrollTop/ScrollTop'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './Routes'

const App = () => {
    return (
        <>
            <Router>
                <Routes />
                <ScrollTop />
            </Router>
        </>
    )
}

export default App
