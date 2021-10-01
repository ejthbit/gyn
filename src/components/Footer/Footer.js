import ContactForm from '@components/Contacts/ContactForm'
import Logo from '@components/Logo/Logo'
import { routes } from '@components/Navbar/Navbar'
import { Box, Divider, Grid, Hidden, makeStyles, Typography } from '@material-ui/core'
import scrollElementIntoView from '@utilities/scrollElementIntoView'
import { equals } from 'ramda'
import React from 'react'
import { HashLink } from 'react-router-hash-link'

const useStyles = makeStyles((theme) => ({
    root: {
        background: '#103c3a',
        color: 'white',
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6),
        paddingTop: theme.spacing(3),
        '& .MuiDivider-root': {
            backgroundColor: 'grey',
        },
    },
    menuItemContainer: {
        marginBottom: theme.spacing(1),
    },
    menuItem: {
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
    copyright: {
        textAlign: 'center',
    },
}))

const Footer = () => {
    const classes = useStyles()
    return (
        <Grid className={classes.root} container spacing={2} justifyContent="center">
            <Grid item container xs={12} spacing={2} alignContent="center">
                <Grid item xs={12} md={3}>
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
                </Grid>
                <Hidden smDown>
                    <Divider variant="middle" orientation="vertical" />
                </Hidden>
                <Grid item xs={12} md={7}>
                    <ContactForm />
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
            </Grid>
            <Grid item xs={12} className={classes.copyright}>
                <Typography variant="caption">
                    {`Copyright © ${new Date().getFullYear()} ejthbit. All rights reserved.`}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Footer
