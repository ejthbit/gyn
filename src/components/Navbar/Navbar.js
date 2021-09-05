import Logo from '@components/Logo/Logo'
import { AppBar, Grid, makeStyles, Toolbar, Typography } from '@material-ui/core'
import { SupervisedUserCircle } from '@material-ui/icons'
import { isMobile, isTablet } from '@utilities/checkDeviceType'
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import routingPaths from 'src/routingPaths'
import MobileNavbar from './MobileNavbar'

const routes = [
    {
        text: 'Naše služby',
        link: routingPaths.services,
    },
    {
        text: 'Personál',
        link: routingPaths.employees,
    },
    {
        text: 'Ambulance',
        link: routingPaths.ambulations,
    },
    {
        text: 'Rezervace',
        link: routingPaths.reservation,
    },
    {
        text: 'Kontakt',
        link: routingPaths.contact,
    },
    {
        text: <SupervisedUserCircle />,
        link: routingPaths.login,
    },
]

const useStyles = makeStyles((theme) => ({
    navbar: {
        backgroundColor: '#b2dfdf',
        paddingBottom: 60,
        paddingTop: 40,
        marginBottom: 40,
    },
    navbarBackground: {
        '& .MuiToolbar-root': {
            paddingTop: 20,
        },
        marginTop: 40,
        height: 80,
        backgroundColor: theme.palette.primary.main,
    },
    logo: {
        '& svg': {
            height: 125,
            marginTop: -60,
            marginBottom: -60,
            '&:hover': {
                border: '0.25px solid #000',
                cursor: 'pointer',
            },
        },
    },
    menuItem: {
        '& a': {
            fontSize: 20,
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
}))

const Navbar = () => {
    const classes = useStyles()
    const location = useLocation()
    return (
        !location.pathname.match(routingPaths.admin) &&
        (isMobile() || isTablet() ? (
            <MobileNavbar routes={routes} />
        ) : (
            <AppBar className={classes.navbar} position="fixed">
                <AppBar className={classes.navbarBackground} position="fixed">
                    <Toolbar>
                        <Grid container spacing={3} alignItems="center">
                            <Grid item md={6}>
                                <NavLink to={'/'} className={classes.logo}>
                                    <Logo />
                                </NavLink>
                            </Grid>
                            <Grid container md={6} spacing={2} item alignItems="center" justifyContent="flex-end">
                                {routes.map(({ text, link }) => (
                                    <Grid key={link} item>
                                        <Typography variant="body1" className={classes.menuItem}>
                                            <NavLink to={link}>{text}</NavLink>
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </AppBar>
        ))
    )
}

export default Navbar
