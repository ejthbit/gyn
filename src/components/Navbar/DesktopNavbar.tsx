import { AppBar, Box, Grid, Toolbar, Typography } from '@mui/material'
import { darken, styled } from '@mui/material/styles'

import { Link, useMatchRoute } from '@tanstack/react-router'
import React from 'react'
import routingPaths from '../../routingPaths'
import MobileNavbar from './MobileNavbar'
import { isMobile, scrollElementIntoView } from '../../utils'
import TransparentLogo from '../Logo/TransparentLogo'
const PREFIX = 'Navbar'

const classes = {
    navbarBackground: `${PREFIX}-navbarBackground`,
    logo: `${PREFIX}-logo`,
    menuItem: `${PREFIX}-menuItem`,
    offSet: `${PREFIX}-offSet`,
}

const Root = styled('div')(({ theme }) => ({
    [`& .${classes.navbarBackground}`]: {
        '& .MuiToolbar-root': {
            paddingTop: 20,
        },
        boxShadow: 'none',
        height: 80,
        backgroundColor: '#C0ECED',
    },

    [`& .${classes.logo}`]: {
        '& svg': {
            width: '100%',
            maxWidth: 280,
            '& path': {
                fill: '#000',
            },
            '&:hover': {
                '& path': {
                    fill: 'grey',
                },
                cursor: 'pointer',
            },
        },
    },

    [`& .${classes.menuItem}`]: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        '& a': {
            fontSize: 20,
            color: darken(theme.palette.primary.main, 0.2),
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

    [`& .${classes.offSet}`]: { minHeight: theme.spacing(12) },
}))

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
]

export const Navbar = () => {
    const matchRoute = useMatchRoute()
    return (
        <Box width="100%">
            {!matchRoute({ to: routingPaths.admin }) &&
                (isMobile ? (
                    <MobileNavbar routes={routes} />
                ) : (
                    <Root>
                        <AppBar className={classes.navbarBackground} position="fixed">
                            <Toolbar>
                                <Grid container spacing={3} alignItems="center">
                                    <Grid item md={2}>
                                        <Link to={'/'} className={classes.logo}>
                                            <TransparentLogo />
                                        </Link>
                                    </Grid>
                                    <Grid
                                        container
                                        md={10}
                                        spacing={2}
                                        item
                                        alignItems="center"
                                        justifyContent="flex-end"
                                    >
                                        {routes.map(({ text, link }) => (
                                            <Grid key={link} item>
                                                <Typography variant="body1" className={classes.menuItem}>
                                                    <Link
                                                        to="/"
                                                        hash={link}
                                                        onScroll={(e) => scrollElementIntoView(e, 'smooth')}
                                                    >
                                                        {text}
                                                    </Link>
                                                </Typography>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>
                            </Toolbar>
                        </AppBar>
                    </Root>
                ))}
        </Box>
    )
}
