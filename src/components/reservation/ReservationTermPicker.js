import { Today } from '@mui/icons-material'
import { MobileDatePicker, PickersDay } from '@mui/lab'
import {
    Badge,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import getDoctorById from '@utilities/getDoctorById'
import getISODateStringWithCorrectOffset from '@utilities/getISODateStringWithCorrectOffset'
import isNilOrEmpty from '@utilities/isNilOrEmpty'
import useMemoizedSelector from '@utilities/useMemoSelector'
import { addHours, startOfToday } from 'date-fns'
import format from 'date-fns/format'
import { equals, find } from 'ramda'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAvailableTimeslots, fetchDoctorServicesForSelectedMonth } from 'src/store/bookings/actions'
import { clearTimeslots } from 'src/store/bookings/bookingsSlice'
import {
    makeAvailableTimeslotsWithTimeOnly,
    makeDoctorServicesByDoctorId,
    makeServicesSelector,
} from 'src/store/bookings/selectors'
import {
    setReservationBtnDisabled,
    setSelectedDate,
    setSelectedTime,
} from 'src/store/reservationProcess/reservationProcessSlice'
import {
    getActiveStep,
    getDisabledReservationBtn,
    getPreferredDoctor,
    getSelectedAmbulance,
    getSelectedDate,
    getSelectedTime,
} from 'src/store/reservationProcess/selectors'

const PREFIX = 'ReservationTermPicker'

const classes = {
    dayWithDotContainer: `${PREFIX}-dayWithDotContainer`,
    disabledDayContainer: `${PREFIX}-disabledDayContainer`,
    dayWithDot: `${PREFIX}-dayWithDot`,
    timepicker: `${PREFIX}-timepicker`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
    [`& .${classes.dayWithDotContainer}`]: {
        position: 'relative',
    },

    [`& .${classes.disabledDayContainer}`]: {
        pointerEvents: 'none',
        '& .MuiPickersDay-day': {
            opacity: 0.25,
        },
    },

    [`& .${classes.dayWithDot}`]: {
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

    [`& .${classes.timepicker}`]: {
        marginTop: theme.spacing(1),
    },
}))

const ReservationTermPicker = () => {
    const dispatch = useDispatch()
    const selectedAmbulanceId = useSelector(getSelectedAmbulance)

    const selectedDate = useSelector(getSelectedDate)
    const selectedTime = useSelector(getSelectedTime)
    const selectedMonth = useMemo(() => selectedDate.slice(0, 7), [selectedDate])
    const isReservationBtnDisabled = useSelector(getDisabledReservationBtn)
    const selectedDoctor = useSelector(getPreferredDoctor)
    const activeStep = useSelector(getActiveStep)
    const [isDoctorServing, setIsDoctorServing] = useState(undefined)
    const availableTimeSlots = useMemoizedSelector(makeAvailableTimeslotsWithTimeOnly, {}, [selectedDate])
    const doctorServicesBySelectedDoctorIdAndMonth = useMemoizedSelector(
        makeDoctorServicesByDoctorId,
        { month: selectedMonth, doctorId: selectedDoctor, selectedWorkplace: selectedAmbulanceId },
        [selectedDoctor, selectedDate, selectedAmbulanceId]
    )
    const doctorServices = useMemoizedSelector(makeServicesSelector, {}, [
        selectedDoctor,
        selectedDate,
        selectedAmbulanceId,
    ])

    useEffect(() => {
        const servesItem = find(({ date, doctorId }) => {
            if (!isNilOrEmpty(doctorId)) return equals(date, selectedDate)
        }, doctorServicesBySelectedDoctorIdAndMonth)
        if (!isNilOrEmpty(servesItem)) {
            setIsDoctorServing(servesItem)
            dispatch(
                fetchAvailableTimeslots({
                    from: servesItem.start,
                    to: servesItem.end,
                    workplace: selectedAmbulanceId,
                })
            )
        } else {
            setIsDoctorServing(undefined)
            dispatch(clearTimeslots())
            if (!isNilOrEmpty(selectedTime)) dispatch(setSelectedTime(''))
        }
    }, [selectedDate, doctorServicesBySelectedDoctorIdAndMonth])

    useEffect(() => {
        if (equals(activeStep, 2)) {
            if (isNilOrEmpty(selectedTime) && !isReservationBtnDisabled) dispatch(setReservationBtnDisabled(true))
            else if (!isNilOrEmpty(selectedTime)) dispatch(setReservationBtnDisabled(false))
        }
    }, [selectedTime, activeStep])

    return (
        <StyledGrid container direction="column">
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
                    dispatch(setSelectedDate(addHours(date, 1).toISOString()))
                }}
                renderDay={(day, _value, DayComponentProps) => {
                    const isSelected =
                        !DayComponentProps.outsideCurrentMonth &&
                        find(({ date, doctorId }) => {
                            if (!isNilOrEmpty(doctorId))
                                return equals(date, format(day, 'yyyy-MM-dd')) && day >= startOfToday()
                        }, doctorServicesBySelectedDoctorIdAndMonth)
                    return (
                        <Badge key={day.toString()} overlap="circular" badgeContent={isSelected ? '🌚' : undefined}>
                            <PickersDay {...DayComponentProps} disabled={isNilOrEmpty(isSelected)} />
                        </Badge>
                    )
                }}
                okText="Potvrdit"
                cancelText="Zavřít"
                views={['year', 'month', 'day']}
                renderInput={(props) => (
                    <TextField
                        {...props}
                        variant="standard"
                        required
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
                onChange={(date) => dispatch(setSelectedDate(getISODateStringWithCorrectOffset(date)))}
            />
            {!isNilOrEmpty(availableTimeSlots) ? (
                <>
                    <FormControl variant="standard" sx={{ mt: 0.5, minWidth: 120 }}>
                        <InputLabel id="timePickerLabel" required>
                            Čas návštevy
                        </InputLabel>
                        <Select
                            label="Čas návštevy"
                            variant="standard"
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
            ) : !isNilOrEmpty(isDoctorServing) ? (
                <Typography>Omlouváme se ale na tento den již nejsou volné termíny</Typography>
            ) : (
                <Typography>Omlouváme se ale tento den {getDoctorById(selectedDoctor).name} neordinuje</Typography>
            )}
        </StyledGrid>
    )
}

export default ReservationTermPicker
