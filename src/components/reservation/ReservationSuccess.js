import StepContentWithBtn from '@components/buildingbBlocks/StepContentWithBtn'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearBooking } from 'src/store/bookings/bookingsSlice'
import { getOrderFinishedOk } from 'src/store/bookings/selectors'
import { clearReservation } from 'src/store/reservationProcess/reservationProcessSlice'

const ReservationSuccess = () => {
    const dispatch = useDispatch()
    const isOrderCompleted = useSelector(getOrderFinishedOk)

    return (
        isOrderCompleted && (
            <StepContentWithBtn
                text="Vaše objednávka byla uspěšná!"
                variant="success"
                btnText="Vytvořit novou objednávku"
                onBtnClick={() => {
                    dispatch(clearBooking())
                    dispatch(clearReservation())
                }}
            />
        )
    )
}

export default ReservationSuccess
