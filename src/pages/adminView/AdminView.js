/* eslint-disable react/no-children-prop */
import AdminToolbar from '@components/adminView/AdminToolbar'
import BookingsView from '@components/adminView/BookingsView'
import CalendarView from '@components/adminView/CalendarView'
import DoctorServicesView from '@components/adminView/DoctorServicesView'
import { Box, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import routingPaths, { adminPaths } from 'src/routingPaths'

const useStyles = makeStyles((theme) => ({
    root: ({ isDrawerOpen }) => ({
        backgroundColor: '#FFF',
        padding: 20,
        border: `1px solid ${theme.palette.common.white} `,
        borderRadius: 6,
        margin: `20px 20px 20px ${isDrawerOpen ? '220px' : '20px'}`,
        [theme.breakpoints.down('sm')]: {
            marginLeft: ({ isDrawerOpen }) => (isDrawerOpen ? 80 : theme.spacing(1)),
        },
        transition: 'all 0.7s ease-in-out',
    }),
}))

const AdminView = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(true)
    const classes = useStyles({ isDrawerOpen })
    const handleOpenDrawer = () => setIsDrawerOpen((prevState) => !prevState)
    return (
        <>
            <Route
                path="*"
                children={<AdminToolbar isDrawerOpen={isDrawerOpen} handleOpenDrawer={handleOpenDrawer} />}
            />
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
