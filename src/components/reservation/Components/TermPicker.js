import { MobileDatePicker } from '@mui/x-date-pickers'
import { addHours, format } from 'date-fns'
import PropTypes from 'prop-types'
import { equals, find } from 'ramda'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDoctorServicesForSelectedMonth } from 'src/store/bookings/actions'
import { makeServicesSelector } from 'src/store/bookings/selectors'
import { setSelectedDate } from 'src/store/reservationProcess/reservationProcessSlice'
import { makeReservationProcessInfo } from 'src/store/reservationProcess/selectors'
import getISODateStringWithCorrectOffset from 'src/utils/getISODateStringWithCorrectOffset'
import isNilOrEmpty from 'src/utils/isNilOrEmpty'
import useMemoizedSelector from 'src/utils/useMemoSelector'
import TermPickerDay from './TermPickerDay'
import TermPickerInput from './TermPickerInput'

const getReservationProcessInfo = makeReservationProcessInfo()
const TermPicker = ({ doctorServicesBySelectedDoctorIdAndMonth }) => {
    const dispatch = useDispatch()
    const { selectedAmbulanceId, selectedDate, selectedDoctor } = useSelector(getReservationProcessInfo)

    const doctorServices = useMemoizedSelector(makeServicesSelector, {}, [
        selectedDoctor,
        selectedDate,
        selectedAmbulanceId,
    ])

    const setTermPickerDate = (date) => dispatch(setSelectedDate(getISODateStringWithCorrectOffset(date)))

    return (
        <MobileDatePicker
            label="Datum návštevy"
            variant="dialog"
            inputFormat="dd-MM-yyyy"
            mask="__-__-____"
            value={selectedDate}
            onMonthChange={(date) => {
                const currentMonth = format(date, 'yyyy-MM')
                const serviceItemExists = find(
                    ({ month, workplace }) => equals(month, currentMonth) && equals(workplace, selectedAmbulanceId),
                    doctorServices
                )
                if (isNilOrEmpty(serviceItemExists))
                    dispatch(
                        fetchDoctorServicesForSelectedMonth({
                            month: currentMonth,
                            workplace: selectedAmbulanceId,
                        })
                    )
                setTermPickerDate(addHours(date, 1))
            }}
            renderDay={(day, _value, DayComponentProps) => (
                <TermPickerDay
                    key={format(day, 'yyyy-MM-dd')}
                    day={day}
                    DayComponentProps={DayComponentProps}
                    doctorServicesBySelectedDoctorIdAndMonth={doctorServicesBySelectedDoctorIdAndMonth}
                />
            )}
            views={['year', 'month', 'day']}
            renderInput={(props) => <TermPickerInput ref={props.inputRef} {...props} />}
            onChange={setTermPickerDate}
            disablePast
        />
    )
}

TermPicker.propTypes = {
    doctorServicesBySelectedDoctorIdAndMonth: PropTypes.array,
}

export default TermPicker
