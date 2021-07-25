import Dropdown from '@components/buildingbBlocks/Dropdown.js'
import isNilOrEmpty from '@utilities/isNilOrEmpty'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDoctorServicesForSelectedMonth } from 'src/store/bookings/actions'
import { getDoctorServicesForSelectedMonth } from 'src/store/bookings/selectors'
import { setPreferredDoctor } from 'src/store/reservationProcess/reservationProcessSlice'
import { getPreferredDoctor } from 'src/store/reservationProcess/selectors'
import format from 'date-fns/format'

const ReservationDoctorPreference = () => {
    const dispatch = useDispatch()

    const selectedDoctor = useSelector(getPreferredDoctor)
    const doctorServicesForSelectedMonth = useSelector(getDoctorServicesForSelectedMonth)

    const handleChangeDoctor = (e) => dispatch(setPreferredDoctor(e.target.value))

    useEffect(() => {
        if (isNilOrEmpty(doctorServicesForSelectedMonth))
            dispatch(fetchDoctorServicesForSelectedMonth(format(Date.now(), 'yyyy-MM')))
    }, [])

    return (
        <Dropdown
            value={selectedDoctor}
            onChange={handleChangeDoctor}
            notSelectedLabel="Nemám preferenci"
            options={[
                { value: '1', label: 'MUDr. Miroslav Vaněk' },
                { value: '2', label: 'MUDr. Jana Medvecká' },
                { value: '3', label: 'MUDr. Hana Vaňková - Sonografie' },
            ]}
        />
    )
}

export default ReservationDoctorPreference
