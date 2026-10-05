import SectionHeading from '@components/LandingSection/SectionHeading'
import Reveal from '@components/Reveal/Reveal'
import {
    AccessTime as AccessTimeIcon,
    Email as EmailIcon,
    LocationOn as LocationOnIcon,
    Map as MapIcon,
    Phone as PhoneIcon,
} from '@mui/icons-material'
import { Box, Button, Link, Typography } from '@mui/material'
import { alpha, lighten, styled } from '@mui/material/styles'
import getGoogleMapsUrl from '@utilities/getGoogleMapsUrl'
import React, { ReactNode } from 'react'
import { AMBULANCES } from '../../constants/ambulances'

const PREFIX = 'Contacts'
const classes = {
    root: `${PREFIX}-root`,
    inner: `${PREFIX}-inner`,
    cards: `${PREFIX}-cards`,
    card: `${PREFIX}-card`,
    row: `${PREFIX}-row`,
    rowIcon: `${PREFIX}-rowIcon`,
    hours: `${PREFIX}-hours`,
}

const Root = styled('section')(({ theme }) => {
    const primary = theme.palette.primary.main

    return {
        [`&.${classes.root}`]: {
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: lighten(primary, 0.94),
            padding: theme.spacing(12, '5%'),
            marginBottom: theme.spacing(10),
            [theme.breakpoints.down('md')]: { padding: theme.spacing(8, 3), marginBottom: theme.spacing(6) },
            // Soft circle in the corner, echoing the hero background.
            '&::before': {
                content: '""',
                position: 'absolute',
                width: 520,
                height: 520,
                top: -260,
                left: -180,
                borderRadius: '50%',
                backgroundColor: alpha(primary, 0.06),
            },
        },
        [`& .${classes.inner}`]: { position: 'relative', maxWidth: 1200, margin: '0 auto' },
        [`& .${classes.cards}`]: {
            display: 'grid',
            gap: theme.spacing(4),
            gridTemplateColumns: 'repeat(2, 1fr)',
            alignItems: 'stretch',
            [theme.breakpoints.down('md')]: { gridTemplateColumns: '1fr' },
        },
        [`& .${classes.card}`]: {
            height: '100%',
            padding: theme.spacing(5),
            borderRadius: theme.spacing(3),
            backgroundColor: theme.palette.common.white,
            boxShadow: `0 16px 40px ${alpha(primary, 0.1)}`,
            [theme.breakpoints.down('sm')]: { padding: theme.spacing(3) },
        },
        [`& .${classes.row}`]: {
            display: 'flex',
            gap: theme.spacing(2),
            alignItems: 'flex-start',
        },
        [`& .${classes.row} + .${classes.row}`]: { marginTop: theme.spacing(3) },
        [`& .${classes.rowIcon}`]: {
            flexShrink: 0,
            display: 'grid',
            placeItems: 'center',
            width: 44,
            height: 44,
            borderRadius: '50%',
            color: primary,
            backgroundColor: lighten(primary, 0.9),
        },
        [`& .${classes.hours}`]: {
            margin: 0,
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            columnGap: theme.spacing(3),
            rowGap: theme.spacing(0.75),
            '& dt': { color: theme.palette.text.secondary },
            '& dd': { margin: 0, fontWeight: 700, textAlign: 'right' },
        },
    }
})

const ContactRow = ({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) => (
    <Box className={classes.row}>
        <Box className={classes.rowIcon}>{icon}</Box>
        <Box sx={{ flexGrow: 1, minWidth: 0, pt: 0.25 }}>
            <Typography variant="overline" color="text.secondary" sx={{ display: 'block', lineHeight: 1.6 }}>
                {label}
            </Typography>
            {children}
        </Box>
    </Box>
)

const Contacts = () => (
    <Root className={classes.root} id="contact">
        <Box className={classes.inner}>
            <SectionHeading title="Kontakt" />
            <Box className={classes.cards}>
                {AMBULANCES.map(({ name, contact, openingHours, address, location }, index) => (
                    <Reveal key={name} delay={index * 100}>
                        <Box component="article" className={classes.card}>
                            <Typography component="h3" sx={{ fontWeight: 900, fontSize: '1.75rem', mb: 3 }}>
                                {name}
                            </Typography>
                            <ContactRow icon={<LocationOnIcon />} label="Adresa">
                                <Typography>{address}</Typography>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    endIcon={<MapIcon />}
                                    onClick={() => window.open(getGoogleMapsUrl(location))}
                                    sx={{ mt: 1.5, borderRadius: 999, textTransform: 'none', px: 2 }}
                                >
                                    Navigovat
                                </Button>
                            </ContactRow>
                            <ContactRow icon={<AccessTimeIcon />} label="Ordinační hodiny">
                                <Box component="dl" className={classes.hours}>
                                    {openingHours.map(({ day, hours }) => (
                                        <React.Fragment key={day}>
                                            <dt>{day}</dt>
                                            <dd>{hours}</dd>
                                        </React.Fragment>
                                    ))}
                                </Box>
                            </ContactRow>
                            <ContactRow icon={<PhoneIcon />} label="Telefon">
                                <Link href={`tel:+420${contact.phone.replace(/\s/g, '')}`} underline="hover">
                                    {contact.phone}
                                </Link>
                            </ContactRow>
                            <ContactRow icon={<EmailIcon />} label="E-mail">
                                <Link
                                    href={`mailto:${contact.email}`}
                                    underline="hover"
                                    sx={{ wordBreak: 'break-all' }}
                                >
                                    {contact.email}
                                </Link>
                            </ContactRow>
                        </Box>
                    </Reveal>
                ))}
            </Box>
        </Box>
    </Root>
)

export default Contacts
