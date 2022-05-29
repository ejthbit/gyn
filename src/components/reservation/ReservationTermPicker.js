import { Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import getDoctorById from '@utilities/getDoctorById'
import isNilOrEmpty from '@utilities/isNilOrEmpty'
import useMemoizedSelector from '@utilities/useMemoSelector'
import { propEq, equals, find } from 'ramda'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAvailableTimeslots } from 'src/store/bookings/actions'
import { clearTimeslots } from 'src/store/bookings/bookingsSlice'
import { makeAvailableTimeslotsWithTimeOnly, makeDoctorServicesByDoctorId } from 'src/store/bookings/selectors'
import { setSelectedTime } from 'src/store/reservationProcess/reservationProcessSlice'
import {
    getPreferredDoctor,
    getSelectedAmbulance,
    getSelectedDate,
    getSelectedTime,
} from 'src/store/reservationProcess/selectors'
import TermPicker from './Components/TermPicker'
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
    const selectedDoctor = useSelector(getPreferredDoctor)

    useReservationButton({ dependency: selectedTime, step: 2 })

    const selectedMonth = useMemo(() => selectedDate.slice(0, 7), [selectedDate])

    const [isDoctorServing, setIsDoctorServing] = useState(undefined)

    const availableTimeSlots = useMemoizedSelector(makeAvailableTimeslotsWithTimeOnly, {}, [selectedDate])
    const doctorServicesBySelectedDoctorIdAndMonth = useMemoizedSelector(
        makeDoctorServicesByDoctorId,
        { month: selectedMonth, doctorId: selectedDoctor, selectedWorkplace: selectedAmbulanceId },
        [selectedDoctor, selectedDate, selectedAmbulanceId]
    )
    useEffect(() => {
        const servesItem = find(({ date, doctors }) => {
            if (!isNilOrEmpty(doctors)) return equals(date, selectedDate)
        }, doctorServicesBySelectedDoctorIdAndMonth)
        const servingDoctor = servesItem?.doctors.find(propEq('doctorId', selectedDoctor))
        if (!isNilOrEmpty(servingDoctor)) {
            setIsDoctorServing(servingDoctor)
            dispatch(
                fetchAvailableTimeslots({
                    from: servingDoctor.start,
                    to: servingDoctor.end,
                    workplace: selectedAmbulanceId,
                })
            )
        } else {
            setIsDoctorServing(undefined)
            dispatch(clearTimeslots())
            if (!isNilOrEmpty(selectedTime)) dispatch(setSelectedTime(''))
        }
    }, [selectedDate, doctorServicesBySelectedDoctorIdAndMonth])

    return (
        <StyledGrid container direction="column">
            <TermPicker doctorServicesBySelectedDoctorIdAndMonth={doctorServicesBySelectedDoctorIdAndMonth} />
            {!isNilOrEmpty(availableTimeSlots) ? (
                <TermPickerTime isDoctorServing={isDoctorServing} />
            ) : !isNilOrEmpty(isDoctorServing) ? (
                <Typography>Omlouváme se ale na tento den již nejsou volné termíny</Typography>
            ) : (
                <Typography>Omlouváme se ale tento den {getDoctorById(selectedDoctor).name} neordinuje</Typography>
            )}
        </StyledGrid>
    )
}

export default ReservationTermPicker
