import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeAvailableTimeslotsWithTimeOnly } from 'src/store/bookings/selectors'
import { setSelectedTime } from 'src/store/reservationProcess/reservationProcessSlice'
import { getSelectedDate, getSelectedTime } from 'src/store/reservationProcess/selectors'
import useMemoizedSelector from 'src/utils/useMemoSelector'

const TermPickerTime = ({ isDoctorServing }) => {
    const dispatch = useDispatch()
    const selectedDate = useSelector(getSelectedDate)
    const selectedTime = useSelector(getSelectedTime)

    const availableTimeSlots = useMemoizedSelector(makeAvailableTimeslotsWithTimeOnly, {}, [selectedDate])

    return (
        <>
            <FormControl variant="standard" sx={{ mt: 0.5, minWidth: 120 }} fullWidth>
                <InputLabel id="timePickerLabel" required>
                    Čas návštevy
                </InputLabel>
                <Select
                    label="Čas návštevy"
                    variant="standard"
                    value={selectedTime}
                    onChange={(e) => dispatch(setSelectedTime(e.target.value))}
                    displayEmpty
                    fullWidth
                >
                    {availableTimeSlots.map(({ timeSlotStart }) => (
                        <MenuItem key={timeSlotStart} value={timeSlotStart}>
                            {timeSlotStart.slice(0, 5)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {isDoctorServing?.note && <Typography color="error">{`Pozn. ${isDoctorServing?.note}`}</Typography>}
        </>
    )
}

TermPickerTime.propTypes = {
    isDoctorServing: PropTypes.object,
}

export default TermPickerTime
