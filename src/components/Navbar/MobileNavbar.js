import TransparentLogo from '@components/Logo/TransparentLogo'
import { Close as CloseIcon, Menu as MenuIcon } from '@mui/icons-material'
import { AppBar, Box, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import MuiDrawer from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'
import scrollElementIntoView from '@utilities/scrollElementIntoView'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

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
            '& path': {
                fill: `${theme.palette.common.black} !important`,
            },
        },
    },
    [`& .${classes.root}`]: {
        boxShadow: 'none',
        backgroundColor: 'transparent',
    },

    [`& .${classes.toolbar}`]: {
        background: '#f8f8f8',
        paddingTop: theme.spacing(2),
    },

    [`& .${classes.offSet}`]: { minHeight: theme.spacing(12) },
}))

const StyledDrawer = styled(MuiDrawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        width: '100%',
        textAlign: 'center',
        '& a': {
            '& svg': {
                width: '80%',
                padding: theme.spacing(1),
                '& path': {
                    fill: `${theme.palette.common.black} !important`,
                },
            },
        },
    },
    [`& .${classes.menuItem}`]: {
        padding: theme.spacing(1.5),
        '& a': {
            fontSize: 20,
            color: theme.palette.common.black,
            textDecoration: 'none',
            '&:hover': {
                color: '#000',
                borderBottom: '1px solid black',
            },
        },
        '& .MuiSvgIcon-root': {
            height: 27,
            padding: theme.spacing(0.5, 0, 0, 0),
        },
    },
}))

const MobileNavbar = ({ routes }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const handleToggleDrawer = () => setIsDrawerOpen((prevState) => !prevState)

    return (
        <Root>
            <AppBar position="fixed" className={classes.root}>
                <Toolbar className={classes.toolbar}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item xs={6}>
                            <NavLink to={'/'} className={classes.logo}>
                                <TransparentLogo />
                            </NavLink>
                        </Grid>
                        <Grid item container xs={3} direction="column">
                            <IconButton onClick={handleToggleDrawer} size="large">
                                <MenuIcon />
                                <Box marginLeft={0.5}>
                                    <Typography>Menu</Typography>
                                </Box>
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
                        <NavLink to={'/'} className={classes.drawerLogo} onClick={handleToggleDrawer}>
                            <TransparentLogo />
                        </NavLink>
                        {routes.map(({ text, link }) => (
                            <Grid key={link} item onClick={handleToggleDrawer}>
                                <Typography variant="body1" className={classes.menuItem}>
                                    <HashLink to={link} scroll={(e) => scrollElementIntoView(e, 'smooth')}>
                                        {text}
                                    </HashLink>
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

MobileNavbar.propTypes = {
    routes: PropTypes.array,
}

export default MobileNavbar
