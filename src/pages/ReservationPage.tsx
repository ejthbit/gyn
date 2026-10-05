import { useReservationDialog } from '@components/Reservation/ReservationProvider'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Direct visits to /rezervace (bookmarks, external links) open the reservation dialog over the landing page.
const ReservationPage = () => {
    const navigate = useNavigate()
    const { openReservation } = useReservationDialog()

    useEffect(() => {
        openReservation()
        navigate('/', { replace: true })
    }, [])

    return null
}

export default ReservationPage
