import isNilOrEmpty from '@utilities/isNilOrEmpty'
import useMemoizedSelector from '@utilities/useMemoSelector'
import { format, getDay, parse, startOfWeek, endOfWeek } from 'date-fns'
import cs from 'date-fns/locale/cs'
import React, { useEffect, useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBookings } from 'src/store/bookings/actions'
import { setBookingsViewDate } from 'src/store/bookings/bookingsSlice'
import { getBookingsSelectedDate, makeCalendarEventsSelector } from 'src/store/bookings/selectors'
import { getSelectedAmbulance } from 'src/store/reservationProcess/selectors'
import CalendarViewCreateEventDialog from './CalendarViewCreateEventDialog'
import './css/custom-calendar.css'

const locales = {
    cs,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})
const customStyleDayPropGetter = () => {
    return {
        className: 'headerDay',
        style: {
            minWidth: '3vh',
        },
    }
}

/**
 * Styling event container
 */
const customStyleEventPropGetter = () => {
    return {
        className: 'event',
        style: {
            padding: 0,
            flex: 1,
            minHeight: '8vh',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            pointerEvents: 'none',
        },
    }
}

/**
 * Styling left column with times
 * row height
 */
const customSlotPropGetter = () => {
    return {
        className: 'slot',
        style: {
            minHeight: '8vh',
        },
    }
}

const CalendarView = () => {
    const dispatch = useDispatch()
    const bookingsViewDate = useSelector(getBookingsSelectedDate)
    const selectedAmbulanceId = useSelector(getSelectedAmbulance)

    const bookings = useMemoizedSelector(makeCalendarEventsSelector, {}, [bookingsViewDate])
    const [newAppointmentDate, setNewAppointmentDate] = useState({})

    const handleToggleCreationModal = () => setNewAppointmentDate({})

    const handleSetCreationDate = ({ start, end }) =>
        setNewAppointmentDate({ start: start.toISOString(), end: end.toISOString() })

    // TODO: Move me to custom header
    useEffect(() => {
        dispatch(
            setBookingsViewDate({
                from: startOfWeek(Date.now(), { weekStartsOn: 1 }).toISOString(),
                to: endOfWeek(Date.now(), { weekStartsOn: 1 }).toISOString(),
            })
        )
    }, [])

    useEffect(() => {
        const { from, to } = bookingsViewDate
        if (!isNilOrEmpty(from) && !isNilOrEmpty(to))
            dispatch(fetchBookings({ from, to, workplace: selectedAmbulanceId }))
    }, [bookingsViewDate, selectedAmbulanceId])

    return (
        <>
            <Calendar
                min={new Date(0, 0, 0, 7, 0, 0)}
                max={new Date(0, 0, 0, 19, 0, 0)}
                localizer={localizer}
                events={bookings}
                views={{ work_week: true, day: true }}
                defaultView="work_week"
                culture="cs"
                defaultDate={new Date()}
                slotPropGetter={customSlotPropGetter}
                eventPropGetter={customStyleEventPropGetter}
                dayPropGetter={customStyleDayPropGetter}
                startAccessor="start"
                selectable="ignoreEvents"
                onSelectSlot={handleSetCreationDate}
                step={15}
                endAccessor="end"
                onSelecting={() => false}
                style={{ height: '80vh', margin: 20 }}
            />
            <CalendarViewCreateEventDialog
                open={!isNilOrEmpty(newAppointmentDate)}
                handleClose={handleToggleCreationModal}
                data={newAppointmentDate}
            />
        </>
    )
}

export default CalendarView
