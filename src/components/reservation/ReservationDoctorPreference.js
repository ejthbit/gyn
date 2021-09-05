import Dropdown from '@components/buildingbBlocks/Dropdown.js'
import useMemoizedSelector from '@utilities/useMemoSelector'
import format from 'date-fns/format'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDoctorServicesForSelectedMonth } from 'src/store/bookings/actions'
import { fetchDoctorsForSelectedAmbulance } from 'src/store/reservationProcess/actions'
import { setPreferredDoctor, setReservationBtnDisabled } from 'src/store/reservationProcess/reservationProcessSlice'
import {
    getPreferredDoctor,
    getSelectedAmbulance,
    makeArrayOfValueLabelDoctors,
} from 'src/store/reservationProcess/selectors'

const ReservationDoctorPreference = () => {
    const dispatch = useDispatch()

    const selectedAmbulanceId = useSelector(getSelectedAmbulance)

    const selectedDoctor = useSelector(getPreferredDoctor)
    const doctorsForSelectedAmbulance = useMemoizedSelector(makeArrayOfValueLabelDoctors, {}, [selectedAmbulanceId])

    const handleChangeDoctor = (e) => dispatch(setPreferredDoctor(e.target.value))

    useEffect(() => {
        dispatch(setReservationBtnDisabled(false))
        dispatch(
            fetchDoctorServicesForSelectedMonth({
                month: format(Date.now(), 'yyyy-MM'),
                workplace: selectedAmbulanceId,
            })
        )
        dispatch(fetchDoctorsForSelectedAmbulance(selectedAmbulanceId))
    }, [selectedAmbulanceId])

    return (
        <Dropdown
            value={selectedDoctor}
            onChange={handleChangeDoctor}
            notSelectedLabel="Nemám preferenci"
            options={doctorsForSelectedAmbulance}
        />
    )
}

export default ReservationDoctorPreference
