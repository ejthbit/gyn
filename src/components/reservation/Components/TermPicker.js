import React from 'react'
import PropTypes from 'prop-types'
import { MobileDatePicker } from '@mui/lab'
import { addHours, format } from 'date-fns'
import isNilOrEmpty from 'src/utils/isNilOrEmpty'
import TermPickerDay from './TermPickerDay'
import TermPickerInput from './TermPickerInput'
import { useDispatch, useSelector } from 'react-redux'
import { getPreferredDoctor, getSelectedAmbulance, getSelectedDate } from 'src/store/reservationProcess/selectors'
import { setSelectedDate } from 'src/store/reservationProcess/reservationProcessSlice'
import getISODateStringWithCorrectOffset from 'src/utils/getISODateStringWithCorrectOffset'
import { fetchDoctorServicesForSelectedMonth } from 'src/store/bookings/actions'
import useMemoizedSelector from 'src/utils/useMemoSelector'
import { makeServicesSelector } from 'src/store/bookings/selectors'
import { find, equals } from 'ramda'

const TermPicker = ({ doctorServicesBySelectedDoctorIdAndMonth }) => {
    const dispatch = useDispatch()

    const selectedDate = useSelector(getSelectedDate)
    const selectedAmbulanceId = useSelector(getSelectedAmbulance)
    const selectedDoctor = useSelector(getPreferredDoctor)

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
            okText="Potvrdit"
            cancelText="Zavřít"
            views={['year', 'month', 'day']}
            renderInput={(props) => <TermPickerInput {...props} />}
            onChange={setTermPickerDate}
            disablePast
        />
    )
}

TermPicker.propTypes = {
    doctorServicesBySelectedDoctorIdAndMonth: PropTypes.array,
}

export default TermPicker
