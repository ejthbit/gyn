import AdminToolbar from '@components/adminView/AdminToolbar'
import BookingsView from '@components/adminView/BookingsView'
import React from 'react'

const AdminView = () => {
    return (
        <>
            <AdminToolbar />
            <BookingsView />
            {/* <AdminContent /> */}
        </>
    )
}

export default AdminView
