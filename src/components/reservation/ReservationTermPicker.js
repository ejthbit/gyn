import { Grid } from '@material-ui/core'
import { DatePicker, TimePicker } from '@material-ui/pickers'
import { startOfToday } from 'date-fns'
import { isNil } from 'ramda'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAvailableTimeslots } from 'src/store/bookings/actions'
import {
    setSelectedDate,
    setSelectedTime,
} from 'src/store/reservationProcess/reservationProcessSlice'
import { getSelectedDate, getSelectedTime } from 'src/store/reservationProcess/selectors'

const ReservationTermPicker = () => {
    const dispatch = useDispatch()
    const selectedDate = useSelector(getSelectedDate)
    const selectedTime = useSelector(getSelectedTime)

    useEffect(() => {
        if (!isNil(selectedDate))
            dispatch(
                fetchAvailableTimeslots({
                    from: '2021-05-30T07:00:00.000Z',
                    to: '2021-05-30T15:00:00.000Z',
                })
            )
    }, [selectedDate])
    return (
        <Grid container direction="column">
            <DatePicker
                variant="inline"
                disableToolbar
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                value={selectedDate}
                autoOk
                disablePast
                onOpen={
                    isNil(selectedDate) && dispatch(setSelectedDate(startOfToday().toISOString()))
                }
                onChange={(date) => dispatch(setSelectedDate(date.toISOString()))}
            />
            <TimePicker
                ampm={false}
                showTodayButton
                todayLabel="Dnes"
                cancelLabel="Zavřít"
                okLabel="Potvrdit"
                orientation="landscape"
                value={selectedTime}
                minutesStep={15}
                onChange={(date) => dispatch(setSelectedTime(date.toISOString()))}
            />
        </Grid>
    )
}

ReservationTermPicker.propTypes = {}

export default ReservationTermPicker
