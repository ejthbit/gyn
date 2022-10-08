import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeAvailableTimeSlotsWithTimeOnly } from 'src/store/bookings/selectors'
import { setSelectedTime } from 'src/store/reservationProcess/reservationProcessSlice'
import { getSelectedDate, getSelectedTime } from 'src/store/reservationProcess/selectors'
import useMemoizedSelector from 'src/utils/useMemoSelector'

const TermPickerTime = () => {
    const dispatch = useDispatch()
    const selectedDate = useSelector(getSelectedDate)
    const selectedTime = useSelector(getSelectedTime)

    const availableTimeSlots = useMemoizedSelector(makeAvailableTimeSlotsWithTimeOnly, {}, [selectedDate])

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
        </>
    )
}

export default TermPickerTime
