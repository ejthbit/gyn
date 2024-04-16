import { createRootRoute, Outlet, ScrollRestoration } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Navbar, ScrollTop } from '../components'
import React from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from '../theme'

export const RootComponent = () => (
    <>
        <Navbar />
        <ThemeProvider theme={theme}>
            <Outlet />
            <ScrollTop />
        </ThemeProvider>
        <CssBaseline />
        <ScrollRestoration />
        <TanStackRouterDevtools />
    </>
)

export const Route = createRootRoute({
    component: RootComponent,
    notFoundComponent: () => {
        return <p>Not Found (on root route)</p>
    },
})
