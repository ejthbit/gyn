import {
    AppBar,
    Box,
    Divider,
    Drawer,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Toolbar,
    Typography,
} from '@material-ui/core'
import { Event, ExitToApp, Schedule } from '@material-ui/icons'
import SM from '@utilities/StorageManager'
import { map } from 'ramda'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import routingPaths, { adminPaths } from 'src/routingPaths'
import { logout } from 'src/store/administration/administrationSlice'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        color: '#000',
        backgroundColor: '#FFF',
    },
    appBar: {
        marginLeft: 200,
    },
    title: {
        flexGrow: 1,
    },
    drawer: {
        width: 200,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 200,
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
    },
    drawerListItem: {
        '& svg': {
            color: '#FFF',
        },
        color: '#FFF',
    },
    logOutIcon: {
        cursor: 'pointer',
        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
}))
const adminToolbarContent = [
    { icon: <Event />, text: 'Objednávky', link: adminPaths.orders },
    { icon: <Schedule />, text: 'Rozpisy směn', link: adminPaths.doctorServices },
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
                    <Grid container spacing={2} alignItems="center">
                        <Grid item md={8}>
                            <Typography variant="h6" className={classes.title}>
                                {selectedItem}
                            </Typography>
                        </Grid>
                        <Grid container item md={4} justifyContent="flex-end">
                            <Box marginRight={2}>
                                <Typography>Vítej, Admine</Typography>
                            </Box>
                            <ExitToApp className={classes.logOutIcon} onClick={handleLogout} />
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
                <Box className={classes.drawerHeader} component={Link} to={routingPaths.admin}>
                    <Typography> VANEK GYNEKOLOGIE</Typography>
                </Box>
                <Divider />
                <List>
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
