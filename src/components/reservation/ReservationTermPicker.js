import {
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@material-ui/core'
import { Today } from '@material-ui/icons'
import { DatePicker } from '@material-ui/pickers'
import getDoctorById from '@utilities/getDoctorById'
import isNilOrEmpty from '@utilities/isNilOrEmpty'
import useMemoizedSelector from '@utilities/useMemoSelector'
import format from 'date-fns/format'
import { equals, find, isNil } from 'ramda'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAvailableTimeslots, fetchDoctorServicesForSelectedMonth } from 'src/store/bookings/actions'
import { clearTimeslots } from 'src/store/bookings/bookingsSlice'
import { makeAvailableTimeslotsWithTimeOnly, makeDoctorServicesByDoctorId } from 'src/store/bookings/selectors'
import {
    setReservationBtnDisabled,
    setSelectedDate,
    setSelectedTime,
} from 'src/store/reservationProcess/reservationProcessSlice'
import {
    getDisabledReservationBtn,
    getPreferredDoctor,
    getSelectedAmbulance,
    getSelectedDate,
    getSelectedTime,
} from 'src/store/reservationProcess/selectors'

const useStyles = makeStyles((theme) => ({
    dayWithDotContainer: {
        position: 'relative',
    },
    disabledDayContainer: {
        pointerEvents: 'none',
        '& .MuiPickersDay-day': {
            opacity: 0.25,
        },
    },
    dayWithDot: {
        position: 'absolute',
        height: 0,
        width: 0,
        border: '2px solid',
        borderRadius: 4,
        borderColor: theme.palette.primary.main,
        right: '47%',
        transform: 'translateX(1px)',
        top: '10%',
    },
    timepicker: {
        marginTop: theme.spacing(1),
    },
}))

const ReservationTermPicker = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selectedAmbulanceId = useSelector(getSelectedAmbulance)

    const selectedDate = useSelector(getSelectedDate)
    const selectedTime = useSelector(getSelectedTime)
    const isReservationBtnDisabled = useSelector(getDisabledReservationBtn)
    const selectedDoctor = useSelector(getPreferredDoctor)

    const availableTimeSlots = useMemoizedSelector(makeAvailableTimeslotsWithTimeOnly, {}, [selectedDate])
    const doctorServicesByDoctorId = useMemoizedSelector(makeDoctorServicesByDoctorId, { doctorId: selectedDoctor }, [
        selectedDoctor,
    ])

    const isDoctorServing = find(({ date, doctorId }) => {
        if (!isNilOrEmpty(doctorId)) return equals(date, selectedDate)
    }, doctorServicesByDoctorId)

    useEffect(() => {
        if (isNilOrEmpty(selectedTime) && !isReservationBtnDisabled) dispatch(setReservationBtnDisabled(true))
        else if (!isNilOrEmpty(selectedTime)) dispatch(setReservationBtnDisabled(false))
        if (!isDoctorServing && !isNilOrEmpty(selectedTime)) dispatch(setSelectedTime(''))
    }, [isDoctorServing, selectedTime])

    // get OpeningHours
    useEffect(() => {
        if (!isNil(selectedDate)) {
            if (isDoctorServing) {
                const { start: from, end: to } = find(
                    ({ date }) => equals(date, selectedDate),
                    doctorServicesByDoctorId
                )
                dispatch(fetchAvailableTimeslots({ from, to, workplace: selectedAmbulanceId }))
            } else dispatch(clearTimeslots())
        }
    }, [selectedDate, selectedAmbulanceId])

    return (
        <Grid container direction="column">
            <DatePicker
                label="Datum návštevy"
                variant="dialog"
                format="dd-MM-yyyy"
                value={selectedDate}
                onMonthChange={(date) =>
                    dispatch(
                        fetchDoctorServicesForSelectedMonth({
                            month: format(date, 'yyyy-MM'),
                            workplace: selectedAmbulanceId,
                        })
                    )
                }
                renderDay={(day, selectedDate, dayInCurrentMonth, dayComponent) => {
                    const isSelected =
                        dayInCurrentMonth &&
                        find(({ date, doctorId }) => {
                            if (!isNilOrEmpty(doctorId)) return equals(date, format(day, 'yyyy-MM-dd'))
                        }, doctorServicesByDoctorId)

                    return (
                        <div className={isSelected ? classes.dayWithDotContainer : classes.disabledDayContainer}>
                            {dayComponent}
                            {isSelected && <div className={classes.dayWithDot}></div>}
                        </div>
                    )
                }}
                autoOk
                views={['year', 'month', 'date']}
                TextFieldComponent={({ value, onClick, onChange, inputRef }) => (
                    <TextField
                        inputRef={inputRef}
                        onClick={onClick}
                        value={value}
                        onChange={onChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Today />
                                </InputAdornment>
                            ),
                        }}
                    />
                )}
                disablePast
                onChange={(date) => dispatch(setSelectedDate(date.toISOString()))}
            />
            {!isNilOrEmpty(availableTimeSlots) ? (
                <>
                    <FormControl className={classes.timepicker}>
                        <InputLabel id="timePickerLabel" required>
                            Čas návštevy
                        </InputLabel>
                        <Select
                            value={selectedTime}
                            onChange={(e) => dispatch(setSelectedTime(e.target.value))}
                            displayEmpty
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
            ) : (
                <Typography>Omlouváme se ale tento den {getDoctorById(selectedDoctor).name} neordinuje</Typography>
            )}
        </Grid>
    )
}

export default ReservationTermPicker
