import Dropdown from '@components/buildingbBlocks/Dropdown.js'
import isNilOrEmpty from '@utilities/isNilOrEmpty'
import useMemoizedSelector from '@utilities/useMemoSelector'
import format from 'date-fns/format'
import { equals, find } from 'ramda'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDoctorServicesForSelectedMonth } from 'src/store/bookings/actions'
import { clearTimeSlots } from 'src/store/bookings/bookingsSlice'
import { makeServicesSelector } from 'src/store/bookings/selectors'
import { fetchDoctorsForSelectedAmbulance } from 'src/store/reservationProcess/actions'
import { setPreferredDoctor, setReservationBtnDisabled } from 'src/store/reservationProcess/reservationProcessSlice'
import { makeArrayOfValueLabelDoctors, makeReservationProcessInfo } from 'src/store/reservationProcess/selectors'

const getReservationProcessInfo = makeReservationProcessInfo()

const ReservationDoctorPreference = () => {
    const dispatch = useDispatch()
    const { selectedAmbulanceId, selectedDate, selectedDoctor, selectedMonth } = useSelector(getReservationProcessInfo)

    const doctorServices = useMemoizedSelector(makeServicesSelector, {}, [
        selectedDoctor,
        selectedDate,
        selectedAmbulanceId,
    ])

    const doctorsForSelectedAmbulance = useMemoizedSelector(makeArrayOfValueLabelDoctors, {}, [selectedAmbulanceId])

    const handleChangeDoctor = (e) => {
        dispatch(clearTimeSlots())
        dispatch(setPreferredDoctor(e.target.value))
    }

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
