import {
    AccessTime as AccessTimeIcon,
    Home,
    LocationOn as LocationOnIcon,
    Map as MapIcon,
    Phone as PhoneIcon,
} from '@mui/icons-material'
import { Box, Button, Grid, Hidden, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import getGoogleMapsUrl from '@utilities/getGoogleMapsUrl'
import { map } from 'ramda'
import React from 'react'

const PREFIX = 'Contacts'

const classes = {
    root: `${PREFIX}-root`,
    sectionIcon: `${PREFIX}-sectionIcon`,
    sectionContent: `${PREFIX}-sectionContent`,
    ambulanceRow: `${PREFIX}-ambulanceRow`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
    [`&.${classes.root}`]: {
        // display: 'block',
        paddingLeft: '15%',
        paddingRight: '15%',
        paddingBottom: '10%',
        whiteSpace: 'pre-wrap',
        '& .MuiTypography-h3': {
            marginBottom: theme.spacing(3),
            fontWeight: 'bold',
            textAlign: 'center',
            [theme.breakpoints.down('sm')]: {
                textAlign: 'left',
            },
        },
    },

    [`& .${classes.sectionIcon}`]: {
        textAlign: 'center',

        '& svg': {
            fontSize: 60,
            fill: theme.palette.primary.main,
        },
    },

    [`& .${classes.sectionContent}`]: {
        textAlign: 'center',
    },

    [`& .${classes.ambulanceRow}`]: {
        '&:last-child': {
            borderTop: '1px solid #0000001f',
            paddingTop: theme.spacing(3),
        },
        marginBottom: theme.spacing(3),
    },
}))
// TODO: Get from DB
const ambulances = [
    {
        name: 'Frýdek-Místek',
        contact: { email: 'frydek@vanek-gynekologie.cz', phone: '558 632 133' },
        openingHours: [
            { day: 'Pondělí', hours: '7:00 - 18:00' },
            { day: 'Úterý', hours: '16:00 - 19:00' },
            { day: 'Středa', hours: '7:00 - 12:00' },
            { day: 'Čtvrtek', hours: '7:00 - 12:00' },
            { day: 'Pátek', hours: '7:00 - 13:00' },
        ],
        address: 'tř. T. G. Masaryka 602, Frýdek, 738 01 Frýdek-Místek',
        location: {
            lat: 49.682070168115054,
            lon: 18.355730831002795,
        },
    },
    {
        name: 'Šenov',
        contact: { email: 'senov@vanek-gynekologie.cz', phone: '605 414 988' },
        openingHours: [
            { day: 'Úterý', hours: '7:00 - 17:00' },
            { day: 'Čtvrtek', hours: '12:00 - 16:00' },
        ],
        address: 'Vráclavská 1281, 739 34 Šenov',
        location: { lat: 49.78586251191306, lon: 18.371343152159852 },
    },
]

const contactSections = [
    { id: 0, component: <Home /> },
    { id: 1, component: <LocationOnIcon /> },
    { id: 2, component: <AccessTimeIcon /> },
    { id: 3, component: <PhoneIcon /> },
]
const handleOpenNavigation = (location) => window.open(getGoogleMapsUrl(location))

const Contacts = () => {
    return (
        <StyledGrid className={classes.root} container spacing={2} id="contact">
            <Grid container item xs={12} className={classes.ambulanceRow} justifyContent="center">
                <Box marginBottom={2}>
                    <Typography variant="h3">Kontakt</Typography>
                </Box>
                <Grid container spacing={4} alignItems="center">
                    <Hidden mdDown>
                        {map(
                            ({ id, component }) => (
                                <Grid key={id} item md={3} className={classes.sectionIcon}>
                                    {component}
                                </Grid>
                            ),
                            contactSections
                        )}
                    </Hidden>
                    {map(
                        ({ name, contact, openingHours, address, location }) => (
                            <Grid key={name} container justifyContent="center" className={classes.ambulanceRow}>
                                <Grid item md={3} className={classes.sectionContent}>
                                    <Typography variant="h4"> {name}</Typography>
                                </Grid>
                                <Grid item md={3} className={classes.sectionContent}>
                                    <Typography> {address}</Typography>
                                    <Box margin={1}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            endIcon={<MapIcon />}
                                            onClick={() => handleOpenNavigation(location)}
                                        >
                                            Navigovat
                                        </Button>
                                    </Box>
                                </Grid>
                                <Grid item md={3} className={classes.sectionContent}>
                                    {map(
                                        ({ day, hours }) => (
                                            <Box margin={1} key={`${day}-${name}`}>
                                                <Typography>
                                                    {day} {hours}
                                                </Typography>
                                            </Box>
                                        ),
                                        openingHours
                                    )}
                                </Grid>
                                <Grid item md={3} className={classes.sectionContent}>
                                    <Typography> {contact.email}</Typography>
                                    <Typography> {contact.phone}</Typography>
                                </Grid>
                            </Grid>
                        ),
                        ambulances
                    )}
                </Grid>
            </Grid>
        </StyledGrid>
    )
}
Contacts.propTypes = {}

export default Contacts
