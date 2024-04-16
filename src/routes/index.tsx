import { createFileRoute } from '@tanstack/react-router'
import LandingPage from '../pages/LandingPage/LandingPage'
import React from 'react'

export const Route = createFileRoute('/')({
    component: () => <LandingPage />,
})
