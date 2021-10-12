import ContactForm from '@components/Contacts/ContactForm'
import TransparentLogo from '@components/Logo/TransparentLogo'
import { routes } from '@components/Navbar/Navbar'
import { Box, Divider, Grid, Hidden, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import scrollElementIntoView from '@utilities/scrollElementIntoView'
import { equals } from 'ramda'
import React from 'react'
import { HashLink } from 'react-router-hash-link'

const PREFIX = 'Footer'

const classes = {
    root: `${PREFIX}-root`,
    menuItemContainer: `${PREFIX}-menuItemContainer`,
    menuItem: `${PREFIX}-menuItem`,
    logoContainer: `${PREFIX}-logoContainer`,
    copyright: `${PREFIX}-copyright`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
    [`&.${classes.root}`]: {
        background: '#103c3a',
        color: 'white',
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6),
        paddingTop: theme.spacing(3),
        '& .MuiDivider-root': {
            backgroundColor: 'grey',
        },
    },

    [`& .${classes.menuItemContainer}`]: {
        marginBottom: theme.spacing(1),
    },

    [`& .${classes.menuItem}`]: {
        '& a': {
            color: theme.palette.common.white,
            textDecoration: 'none',
            '&:hover': {
                color: '#000',
                borderBottom: '1px solid black',
            },
        },
        '& svg': {
            paddingTop: theme.spacing(0.5),
            height: 27,
        },
    },

    [`& .${classes.logoContainer}`]: {
        marginTop: theme.spacing(2),
        '& svg': {
            width: '50%',
            maxWidth: 280,
        },
    },

    [`& .${classes.copyright}`]: {
        textAlign: 'center',
    },
}))

const Footer = () => {
    return (
        <StyledGrid className={classes.root} container spacing={2} justifyContent="center">
            <Grid item container xs={12} spacing={2} alignContent="center">
                <Grid item xs={12} md={4}>
                    <Typography variant="body1" color="primary">
                        MUDr. Miroslav Vaněk
                        <br />
                        Gynekologická ambulance s.r.o.
                        <br />
                        <br />
                    </Typography>
                    <Typography variant="body2">
                        Pobočka Frýdek-Místek
                        <br />
                        tř. T. G. Masaryka 602, 738 01 Frýdek-Místek
                        <br />
                        +420 558 632 133
                        <br />
                        <br />
                        Pobočka Šenov
                        <br />
                        Vráclavská 1281, 739 34 Šenov
                        <br />
                        +420 605 414 988
                    </Typography>
                    <Box className={classes.logoContainer}>
                        <TransparentLogo />
                    </Box>
                </Grid>
                <Grid item xs={12} md={1}>
                    <Typography variant="body1" color="primary" className={classes.menuItemContainer}>
                        Mapa webu
                    </Typography>
                    {routes.map(
                        ({ text, link }) =>
                            equals(typeof text, 'string') && (
                                <Grid key={link} item className={classes.menuItemContainer}>
                                    <Typography variant="body2" className={classes.menuItem}>
                                        <HashLink to={link} scroll={(e) => scrollElementIntoView(e, 'smooth')}>
                                            {text}
                                        </HashLink>
                                    </Typography>
                                </Grid>
                            )
                    )}
                </Grid>
                <Hidden mdDown>
                    <Divider variant="middle" orientation="vertical" />
                </Hidden>
                <Grid item xs={12} md={6}>
                    <ContactForm />
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.copyright}>
                <Typography variant="caption">
                    {`Copyright © ${new Date().getFullYear()} ejthbit. All rights reserved.`}
                </Typography>
            </Grid>
        </StyledGrid>
    )
}

export default Footer
