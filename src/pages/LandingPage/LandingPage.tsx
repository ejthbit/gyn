import Contacts from '@components/Contacts/Contacts'
import Footer from '@components/Footer/Footer'
import LandingWelcome from '@components/LandingWelcome/LandingWelcome'
import OurTeam from '@components/OurTeam/OurTeam'
import References from '@components/References/References'
import Services from '@components/Services/Services'
import React from 'react'

const LandingPage = () => (
    <>
        <main>
            <LandingWelcome />
            <Services />
            <OurTeam />
            <Contacts />
            <References />
        </main>
        <Footer />
    </>
)

export default LandingPage
