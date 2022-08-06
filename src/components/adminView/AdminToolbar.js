import AmbulanceSelect from '@components/AmbulanceSelect/AmbulanceSelect'
import TransparentLogo from '@components/Logo/TransparentLogo'
import { ArrowBack, ArrowForward, DateRange, Event, ExitToApp, Home, Schedule } from '@mui/icons-material'
import {
    AppBar,
    Box,
    Divider,
    Drawer,
    Fab,
    Fade,
    Grid,
    Hidden,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import isNilOrEmpty from '@utilities/isNilOrEmpty'
import SM from '@utilities/StorageManager'
import { equals, map } from 'ramda'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { adminPaths } from 'src/routingPaths'
import { logout } from 'src/store/administration/administrationSlice'
import { getUser } from 'src/store/administration/selectors'
import { setSelectedAmbulance } from 'src/store/reservationProcess/reservationProcessSlice'
import {
    getSelectedAmbulance,
    makeArrayOfValueLabelAmbulances,
    getBookingCategories,
} from 'src/store/reservationProcess/selectors'
import { fetchBookingCategories } from 'src/store/reservationProcess/actions'

const PREFIX = 'AdminToolbar'

const classes = {
    root: `${PREFIX}-root`,
    openDrawerIcon: `${PREFIX}-openDrawerIcon`,
    appBar: `${PREFIX}-appBar`,
    title: `${PREFIX}-title`,
    drawer: `${PREFIX}-drawer`,
    drawerPaper: `${PREFIX}-drawerPaper`,
    drawerHeader: `${PREFIX}-drawerHeader`,
    drawerListItem: `${PREFIX}-drawerListItem`,
    logOutIcon: `${PREFIX}-logOutIcon`,
    ambulanceSelect: `${PREFIX}-ambulanceSelect`,
    headerContent: `${PREFIX}-headerContent`,
    logoContainer: `${PREFIX}-logoContainer`,
}

const Root = styled('div')(({ theme, $isDrawerOpen }) => ({
    [`& .${classes.root}`]: {
        flexGrow: 1,
        color: '#000',
        backgroundColor: '#FFF',
        boxShadow: 'none',
    },

    [`& .${classes.openDrawerIcon}`]: {
        position: 'fixed',
        bottom: theme.spacing(1),
        left: theme.spacing(1),
        cursor: 'pointer',
        '& svg': {
            color: theme.palette.common.white,
        },
    },

    [`& .${classes.appBar}`]: {
        marginLeft: 200,
        [theme.breakpoints.down('md')]: {
            marginLeft: $isDrawerOpen ? 60 : 8,
        },
    },
    [`& .${classes.title}`]: {
        flexGrow: 1,
    },

    [`& .${classes.drawer}`]: {
        width: 200,
        [theme.breakpoints.down('md')]: {
            width: 60,
        },
        flexShrink: 0,
    },

    [`& .${classes.drawerPaper}`]: {
        width: 200,
        [theme.breakpoints.down('md')]: {
            width: 60,
        },
        backgroundColor: theme.palette.primary.dark,
    },

    [`& .${classes.drawerHeader}`]: {
        textDecoration: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        color: '#FFF',
        padding: theme.spacing(2),
        minHeight: theme.spacing(4),
        [theme.breakpoints.down('md')]: {
            minHeight: theme.spacing(3),
        },
        '&:hover': {
            color: '#000',
        },
    },

    [`& .${classes.drawerListItem}`]: {
        paddingBottom: theme.spacing(2),
        paddingTop: theme.spacing(2),
        '& svg': {
            color: '#FFF',
        },
        [theme.breakpoints.down('md')]: {
            '& .MuiTypography-root': {
                display: 'none',
            },
        },
        color: '#FFF',
    },

    [`& .${classes.logOutIcon}`]: {
        marginTop: theme.spacing(1),
        [theme.breakpoints.up('md')]: {
            marginTop: theme.spacing(1),
        },
        cursor: 'pointer',
        '&:hover': {
            color: theme.palette.primary.main,
        },
    },

    [`& .${classes.ambulanceSelect}`]: {
        flexFlow: 'row',
        '& .MuiInputBase-root': {
            height: theme.spacing(3),
        },
        '& .MuiSelect-selectMenu': {
            '&:focus': {
                backgroundColor: 'transparent',
            },
            height: theme.spacing(3),
        },
        [theme.breakpoints.down('md')]: {
            flexFlow: 'column',
            '& .MuiInputBase-root': {
                textAlign: 'center',
            },
        },
    },

    [`& .${classes.headerContent}`]: {
        [theme.breakpoints.down('md')]: {
            justifyContent: 'center',
        },
    },

    [`& .${classes.logoContainer}`]: {
        marginTop: theme.spacing(2),
        '& svg': {
            width: '100%',
        },
    },
}))

const adminToolbarContent = [
    { id: 1, icon: <Event />, text: 'Objednávky', link: adminPaths.orders },
    { id: 2, icon: <Schedule />, text: 'Rozpis směn', link: adminPaths.doctorServices },
    { id: 3, icon: <DateRange />, text: 'Kalendař', link: adminPaths.calendar },
]

const selectAmbulancesValueLabelPair = makeArrayOfValueLabelAmbulances()
const AdminToolbar = ({ isDrawerOpen, handleOpenDrawer }) => {
    const dispatch = useDispatch()
    const loggedUser = useSelector(getUser)
    const ambulances = useSelector(selectAmbulancesValueLabelPair)
    const selectedAmbulanceId = useSelector(getSelectedAmbulance)
    const bookingCategories = useSelector(getBookingCategories)
    const [selectedItem, setSelectedItem] = useState('Administrace')

    const handleLogout = (e) => {
        SM.clearLSStorage(e)
        dispatch(logout())
    }

    useEffect(() => {
        if (loggedUser && !isNilOrEmpty(ambulances) && isNilOrEmpty(selectedAmbulanceId))
            dispatch(setSelectedAmbulance(loggedUser?.default_workplace))
    }, [loggedUser, ambulances])

    useEffect(() => {
        if (isNilOrEmpty(bookingCategories)) dispatch(fetchBookingCategories())
    }, [])

    return (
        <Root $isDrawerOpen={isDrawerOpen}>
            <AppBar position="static" className={classes.root} color="primary">
                <Toolbar className={classes.appBar}>
                    <Grid container spacing={2} alignItems="center" className={classes.headerContent}>
                        <Grid item md={5}>
                            <Typography variant="h6" className={classes.title}>
                                Administrace
                            </Typography>
                        </Grid>
                        <Grid
                            container
                            item
                            md={7}
                            justifyContent="flex-end"
                            direction="row"
                            alignItems="center"
                            spacing={2}
                        >
                            <Grid item container md={5} alignItems="center" className={classes.ambulanceSelect}>
                                <AmbulanceSelect variant="outlined" label="Vybraná ambulance:" />
                            </Grid>
                            <Grid item>
                                <Box marginRight={3}>
                                    <Typography>{`Vítejte, ${loggedUser?.name}`} </Typography>
                                </Box>
                            </Grid>
                            <Grid item md={1}>
                                <ExitToApp className={classes.logOutIcon} onClick={handleLogout} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {isDrawerOpen ? (
                <Fade in timeout={1200}>
                    <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        anchor="left"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <Box className={classes.drawerHeader} component={Link} to={'/'}>
                            <Hidden mdDown>
                                <Box className={classes.logoContainer}>
                                    <TransparentLogo />
                                </Box>
                            </Hidden>
                            <Hidden mdUp>
                                <Home />
                            </Hidden>
                        </Box>
                        <Divider />
                        <List disablePadding>
                            {map(
                                ({ id, icon, text, link }) => (
                                    <ListItem
                                        className={classes.drawerListItem}
                                        button
                                        component={Link}
                                        to={link}
                                        key={id}
                                        selected={equals(id, selectedItem)}
                                        onClick={() => setSelectedItem(id)}
                                    >
                                        <ListItemIcon>{icon}</ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItem>
                                ),
                                adminToolbarContent
                            )}
                        </List>
                        <Box onClick={handleOpenDrawer} role="presentation" className={classes.openDrawerIcon}>
                            <Fab color="primary" size="small">
                                <ArrowBack />
                            </Fab>
                        </Box>
                    </Drawer>
                </Fade>
            ) : (
                <Box onClick={handleOpenDrawer} role="presentation" className={classes.openDrawerIcon}>
                    <Fab color="primary" size="small">
                        <ArrowForward />
                    </Fab>
                </Box>
            )}
        </Root>
    )
}

export default AdminToolbar
