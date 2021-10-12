import Dropdown from '@components/buildingbBlocks/Dropdown.js'
import isNilOrEmpty from '@utilities/isNilOrEmpty'
import useMemoizedSelector from '@utilities/useMemoSelector'
import format from 'date-fns/format'
import { equals, find } from 'ramda'
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDoctorServicesForSelectedMonth } from 'src/store/bookings/actions'
import { makeServicesSelector } from 'src/store/bookings/selectors'
import { fetchDoctorsForSelectedAmbulance } from 'src/store/reservationProcess/actions'
import { setPreferredDoctor, setReservationBtnDisabled } from 'src/store/reservationProcess/reservationProcessSlice'
import {
    getPreferredDoctor,
    getSelectedAmbulance,
    getSelectedDate,
    makeArrayOfValueLabelDoctors,
} from 'src/store/reservationProcess/selectors'

const ReservationDoctorPreference = () => {
    const dispatch = useDispatch()

    const selectedAmbulanceId = useSelector(getSelectedAmbulance)
    const selectedDoctor = useSelector(getPreferredDoctor)
    const selectedDate = useSelector(getSelectedDate)
    const selectedMonth = useMemo(() => selectedDate.slice(0, 7), [selectedDate])
    const doctorServices = useMemoizedSelector(makeServicesSelector, {}, [
        selectedDoctor,
        selectedDate,
        selectedAmbulanceId,
    ])

    const doctorsForSelectedAmbulance = useMemoizedSelector(makeArrayOfValueLabelDoctors, {}, [selectedAmbulanceId])

    const handleChangeDoctor = (e) => dispatch(setPreferredDoctor(e.target.value))
    useEffect(() => {
        dispatch(setReservationBtnDisabled(false))
        const serviceItemExists = find(
            ({ month, workplace }) => equals(month, selectedMonth) && equals(workplace, selectedAmbulanceId),
            doctorServices
        )
        if (isNilOrEmpty(serviceItemExists))
            dispatch(
                fetchDoctorServicesForSelectedMonth({
                    month: format(new Date(selectedDate), 'yyyy-MM'),
                    workplace: selectedAmbulanceId,
                })
            )
        dispatch(fetchDoctorsForSelectedAmbulance(selectedAmbulanceId))
    }, [selectedAmbulanceId, selectedDate])

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
