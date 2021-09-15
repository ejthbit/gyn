import AmbulanceSelect from '@components/AmbulanceSelect/AmbulanceSelect'
import {
    AppBar,
    Box,
    Divider,
    Drawer,
    Grid,
    Hidden,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Toolbar,
    Typography,
} from '@material-ui/core'
import { CalendarToday, Event, ExitToApp, Home, Schedule } from '@material-ui/icons'
import SM from '@utilities/StorageManager'
import { map } from 'ramda'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { adminPaths } from 'src/routingPaths'
import { logout } from 'src/store/administration/administrationSlice'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        color: '#000',
        backgroundColor: '#FFF',
    },
    appBar: {
        marginLeft: 200,
        [theme.breakpoints.down('sm')]: {
            marginLeft: 60,
        },
    },
    title: {
        flexGrow: 1,
    },
    drawer: {
        width: 200,
        [theme.breakpoints.down('sm')]: {
            width: 60,
        },
        flexShrink: 0,
    },
    drawerPaper: {
        width: 200,
        [theme.breakpoints.down('sm')]: {
            width: 60,
        },
        backgroundColor: theme.palette.primary.main,
    },
    drawerHeader: {
        textDecoration: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        color: '#FFF',
        padding: theme.spacing(2),
        minHeight: theme.spacing(8),
        [theme.breakpoints.down('sm')]: {
            minHeight: theme.spacing(3),
        },
        '&:hover': {
            color: '#000',
        },
    },
    drawerListItem: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
        '& svg': {
            color: '#FFF',
        },
        [theme.breakpoints.down('sm')]: {
            '& .MuiTypography-root': {
                display: 'none',
            },
        },
        color: '#FFF',
    },
    logOutIcon: {
        marginTop: theme.spacing(1),
        [theme.breakpoints.up('md')]: {
            marginTop: theme.spacing(1),
        },
        cursor: 'pointer',
        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
    ambulanceSelect: {
        flexFlow: 'row',
        '& .MuiInputBase-root': {
            paddingTop: theme.spacing(1),
            height: theme.spacing(3),
        },
        '& .MuiSelect-selectMenu': {
            '&:focus': {
                backgroundColor: 'transparent',
            },
            height: theme.spacing(3),
        },
        [theme.breakpoints.down('sm')]: {
            flexFlow: 'column',
            '& .MuiInputBase-root': {
                textAlign: 'center',
            },
        },
    },
    headerContent: {
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
        },
    },
}))
const adminToolbarContent = [
    { icon: <Event />, text: 'Objednávky', link: adminPaths.orders },
    { icon: <Schedule />, text: 'Rozpisy směn', link: adminPaths.doctorServices },
    { icon: <CalendarToday />, text: 'Kalendař', link: adminPaths.calendar },
]

const AdminToolbar = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [selectedItem, setSelectedItem] = useState('Administrace')

    const handleLogout = (e) => {
        SM.clearLSStorage(e)
        dispatch(logout())
    }

    return (
        <>
            <AppBar position="static" className={classes.root} color="primary">
                <Toolbar className={classes.appBar}>
                    <Grid container spacing={2} alignItems="center" className={classes.headerContent}>
                        <Grid item md={5}>
                            <Typography variant="h6" className={classes.title}>
                                {selectedItem}
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
                                <Box marginRight={2}>
                                    <Typography>Ambulance:</Typography>
                                </Box>
                                <AmbulanceSelect variant="outlined" />
                            </Grid>
                            <Grid item>
                                <Box marginRight={3}>
                                    <Typography>Vítej, Admine</Typography>
                                </Box>
                            </Grid>
                            <Grid item md={1}>
                                <ExitToApp className={classes.logOutIcon} onClick={handleLogout} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor="left"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Box className={classes.drawerHeader} component={Link} to={'/'}>
                    <Hidden smDown>
                        <Typography> VANEK GYNEKOLOGIE</Typography>
                    </Hidden>
                    <Hidden mdUp>
                        <Home />
                    </Hidden>
                </Box>
                <Divider />
                <List disablePadding>
                    {map(
                        ({ icon, text, link }) => (
                            <ListItem
                                className={classes.drawerListItem}
                                button
                                component={Link}
                                to={link}
                                key={text}
                                onClick={() => setSelectedItem(text)}
                            >
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ),
                        adminToolbarContent
                    )}
                </List>
            </Drawer>
        </>
    )
}

export default AdminToolbar
