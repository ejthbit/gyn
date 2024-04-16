import React from 'react'
import { LandingWelcome, Services, OurTeam, Contacts, References, Footer } from '../../components'
import { Box } from '@mui/material'

const LandingPage = () => (
    <Box marginTop={10}>
        <LandingWelcome />
        <Services />
        <OurTeam />
        <Contacts />
        <References />
        <Footer />
    </Box>
)

export default LandingPage
