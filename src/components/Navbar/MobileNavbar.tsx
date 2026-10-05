import TransparentLogo from '@components/Logo/TransparentLogo'
import { Close as CloseIcon, Menu as MenuIcon } from '@mui/icons-material'
import { AppBar, Box, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import MuiDrawer from '@mui/material/Drawer'
import { lighten, styled } from '@mui/material/styles'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import NavRouteLink from './NavRouteLink'

type Route = { text: React.ReactNode; link: string }

type MobileNavbarProps = {
    routes: Route[]
}

export const MOBILE_NAVBAR_HEIGHT = 96

const PREFIX = 'MobileNavbar'
const classes = {
    logo: `${PREFIX}-logo`,
    drawerLogo: `${PREFIX}-drawerLogo`,
    drawerRoot: `${PREFIX}-drawer`,
    root: `${PREFIX}-root`,
    toolbar: `${PREFIX}-toolbar`,
    menuItem: `${PREFIX}-menuItem`,
    offSet: `${PREFIX}-offSet`,
}

const Root = styled('div')(({ theme }) => ({
    [`& .${classes.logo}`]: {
        '& svg': {
            padding: theme.spacing(1),
            '& path': { fill: `${theme.palette.primary.main} !important` },
        },
    },
    [`& .${classes.root}`]: { boxShadow: 'none', backgroundColor: 'transparent' },
    [`& .${classes.toolbar}`]: {
        // Same tint as the landing hero.
        background: lighten(theme.palette.primary.main, 0.94),
        paddingTop: theme.spacing(2),
    },
    // Spacer is taller than the toolbar; tint it so no white strip shows above the hero.
    [`& .${classes.offSet}`]: {
        minHeight: MOBILE_NAVBAR_HEIGHT,
        background: lighten(theme.palette.primary.main, 0.94),
    },
}))

const StyledDrawer = styled(MuiDrawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        width: '100%',
        textAlign: 'center',
        '& a': {
            '& svg': {
                width: '80%',
                padding: theme.spacing(1),
                '& path': { fill: `${theme.palette.primary.main} !important` },
            },
        },
    },
    [`& .${classes.menuItem}`]: {
        padding: theme.spacing(1.5),
        '& a': {
            fontSize: 20,
            color: theme.palette.text.primary,
            textDecoration: 'none',
            '&:hover': { color: theme.palette.primary.main, borderBottom: `2px solid ${theme.palette.primary.main}` },
        },
        '& .MuiSvgIcon-root': { height: 27, padding: theme.spacing(0.5, 0, 0, 0) },
    },
}))

const MobileNavbar = ({ routes }: MobileNavbarProps) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const handleToggleDrawer = () => setIsDrawerOpen((prev) => !prev)

    return (
        <Root>
            <AppBar position="fixed" className={classes.root}>
                <Toolbar className={classes.toolbar}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item xs={6}>
                            <NavLink to="/" className={classes.logo}>
                                <TransparentLogo />
                            </NavLink>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleToggleDrawer} size="large" color="primary" aria-label="Menu">
                                <MenuIcon fontSize="large" />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <StyledDrawer
                        anchor="right"
                        open={isDrawerOpen}
                        onClose={handleToggleDrawer}
                        className={classes.drawerRoot}
                    >
                        <IconButton onClick={handleToggleDrawer} size="large">
                            <CloseIcon />
                        </IconButton>
                        <NavLink to="/" className={classes.drawerLogo} onClick={handleToggleDrawer}>
                            <TransparentLogo />
                        </NavLink>
                        {routes.map(({ text, link }) => (
                            <Grid key={link} item onClick={handleToggleDrawer}>
                                <Typography variant="body1" className={classes.menuItem}>
                                    <NavRouteLink link={link}>{text}</NavRouteLink>
                                </Typography>
                            </Grid>
                        ))}
                    </StyledDrawer>
                </Toolbar>
            </AppBar>
            <Box className={classes.offSet} />
        </Root>
    )
}

export default MobileNavbar
