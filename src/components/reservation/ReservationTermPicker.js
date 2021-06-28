import { FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core'
import { DatePicker } from '@material-ui/pickers'
import { isNil } from 'ramda'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAvailableTimeslots } from 'src/store/bookings/actions'
import { makeAvailableTimeslotsWithTimeOnly } from 'src/store/bookings/selectors'
import { setSelectedDate, setSelectedTime } from 'src/store/reservationProcess/reservationProcessSlice'
import { getSelectedDate, getSelectedTime } from 'src/store/reservationProcess/selectors'

const selectAvailableTimeslots = makeAvailableTimeslotsWithTimeOnly()
const ReservationTermPicker = () => {
    const dispatch = useDispatch()
    const selectedDate = useSelector(getSelectedDate)
    const selectedTime = useSelector(getSelectedTime)
    // memoize
    const availableTimeSlots = useSelector(selectAvailableTimeslots)
    // get OpeningHours
    useEffect(() => {
        if (!isNil(selectedDate))
            dispatch(
                fetchAvailableTimeslots({
                    from: `${selectedDate}T07:00:00.000Z`,
                    to: `${selectedDate}T15:00:00.000Z`,
                })
            )
    }, [selectedDate])

    return (
        <Grid container direction="column">
            <DatePicker
                label="Datum návštevy"
                variant="inline"
                disableToolbar
                format="dd-MM-yyyy"
                margin="normal"
                value={selectedDate}
                autoOk
                disablePast
                onChange={(date) => dispatch(setSelectedDate(date.toISOString()))}
            />
            <FormControl>
                <InputLabel id="timePickerLabel" required>
                    Čas návštevy
                </InputLabel>
                <Select value={selectedTime} onChange={(e) => dispatch(setSelectedTime(e.target.value))} displayEmpty>
                    {availableTimeSlots.map(({ timeSlotStart }) => (
                        <MenuItem key={timeSlotStart} value={timeSlotStart}>
                            {timeSlotStart}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    )
}

export default ReservationTermPicker
