import AmbulanceSelect from '@components/AmbulanceSelect/AmbulanceSelect'
import isNilOrEmpty from '@utilities/isNilOrEmpty'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setReservationBtnDisabled } from 'src/store/reservationProcess/reservationProcessSlice'
import { getSelectedAmbulance } from 'src/store/reservationProcess/selectors'

const ReservationAmbulanceSelect = () => {
    const selectedAmbulance = useSelector(getSelectedAmbulance)
    const dispatch = useDispatch()

    useEffect(() => {
        if (isNilOrEmpty(selectedAmbulance)) dispatch(setReservationBtnDisabled(true))
        else dispatch(setReservationBtnDisabled(false))
    }, [selectedAmbulance])

    return <AmbulanceSelect />
}

export default ReservationAmbulanceSelect
