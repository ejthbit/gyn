import { ReservationDialog } from '@ejthbit/reservation-app'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ReservationPage = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(true)

    const handleClose = () => {
        setOpen(false)
        navigate('/')
    }

    return <ReservationDialog isOpen={open} onClose={handleClose} />
}

export default ReservationPage
