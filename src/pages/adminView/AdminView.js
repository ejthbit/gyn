/* eslint-disable react/no-children-prop */
import AdminToolbar from '@components/adminView/AdminToolbar'
import BookingsView from '@components/adminView/BookingsView'
import CalendarView from '@components/adminView/CalendarView'
import DoctorServicesView from '@components/adminView/DoctorServicesView'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import routingPaths, { adminPaths } from 'src/routingPaths'

const PREFIX = 'AdminView'

const classes = {
    root: `${PREFIX}-root`,
}

const Root = styled('div', { shouldForwardProp: (prop) => prop !== 'isDrawerOpen' })(({ theme, isDrawerOpen }) => ({
    [`& .${classes.root}`]: {
        backgroundColor: '#FFF',
        padding: 20,
        border: `1px solid ${theme.palette.common.white} `,
        borderRadius: 6,
        margin: `20px 20px 20px ${isDrawerOpen ? '220px' : '20px'}`,
        [theme.breakpoints.down('md')]: {
            marginLeft: isDrawerOpen ? 80 : theme.spacing(1),
        },
        transition: 'all 0.7s ease-in-out',
    },
}))

const AdminView = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(true)

    const handleOpenDrawer = () => setIsDrawerOpen((prevState) => !prevState)
    return (
        <Root isDrawerOpen={isDrawerOpen}>
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
        </Root>
    )
}

export default AdminView
