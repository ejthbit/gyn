import { makeStyles, Box, Typography } from '@material-ui/core'
import { Contacts, WatchLater, Home } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        color: '#000',
        borderRadius: 6,
        background: '#FFF',
        backgroundClip: 'border-box',
        boxShadow: '20px 0 60px 45px #96969617',
        border: '1px solid rgba(71,75,96,.15)!important',
        padding: '16px',
        '& .MuiTypography-h5': {
            marginBottom: theme.spacing(1.5),
        },
        '& .MuiTypography-body2': {
            color: '#8f8f8f',
        },
    },
    name: {
        textAlign: 'center',
        marginBottom: 10,
    },
    sectionBox: {
        display: 'flex',
        margin: '16px',
        borderRadius: 6,
        boxShadow: '5px 5px 6px 1px #96969617',
        padding: '8px',
        alignItems: 'center',
    },
    addressBox: {
        margin: '16px',
        borderRadius: 6,
        boxShadow: '10px 0px 6px 1px #96969617',
        padding: '8px',
    },
    icon: {
        paddingRight: '8px',
    },
}))

const Contact = ({ name, contact, openingHours, address, map }) => {
    const classes = useStyles()

    return (
        <Box className={classes.root}>
            <Typography variant="h5" className={classes.name}>
                {name}
            </Typography>
            <Box className={classes.sectionBox}>
                <Box width="50%" display="flex" alignItems="center">
                    <Contacts className={classes.icon} color="primary" fontSize="large" />
                    <Typography variant="h6">Kontakt</Typography>
                </Box>
                <Box width="50%">
                    <Typography>Telefon</Typography>
                    <Typography variant="body2">{contact.phone}</Typography>
                    <Typography>Email</Typography>
                    <Typography variant="body2">{contact.email}</Typography>
                </Box>
            </Box>
            <Box className={classes.sectionBox} height="120px">
                <Box width="50%" display="flex" alignItems="center">
                    <WatchLater className={classes.icon} color="primary" fontSize="large" />
                    <Typography variant="h6">Otevírací hodiny</Typography>
                </Box>
                <Box width="50%">
                    {openingHours.map((day) => (
                        <Typography variant="body2" key={day.day}>{`${day.day}: ${day.hours}`}</Typography>
                    ))}
                </Box>
            </Box>
            <Box className={classes.addressBox}>
                <Box display="flex" alignItems="center">
                    <Box width="50%" display="flex" alignItems="center">
                        <Home className={classes.icon} color="primary" fontSize="large" />
                        <Typography variant="h6">Adresa</Typography>
                    </Box>

                    <Box width="50%">
                        <Typography variant="body2">{`${address.street}, ${address.postalCode} ${address.city}`}</Typography>
                    </Box>
                </Box>

                <Box paddingTop="16px">{map}</Box>
            </Box>
        </Box>
    )
}
Contact.propTypes = {
    name: PropTypes.string,
    contact: PropTypes.object,
    openingHours: PropTypes.array,
    address: PropTypes.object,
    map: PropTypes.node,
}

export default Contact
