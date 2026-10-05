import ContactForm from '@components/Contacts/ContactForm'
import { useCookieConsent } from '@components/CookieConsent/CookieConsent'
import CookiesInfoDialog from '@components/CookieConsent/CookiesInfoDialog'
import TransparentLogo from '@components/Logo/TransparentLogo'
import { routes } from '@components/Navbar/Navbar'
import NavRouteLink from '@components/Navbar/NavRouteLink'
import { Box, Link, Typography } from '@mui/material'
import { alpha, lighten, styled } from '@mui/material/styles'
import React, { useState } from 'react'
import { AMBULANCES } from '../../constants/ambulances'

const PREFIX = 'Footer'
const classes = {
    root: `${PREFIX}-root`,
    inner: `${PREFIX}-inner`,
    columns: `${PREFIX}-columns`,
    logo: `${PREFIX}-logo`,
    heading: `${PREFIX}-heading`,
    links: `${PREFIX}-links`,
    bottomBar: `${PREFIX}-bottomBar`,
}

const Root = styled('footer')(({ theme }) => {
    const white = theme.palette.common.white
    const link = {
        color: alpha(white, 0.8),
        textDecoration: 'none',
        transition: theme.transitions.create('color'),
        '&:hover': { color: white, textDecoration: 'underline' },
    }

    return {
        [`&.${classes.root}`]: {
            backgroundColor: '#103c3a',
            color: alpha(white, 0.8),
            padding: theme.spacing(10, '5%', 4),
            [theme.breakpoints.down('md')]: { padding: theme.spacing(6, 3, 3) },
        },
        [`& .${classes.inner}`]: { maxWidth: 1200, margin: '0 auto' },
        [`& .${classes.columns}`]: {
            display: 'grid',
            gridTemplateColumns: '4fr 2fr 6fr',
            gap: theme.spacing(6),
            alignItems: 'start',
            [theme.breakpoints.down('md')]: { gridTemplateColumns: '1fr 1fr', gap: theme.spacing(5) },
            [theme.breakpoints.down('sm')]: { gridTemplateColumns: '1fr' },
        },
        [`& .${classes.logo}`]: {
            display: 'block',
            width: 220,
            marginBottom: theme.spacing(3),
            '& svg': { width: '100%' },
        },
        [`& .${classes.heading}`]: {
            marginBottom: theme.spacing(1.5),
            fontWeight: 700,
            fontSize: '0.8rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: lighten(theme.palette.primary.main, 0.55),
        },
        [`& .${classes.links}`]: {
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'grid',
            gap: theme.spacing(1.25),
            '& a': link,
        },
        // Contact form spans the full width once the columns wrap.
        [`& .${classes.columns} > :last-child`]: {
            [theme.breakpoints.down('md')]: { gridColumn: '1 / -1' },
        },
        [`& .${classes.bottomBar}`]: {
            marginTop: theme.spacing(8),
            paddingTop: theme.spacing(3),
            borderTop: `1px solid ${alpha(white, 0.12)}`,
            display: 'flex',
            flexWrap: 'wrap',
            gap: theme.spacing(2, 3),
            justifyContent: 'space-between',
            alignItems: 'center',
            '& .MuiLink-root': link,
        },
    }
})

const Footer = () => {
    const [isCookiesInfoOpen, setIsCookiesInfoOpen] = useState(false)
    const { openCookieSettings } = useCookieConsent()

    return (
        <Root className={classes.root}>
            <Box className={classes.inner}>
                <Box className={classes.columns}>
                    <Box>
                        <Box className={classes.logo}>
                            <TransparentLogo />
                        </Box>
                        <Typography sx={{ color: 'common.white', fontWeight: 700 }}>MUDr. Miroslav Vaněk</Typography>
                        <Typography variant="body2" sx={{ mb: 3 }}>
                            Gynekologická ambulance s.r.o.
                        </Typography>
                        {AMBULANCES.map(({ name, address, contact }) => (
                            <Box key={name} sx={{ mb: 2 }}>
                                <Typography variant="body2" sx={{ color: 'common.white', fontWeight: 700 }}>
                                    Pobočka {name}
                                </Typography>
                                <Typography variant="body2">{address}</Typography>
                                <Typography variant="body2" className={classes.links} sx={{ mt: 0.5 }}>
                                    <a href={`tel:+420${contact.phone.replace(/\s/g, '')}`}>+420 {contact.phone}</a>
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                    <Box component="nav" aria-label="Mapa webu">
                        <Typography className={classes.heading}>Mapa webu</Typography>
                        <Box component="ul" className={classes.links}>
                            {routes.map(
                                ({ text, link }) =>
                                    typeof text === 'string' && (
                                        <Typography key={link} component="li" variant="body2">
                                            <NavRouteLink link={link}>{text}</NavRouteLink>
                                        </Typography>
                                    )
                            )}
                        </Box>
                    </Box>
                    <ContactForm onShowPrivacyInfo={() => setIsCookiesInfoOpen(true)} />
                </Box>
                <Box className={classes.bottomBar}>
                    <Typography variant="caption">
                        {`Copyright © ${new Date().getFullYear()} ejthbit. All rights reserved.`}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 3 }}>
                        <Link component="button" variant="body2" onClick={() => setIsCookiesInfoOpen(true)}>
                            GDPR a cookies
                        </Link>
                        <Link component="button" variant="body2" onClick={openCookieSettings}>
                            Nastavení cookies
                        </Link>
                    </Box>
                </Box>
            </Box>
            <CookiesInfoDialog open={isCookiesInfoOpen} handleClose={() => setIsCookiesInfoOpen(false)} />
        </Root>
    )
}

export default Footer
