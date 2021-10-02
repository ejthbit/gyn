import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { AppBar, Box, Drawer, Grid, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core'
import { Menu as MenuIcon, Close as CloseIcon } from '@material-ui/icons'
import { NavLink } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import scrollElementIntoView from '@utilities/scrollElementIntoView'
import TransparentLogo from '@components/Logo/TransparentLogo'

const useStyles = makeStyles((theme) => ({
    logo: {
        '& svg': {
            padding: theme.spacing(1),
            '& path': {
                fill: `${theme.palette.common.black} !important`,
            },
        },
    },
    drawerLogo: {
        '& svg': {
            width: '80%',
            padding: theme.spacing(1),
            '& path': {
                fill: `${theme.palette.common.black} !important`,
            },
        },
    },
    drawer: {
        '& .MuiDrawer-paper': {
            width: '85%',
            textAlign: 'center',
        },
    },
    root: {
        boxShadow: 'none',
        backgroundColor: 'transparent',
    },
    toolbar: {
        background: '#f8f8f8',
        paddingTop: theme.spacing(2),
    },
    menuItem: {
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
        '& svg': {
            paddingTop: theme.spacing(0.5),
            height: 27,
        },
    },
    offSet: { minHeight: theme.spacing(12) },
}))

const MobileNavbar = ({ routes }) => {
    const classes = useStyles()
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const handleToggleDrawer = () => setIsDrawerOpen((prevState) => !prevState)

    return (
        <>
            <AppBar position="fixed" className={classes.root}>
                <Toolbar className={classes.toolbar}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item xs={6}>
                            <NavLink to={'/'} className={classes.logo}>
                                <TransparentLogo />
                            </NavLink>
                        </Grid>
                        <Grid item container xs={3} direction="column">
                            <IconButton onClick={handleToggleDrawer}>
                                <MenuIcon />
                                <Box marginLeft={0.5}>
                                    <Typography>Menu</Typography>
                                </Box>
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Drawer anchor="right" open={isDrawerOpen} onClose={handleToggleDrawer} className={classes.drawer}>
                        <IconButton onClick={handleToggleDrawer}>
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
                    </Drawer>
                </Toolbar>
            </AppBar>
            <Box className={classes.offSet} />
        </>
    )
}

MobileNavbar.propTypes = {
    routes: PropTypes.array,
}

export default MobileNavbar
