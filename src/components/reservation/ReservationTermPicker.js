import { Badge, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import getISODateStringWithCorrectOffset from '@utilities/getISODateStringWithCorrectOffset'
import isNilOrEmpty from '@utilities/isNilOrEmpty'
import useMemoizedSelector from '@utilities/useMemoSelector'
import { addHours, startOfToday } from 'date-fns'
import format from 'date-fns/format'
import { equals, find } from 'ramda'
import React, { useEffect, useState } from 'react'
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
    setSelectedCategory,
} from 'src/store/reservationProcess/reservationProcessSlice'
import {
    getActiveStep,
    getDisabledReservationBtn,
    getBookingCategories,
    makeReservationProcessInfo,
    makeSelectedDoctorItem,
} from 'src/store/reservationProcess/selectors'
import { fetchBookingCategories } from 'src/store/reservationProcess/actions'
import { MobileDatePicker, PickersDay } from '@mui/x-date-pickers'
import DatepickerInput from './Components/DatepickerInput'

const PREFIX = 'ReservationTermPicker'

const classes = {
    dayWithDotContainer: `${PREFIX}-dayWithDotContainer`,
    disabledDayContainer: `${PREFIX}-disabledDayContainer`,
    dayWithDot: `${PREFIX}-dayWithDot`,
    timepicker: `${PREFIX}-timepicker`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
    marginTop: theme.spacing(0.5),
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
const getReservationProcessInfo = makeReservationProcessInfo()
const ReservationTermPicker = () => {
    const dispatch = useDispatch()
    const [isDoctorServing, setIsDoctorServing] = useState(undefined)

    const { selectedAmbulanceId, selectedDate, selectedTime, selectedDoctor, selectedCategory, selectedMonth } =
        useSelector(getReservationProcessInfo)
    const selectedDoctorItem = useMemoizedSelector(makeSelectedDoctorItem, { doctorId: selectedDoctor }, [
        selectedDoctor,
    ])
    const isReservationBtnDisabled = useSelector(getDisabledReservationBtn)
    const activeStep = useSelector(getActiveStep)

    const availableTimeSlots = useMemoizedSelector(makeAvailableTimeslotsWithTimeOnly, {}, [selectedDate])
    const doctorServicesBySelectedDoctorIdAndMonth = useMemoizedSelector(
        makeDoctorServicesByDoctorId,
        { month: selectedMonth, doctorId: selectedDoctor, selectedWorkplace: selectedAmbulanceId },
        [selectedDoctor, selectedDate, selectedAmbulanceId]
    )
    const bookingCategories = useSelector(getBookingCategories)
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
            if (!isNilOrEmpty(selectedCategory)) dispatch(setSelectedCategory(''))
        }
    }, [selectedDate, doctorServicesBySelectedDoctorIdAndMonth])

    useEffect(() => {
        if (equals(activeStep, 2)) {
            if ((isNilOrEmpty(selectedTime) || isNilOrEmpty(selectedCategory)) && !isReservationBtnDisabled)
                dispatch(setReservationBtnDisabled(true))
            else if (!isNilOrEmpty(selectedTime) && !isNilOrEmpty(selectedCategory))
                dispatch(setReservationBtnDisabled(false))
        }
    }, [selectedTime, selectedCategory, activeStep])

    useEffect(() => {
        if (isNilOrEmpty(bookingCategories)) dispatch(fetchBookingCategories())
    }, [])

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
                    dispatch(setSelectedDate(getISODateStringWithCorrectOffset(addHours(date, 1))))
                }}
                renderDay={(day, selectedDays, pickersDayProps) => {
                    const isSelected =
                        !pickersDayProps.outsideCurrentMonth &&
                        find(({ date, doctorId }) => {
                            if (!isNilOrEmpty(doctorId))
                                return equals(date, format(day, 'yyyy-MM-dd')) && day >= startOfToday()
                        }, doctorServicesBySelectedDoctorIdAndMonth)
                    return (
                        <Badge key={day.toString()} overlap="circular" badgeContent={isSelected ? '👨🏻‍⚕️' : undefined}>
                            <PickersDay {...pickersDayProps} disabled={isNilOrEmpty(isSelected)} />
                        </Badge>
                    )
                }}
                views={['year', 'month', 'day']}
                renderInput={DatepickerInput}
                disablePast
                onChange={(date) => dispatch(setSelectedDate(getISODateStringWithCorrectOffset(date)))}
            />
            {!isNilOrEmpty(availableTimeSlots) ? (
                <StyledGrid container direction="row" spacing={1}>
                    <Grid item xs={12} sm={6}>
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
                            >
                                {availableTimeSlots.map(({ timeSlotStart }) => (
                                    <MenuItem key={timeSlotStart} value={timeSlotStart}>
                                        {timeSlotStart.slice(0, 5)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl variant="standard" sx={{ mt: 0.5, minWidth: 120 }} fullWidth>
                            <InputLabel id="typeOfCategory" required>
                                Typ vyšetření
                            </InputLabel>
                            <Select
                                label="Typ vyšetření"
                                variant="standard"
                                value={selectedCategory}
                                onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
                                displayEmpty
                            >
                                {bookingCategories.map(({ name, category_id }) => (
                                    <MenuItem key={category_id} value={category_id}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {/* {isDoctorServing?.note && (
                            <Typography color="error">{`Pozn. ${isDoctorServing?.note}`}</Typography>
                        )} */}
                    </Grid>
                </StyledGrid>
            ) : !isNilOrEmpty(isDoctorServing) ? (
                <Typography>Omlouváme se ale na tento den již nejsou volné termíny</Typography>
            ) : (
                <Typography>Omlouváme se ale tento den {selectedDoctorItem.name} neordinuje</Typography>
            )}
        </StyledGrid>
    )
}

export default ReservationTermPicker
