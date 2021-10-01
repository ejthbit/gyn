/* eslint-disable react/no-children-prop */
import AdminToolbar from '@components/adminView/AdminToolbar'
import BookingsView from '@components/adminView/BookingsView'
import CalendarView from '@components/adminView/CalendarView'
import DoctorServicesView from '@components/adminView/DoctorServicesView'
import { Box, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { Route } from 'react-router-dom'
import routingPaths, { adminPaths } from 'src/routingPaths'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#FFF',
        padding: 20,
        border: '2px solid lightgray',
        borderRadius: 10,
        margin: '20px 20px 20px 220px',
        [theme.breakpoints.down('sm')]: {
            marginLeft: 80,
        },
    },
}))

const AdminView = () => {
    const classes = useStyles()
    return (
        <>
            <Route path="*" children={<AdminToolbar />} />
            <Box className={classes.root}>
                <Route
                    path={routingPaths.admin}
                    exact
                    children={
                        <>
                            <Typography variant="h4" align="center">
                                Vítejte
                            </Typography>
                            <CalendarView />
                        </>
                    }
                />
                <Route path={adminPaths.orders} children={<BookingsView />} />
                <Route path={adminPaths.doctorServices} children={<DoctorServicesView />} />
                <Route path={adminPaths.calendar} children={<CalendarView />} />
            </Box>
        </>
    )
}

export default AdminView
