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
import React from 'react'
import { AMBULANCES } from '../../constants/ambulances'

const PREFIX = 'Contacts'
const classes = {
    root: `${PREFIX}-root`,
    sectionIcon: `${PREFIX}-sectionIcon`,
    sectionContent: `${PREFIX}-sectionContent`,
    ambulanceRow: `${PREFIX}-ambulanceRow`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
    [`&.${classes.root}`]: {
        paddingLeft: '15%',
        paddingRight: '15%',
        paddingBottom: '10%',
        whiteSpace: 'pre-wrap',
        '& .MuiTypography-h3': {
            marginBottom: theme.spacing(3),
            fontWeight: 'bold',
            textAlign: 'center',
            [theme.breakpoints.down('sm')]: { textAlign: 'left' },
        },
    },
    [`& .${classes.sectionIcon}`]: {
        textAlign: 'center',
        '& svg': { fontSize: 60, fill: theme.palette.primary.main },
    },
    [`& .${classes.sectionContent}`]: { textAlign: 'center' },
    [`& .${classes.ambulanceRow}`]: {
        '&:last-child': { borderTop: '1px solid #0000001f', paddingTop: theme.spacing(3) },
        marginBottom: theme.spacing(3),
    },
}))

const contactSections = [
    { id: 0, component: <Home /> },
    { id: 1, component: <LocationOnIcon /> },
    { id: 2, component: <AccessTimeIcon /> },
    { id: 3, component: <PhoneIcon /> },
]

const Contacts = () => (
    <StyledGrid className={classes.root} container spacing={2} id="contact">
        <Grid container item xs={12} className={classes.ambulanceRow} justifyContent="center">
            <Box marginBottom={2}>
                <Typography variant="h3">Kontakt</Typography>
            </Box>
            <Grid container spacing={4} alignItems="center">
                <Hidden mdDown>
                    {contactSections.map(({ id, component }) => (
                        <Grid key={id} item md={3} className={classes.sectionIcon}>
                            {component}
                        </Grid>
                    ))}
                </Hidden>
                {AMBULANCES.map(({ name, contact, openingHours, address, location }) => (
                    <Grid key={name} container justifyContent="center" className={classes.ambulanceRow}>
                        <Grid item md={3} className={classes.sectionContent}>
                            <Typography variant="h4">{name}</Typography>
                        </Grid>
                        <Grid item md={3} className={classes.sectionContent}>
                            <Typography>{address}</Typography>
                            <Box margin={1}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    endIcon={<MapIcon />}
                                    onClick={() => window.open(getGoogleMapsUrl(location))}
                                >
                                    Navigovat
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item md={3} className={classes.sectionContent}>
                            {openingHours.map(({ day, hours }) => (
                                <Box margin={1} key={`${day}-${name}`}>
                                    <Typography>
                                        {day} {hours}
                                    </Typography>
                                </Box>
                            ))}
                        </Grid>
                        <Grid item md={3} className={classes.sectionContent}>
                            <Typography>{contact.email}</Typography>
                            <Typography>{contact.phone}</Typography>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    </StyledGrid>
)

export default Contacts
