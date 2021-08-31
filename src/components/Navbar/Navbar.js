import { AppBar, Grid, makeStyles, Toolbar, Typography } from '@material-ui/core'
import { SupervisedUserCircle } from '@material-ui/icons'
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import routingPaths from 'src/routingPaths'

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
        text: 'Kontakt',
        link: routingPaths.contact,
    },
    {
        text: 'Rezervace',
        link: routingPaths.reservation,
    },
    {
        text: <SupervisedUserCircle />,
        link: routingPaths.login,
    },
]
const useStyles = makeStyles((theme) => ({
    navbar: {
        paddingBottom: 20,
        paddingTop: 20,
        marginBottom: 40,
    },
    logo: {
        '& a': {
            color: '#FFF',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            textDecoration: 'none',
            '&:hover': {
                color: '#000',
                cursor: 'pointer',
            },
        },
    },
    menuItem: {
        '& a': {
            fontSize: 20,
            color: '#FFF',
            textDecoration: 'none',
            '&:hover': {
                color: '#000',
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
        !location.pathname.match(routingPaths.admin) && (
            <AppBar className={classes.navbar} position="static" color="primary">
                <Toolbar>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item md={6}>
                            <Typography className={classes.logo} variant="h5">
                                <NavLink to={'/'}>Gynekologie Vaněk</NavLink>
                            </Typography>
                        </Grid>
                        <Grid container md={6} spacing={3} item alignItems="center" justifyContent="flex-end">
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
        )
    )
}

export default Navbar
