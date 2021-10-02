import TransparentLogo from '@components/Logo/TransparentLogo'
import { AppBar, Box, Grid, makeStyles, Toolbar, Typography } from '@material-ui/core'
import { AccountCircleOutlined } from '@material-ui/icons'
import { isMobile } from '@utilities/checkDeviceType'
import scrollElementIntoView from '@utilities/scrollElementIntoView'
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import routingPaths from 'src/routingPaths'
import MobileNavbar from './MobileNavbar'

export const routes = [
    {
        text: 'Naše služby',
        link: routingPaths.services,
    },
    {
        text: 'Personál',
        link: routingPaths.employees,
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
        text: <AccountCircleOutlined />,
        link: routingPaths.login,
    },
]

const useStyles = makeStyles((theme) => ({
    navbarBackground: {
        '& .MuiToolbar-root': {
            paddingTop: 20,
        },
        height: 80,
        backgroundColor: theme.palette.primary.main,
    },
    logo: {
        '& svg': {
            width: '100%',
            '&:hover': {
                '& path': {
                    fill: theme.palette.common.black,
                },
                cursor: 'pointer',
            },
        },
    },
    menuItem: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
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
    offSet: { minHeight: theme.spacing(12) },
}))

const Navbar = () => {
    const classes = useStyles()
    const location = useLocation()
    return (
        !location.pathname.match(routingPaths.admin) &&
        (isMobile ? (
            <MobileNavbar routes={routes} />
        ) : (
            <>
                <AppBar className={classes.navbarBackground} position="fixed">
                    <Toolbar>
                        <Grid container spacing={3} alignItems="center">
                            <Grid item md={2}>
                                <NavLink to={'/'} className={classes.logo}>
                                    <TransparentLogo />
                                </NavLink>
                            </Grid>
                            <Grid container md={10} spacing={2} item alignItems="center" justifyContent="flex-end">
                                {routes.map(({ text, link }) => (
                                    <Grid key={link} item>
                                        <Typography variant="body1" className={classes.menuItem}>
                                            <HashLink to={link} scroll={(e) => scrollElementIntoView(e, 'smooth')}>
                                                {text}
                                            </HashLink>
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Box className={classes.offSet} />
            </>
        ))
    )
}

export default Navbar
