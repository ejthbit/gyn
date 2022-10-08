import { Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import getDoctorById from '@utilities/getDoctorById'
import isNilOrEmpty from '@utilities/isNilOrEmpty'
import useMemoizedSelector from '@utilities/useMemoSelector'
import { equals, find, propEq } from 'ramda'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAvailableTimeSlots, fetchAvailableTimeSlotsForDoctors } from 'src/store/bookings/actions'
import { clearTimeSlots } from 'src/store/bookings/bookingsSlice'
import { makeAvailableTimeSlotsWithTimeOnly, makeDoctorServicesByDoctorId } from 'src/store/bookings/selectors'
import { setSelectedCategory, setSelectedTime } from 'src/store/reservationProcess/reservationProcessSlice'
import { makeReservationProcessInfo } from 'src/store/reservationProcess/selectors'
import TermPicker from './Components/TermPicker'
import TermPickerCategory from './Components/TermPickerCategory'
import TermPickerTime from './Components/TermPickerTime'
import useReservationButton from './Hooks/useReservationButton'
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

    const { selectedAmbulanceId, selectedDate, selectedTime, selectedDoctor, selectedCategory, selectedMonth } =
        useSelector(getReservationProcessInfo)

    useReservationButton({ dependency: [selectedTime, selectedCategory], step: 2 })
    const [isDoctorServing, setIsDoctorServing] = useState(undefined)

    const availableTimeSlots = useMemoizedSelector(makeAvailableTimeSlotsWithTimeOnly, {}, [selectedDate])
    const doctorServicesBySelectedDoctorIdAndMonth = useMemoizedSelector(
        makeDoctorServicesByDoctorId,
        { month: selectedMonth, doctorId: selectedDoctor, selectedWorkplace: selectedAmbulanceId },
        [selectedDoctor, selectedDate, selectedAmbulanceId]
    )

    useEffect(() => {
        const servesItem = find(({ date, doctors }) => {
            if (!isNilOrEmpty(doctors)) return equals(date, selectedDate)
        }, doctorServicesBySelectedDoctorIdAndMonth)
        const servingDoctor = !isNilOrEmpty(selectedDoctor)
            ? servesItem?.doctors.find(propEq('doctorId', selectedDoctor))
            : servesItem?.doctors
        if (!isNilOrEmpty(servingDoctor)) {
            dispatch(clearTimeSlots())
            setIsDoctorServing(servingDoctor)
            dispatch(
                !Array.isArray(servingDoctor)
                    ? fetchAvailableTimeSlots({
                          from: servingDoctor.start,
                          to: servingDoctor.end,
                          workplace: selectedAmbulanceId,
                      })
                    : fetchAvailableTimeSlotsForDoctors(servingDoctor, selectedAmbulanceId)
            )
        } else {
            setIsDoctorServing(undefined)
            dispatch(clearTimeSlots())
            if (!isNilOrEmpty(selectedTime)) dispatch(setSelectedTime(''))
            if (!isNilOrEmpty(selectedCategory)) dispatch(setSelectedCategory(''))
        }
    }, [selectedDate, doctorServicesBySelectedDoctorIdAndMonth])

    return (
        <StyledGrid container direction="column">
            <TermPicker doctorServicesBySelectedDoctorIdAndMonth={doctorServicesBySelectedDoctorIdAndMonth} />
            {!isNilOrEmpty(availableTimeSlots) ? (
                <StyledGrid container direction="row" spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TermPickerTime />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TermPickerCategory />
                    </Grid>
                </StyledGrid>
            ) : !isNilOrEmpty(isDoctorServing) ? (
                <Typography>Omlouváme se ale na tento den již nejsou volné termíny</Typography>
            ) : (
                <Typography>Omlouváme se ale tento den {getDoctorById(selectedDoctor).name} neordinuje</Typography>
            )}
        </StyledGrid>
    )
}

export default ReservationTermPicker
