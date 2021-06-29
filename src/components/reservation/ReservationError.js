import TranslatedErrors from '@components/buildingbBlocks/Errors/TranslatedErrors'
import StepContentWithBtn from '@components/buildingbBlocks/StepContentWithBtn'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bookAnAppointment } from 'src/store/bookings/actions'
import { clearBooking } from 'src/store/bookings/bookingsSlice'
import { lastBookingErrors } from 'src/store/bookings/selectors'
import { setActiveStep } from 'src/store/reservationProcess/reservationProcessSlice'

const ReservationError = () => {
    const dispatch = useDispatch()
    const orderErrors = useSelector(lastBookingErrors)
    return (
        <StepContentWithBtn
            text={<TranslatedErrors errors={orderErrors} />}
            variant="error"
            btnText="Zkusit znovu"
            onBtnClick={() => dispatch(bookAnAppointment())}
            secondaryBtnText="Vratit se zpět"
            onSecondaryBtnClick={() => {
                dispatch(clearBooking())
                dispatch(setActiveStep(-3))
            }}
        />
    )
}

export default ReservationError
