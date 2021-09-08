import LandingWelcome from '@components/LandingWelcome/LandingWelcome'
import Services from '@components/Services/Services'
import OurTeam from '@components/OurTeam/OurTeam'
import Contacts from '@components/Contacts/Contacts'
import References from '@components/References/References'
import Footer from '@components/Footer/Footer'
import React from 'react'

const LandingPage = () => {
    return (
        <>
            <LandingWelcome />
            <Services />
            <OurTeam />
            <Contacts />
            <References />
            <Footer />
        </>
    )
}

export default LandingPage
