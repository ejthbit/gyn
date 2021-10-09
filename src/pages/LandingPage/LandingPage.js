import React, { lazy } from 'react'

const LandingWelcome = lazy(() => import('@components/LandingWelcome/LandingWelcome'))
const Services = lazy(() => import('@components/Services/Services'))
const OurTeam = lazy(() => import('@components/OurTeam/OurTeam'))
const Contacts = lazy(() => import('@components/Contacts/Contacts'))
const References = lazy(() => import('@components/References/References'))
const Footer = lazy(() => import('@components/Footer/Footer'))

const LandingPage = () => (
    <>
        <LandingWelcome />
        <Services />
        <OurTeam />
        <Contacts />
        <References />
        <Footer />
    </>
)

export default LandingPage
