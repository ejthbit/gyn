import Dropdown from '@components/buildingbBlocks/Dropdown.js'
import format from 'date-fns/format'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDoctorServicesForSelectedMonth } from 'src/store/bookings/actions'
import { setPreferredDoctor, setReservationBtnDisabled } from 'src/store/reservationProcess/reservationProcessSlice'
import { getPreferredDoctor, getSelectedAmbulance } from 'src/store/reservationProcess/selectors'

const ReservationDoctorPreference = () => {
    const dispatch = useDispatch()

    const selectedAmbulanceId = useSelector(getSelectedAmbulance)

    const selectedDoctor = useSelector(getPreferredDoctor)
    const handleChangeDoctor = (e) => dispatch(setPreferredDoctor(e.target.value))

    useEffect(() => {
        dispatch(setReservationBtnDisabled(false))
        dispatch(
            fetchDoctorServicesForSelectedMonth({
                month: format(Date.now(), 'yyyy-MM'),
                workplace: selectedAmbulanceId,
            })
        )
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
