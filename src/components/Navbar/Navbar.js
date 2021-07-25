import React from 'react'
import { AppBar, Grid, makeStyles, Toolbar, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import routingPaths from 'src/routingPaths'
import { BorderBottom } from '@material-ui/icons'

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
]
const useStyles = makeStyles(() => ({
    navbar: {
        paddingBottom: 20,
        paddingTop: 20,
    },
    logo: {
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase',
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
    },
}))
const Navbar = () => {
    const classes = useStyles()
    return (
        <AppBar className={classes.navbar} position="static" color="primary">
            <Toolbar>
                <Grid container spacing={3} alignItems="center">
                    <Grid item md={7}>
                        <Typography className={classes.logo} variant="h5">
                            Gynekologie Vaněk
                        </Typography>
                    </Grid>
                    {routes.map(({ text, link }) => (
                        <Grid key={link} item>
                            <Typography variant="body1" className={classes.menuItem}>
                                <Link to={link}>{text}</Link>
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
