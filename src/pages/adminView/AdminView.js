/* eslint-disable react/no-children-prop */
import BookingsView from '@components/adminView/BookingsView'
import DoctorServicesView from '@components/adminView/DoctorServicesView'
import { Box, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { Route } from 'react-router-dom'
import routingPaths, { adminPaths } from 'src/routingPaths'

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: '#FFF',
        padding: 20,
        border: '2px solid lightgray',
        borderRadius: 10,
        margin: '20px 20px 20px 220px',
    },
}))

const AdminView = () => {
    const classes = useStyles()
    return (
        <Box className={classes.root}>
            <Route path={adminPaths.orders} children={<BookingsView />} />
            <Route path={adminPaths.doctorServices} children={<DoctorServicesView />} />
            <Route path={routingPaths.admin} exact children={<Typography variant="h2">Vítej, admine</Typography>} />
        </Box>
    )
}

export default AdminView
