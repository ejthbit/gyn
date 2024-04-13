import ScrollRestoration from '@components/ScrollRestoration'
import ScrollTop from '@components/ScrollTop/ScrollTop'
import React from 'react'
import Routes from './Routes'

const App = () => (
    <>
        <ScrollRestoration>
            <Routes />
            <ScrollTop />
        </ScrollRestoration>
    </>
)

export default App
