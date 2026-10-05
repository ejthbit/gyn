import TransparentLogo from '@components/Logo/TransparentLogo'
import { AccountCircleOutlined } from '@mui/icons-material'
import { AppBar, Box, Toolbar, Typography, useScrollTrigger } from '@mui/material'
import { lighten, styled, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import routingPaths from '../../routingPaths'
import MobileNavbar from './MobileNavbar'
import NavRouteLink from './NavRouteLink'

const PREFIX = 'Navbar'
const classes = {
    appBar: `${PREFIX}-appBar`,
    toolbar: `${PREFIX}-toolbar`,
    logo: `${PREFIX}-logo`,
    menu: `${PREFIX}-menu`,
    menuItem: `${PREFIX}-menuItem`,
    login: `${PREFIX}-login`,
    offSet: `${PREFIX}-offSet`,
}

export const NAVBAR_HEIGHT = 80

const Root = styled('div')(({ theme }) => ({
    [`& .${classes.appBar}`]: {
        // Same tint as the landing hero so the bar blends into it until the page scrolls.
        backgroundColor: lighten(theme.palette.primary.main, 0.94),
        color: theme.palette.text.primary,
        transition: theme.transitions.create('box-shadow'),
    },
    [`& .${classes.toolbar}`]: {
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        minHeight: NAVBAR_HEIGHT,
        paddingLeft: '5%',
        paddingRight: '5%',
    },
    [`& .${classes.logo}`]: {
        display: 'flex',
        width: 'clamp(170px, 17vw, 250px)',
        '& svg': { width: '100%' },
        '& path': { fill: theme.palette.primary.main, transition: theme.transitions.create('fill') },
        '&:hover path': { fill: theme.palette.primary.dark },
    },
    [`& .${classes.menu}`]: {
        display: 'flex',
        gap: theme.spacing(4),
        [theme.breakpoints.up('lg')]: { gap: theme.spacing(8) },
    },
    [`& .${classes.menuItem}`]: {
        '& a': {
            fontSize: 18,
            color: 'inherit',
            textDecoration: 'none',
            paddingBottom: theme.spacing(0.5),
            borderBottom: '2px solid transparent',
            transition: theme.transitions.create(['color', 'border-color']),
            '&:hover': { color: theme.palette.primary.main, borderBottomColor: theme.palette.primary.main },
        },
    },
    [`& .${classes.login}`]: {
        justifySelf: 'end',
        '& a': { display: 'flex', color: theme.palette.primary.main, '&:hover': { color: theme.palette.primary.dark } },
        '& svg': { fontSize: 32 },
    },
    [`& .${classes.offSet}`]: { minHeight: NAVBAR_HEIGHT },
}))

export const routes = [
    { text: 'Naše služby', link: routingPaths.services },
    { text: 'Personál', link: routingPaths.employees },
    { text: 'Rezervace', link: routingPaths.reservation },
    { text: 'Kontakt', link: routingPaths.contact },
    { text: <AccountCircleOutlined titleAccess="Přihlášení" />, link: routingPaths.login },
]

const Navbar = () => {
    const location = useLocation()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const isScrolled = useScrollTrigger({ disableHysteresis: true, threshold: 0 })

    if (location.pathname.startsWith(routingPaths.admin)) return null

    return isMobile ? (
        <MobileNavbar routes={routes} />
    ) : (
        <Root>
            <AppBar className={classes.appBar} position="fixed" elevation={isScrolled ? 4 : 0}>
                <Toolbar className={classes.toolbar} disableGutters>
                    <NavLink to="/" className={classes.logo} aria-label="Úvodní stránka">
                        <TransparentLogo />
                    </NavLink>
                    <Box component="nav" className={classes.menu}>
                        {routes.map(
                            ({ text, link }) =>
                                typeof text === 'string' && (
                                    <Typography key={link} variant="body1" className={classes.menuItem}>
                                        <NavRouteLink link={link}>{text}</NavRouteLink>
                                    </Typography>
                                )
                        )}
                    </Box>
                    <Box className={classes.login}>
                        <HashLink to={routingPaths.login} aria-label="Přihlášení">
                            <AccountCircleOutlined />
                        </HashLink>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box className={classes.offSet} />
        </Root>
    )
}

export default Navbar
