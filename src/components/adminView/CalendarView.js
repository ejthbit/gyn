/* eslint-disable react/display-name */
import { isMobile } from '@utilities/checkDeviceType'
import isNilOrEmpty from '@utilities/isNilOrEmpty'
import useMemoizedSelector from '@utilities/useMemoSelector'
import { addMinutes, format, getDay, parse, startOfWeek } from 'date-fns'
import cs from 'date-fns/locale/cs'
import { equals, find } from 'ramda'
import React, { Children, cloneElement, useEffect, useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBookings } from 'src/store/bookings/actions'
import { getBookingsSelectedDate, makeCalendarEventsSelector } from 'src/store/bookings/selectors'
import { getSelectedAmbulance } from 'src/store/reservationProcess/selectors'
import CalendarViewCreateEventDialog from './CalendarViewCreateEventDialog'
import CalendarViewCustomToolbar from './CalendarViewCustomToolbar'
import './css/custom-calendar.css'
import CustomEventCalendar from './CustomEventCalendar'

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
            padding: 8,
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

const TouchCellWrapper = ({ children, value, onSelectSlot }) => {
    return cloneElement(Children.only(children), {
        onTouchEnd: () => onSelectSlot({ action: 'click', slots: [value] }),
        style: {
            padding: 0,
            flex: 1,
            minHeight: '8vh',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            className: `${children}`,
        },
    })
}
const calendarFormats = {
    dayRangeHeaderFormat: ({ start, end }) =>
        format(new Date(start), 'dd/MM/yyyy') + ' - ' + format(new Date(end), 'dd/MM/yyyy'),
    dayFormat: (date) => format(date, 'dd/MM/yyyy'),
    dayHeaderFormat: (date) => format(date, 'dd/MM/yyyy'),
}
const SLOT_DURATION = 15 // In minutes

const CalendarView = () => {
    const dispatch = useDispatch()
    const bookingsViewDate = useSelector(getBookingsSelectedDate)
    const selectedAmbulanceId = useSelector(getSelectedAmbulance)

    const bookings = useMemoizedSelector(makeCalendarEventsSelector, {}, [bookingsViewDate])
    const [newAppointmentDate, setNewAppointmentDate] = useState({})

    const handleToggleCreationModal = () => setNewAppointmentDate({})

    const onSelectSlot = ({ action, slots }) => {
        const timeSlotStart = slots[0] // start date/time of the event
        const isSlotBooked = !!find(({ start }) => equals(start, timeSlotStart), bookings)
        if (isSlotBooked) return
        return (
            equals(action, 'click') &&
            setNewAppointmentDate({
                start: timeSlotStart.toISOString(),
                end: addMinutes(timeSlotStart, SLOT_DURATION).toISOString(),
            })
        )
    }

    useEffect(() => {
        const { from, to } = bookingsViewDate
        if (!isNilOrEmpty(from) && !isNilOrEmpty(to))
            dispatch(fetchBookings({ from, to, workplace: selectedAmbulanceId }))
    }, [bookingsViewDate, selectedAmbulanceId])

    return (
        <>
            <Calendar
                formats={calendarFormats}
                min={new Date(0, 0, 0, 7, 0, 0)}
                max={new Date(0, 0, 0, 19, 0, 0)}
                localizer={localizer}
                events={bookings}
                views={{ work_week: true, day: true }}
                defaultView={isMobile ? 'day' : 'work_week'}
                culture="cs"
                defaultDate={new Date()}
                slotPropGetter={customSlotPropGetter}
                eventPropGetter={customStyleEventPropGetter}
                dayPropGetter={customStyleDayPropGetter}
                startAccessor="start"
                selectable
                onSelectSlot={onSelectSlot}
                components={{
                    toolbar: CalendarViewCustomToolbar,
                    event: CustomEventCalendar,
                    timeSlotWrapper: (props) => <TouchCellWrapper {...props} onSelectSlot={onSelectSlot} />,
                }}
                step={SLOT_DURATION}
                endAccessor="end"
                onSelecting={() => false}
                style={{ height: '75vh', margin: 20 }}
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
