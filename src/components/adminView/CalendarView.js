/* eslint-disable react/display-name */
import { Box, Grid, IconButton, Typography } from '@material-ui/core'
import { Refresh } from '@material-ui/icons'
import { isMobile } from '@utilities/checkDeviceType'
import isNilOrEmpty from '@utilities/isNilOrEmpty'
import useMemoizedSelector from '@utilities/useMemoSelector'
import { addHours, addMinutes, format, getDay, parse, startOfWeek, subHours } from 'date-fns'
import cs from 'date-fns/locale/cs'
import { equals, find } from 'ramda'
import React, { useEffect, useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from 'src/store/administration/selectors'
import { fetchBookings } from 'src/store/bookings/actions'
import { getBookingsSelectedDate, makeCalendarEventsSelector } from 'src/store/bookings/selectors'
import { getSelectedAmbulance } from 'src/store/reservationProcess/selectors'
import CalendarViewCreateEventDialog from './CalendarViewCreateEventDialog'
import CalendarViewCustomToolbar from './CalendarViewCustomToolbar'
import './css/custom-calendar.css'
import CustomEventCalendar from './CustomEventCalendar'
import EventDetailModal from './EventDetailModal'

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
            minHeight: isMobile ? '7vh' : '4rem',
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
            minHeight: isMobile ? '7vh' : '4rem',
        },
    }
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
    const { from, to } = bookingsViewDate
    const loggedUser = useSelector(getUser)

    const selectedAmbulanceId = useSelector(getSelectedAmbulance)

    const bookings = useMemoizedSelector(makeCalendarEventsSelector, {}, [bookingsViewDate])
    const [newAppointmentDate, setNewAppointmentDate] = useState({})
    const [openEventDialogEvent, setOpenEventDialogEvent] = useState(null)
    const handleToggleCreationModal = () => setNewAppointmentDate({})
    const handleOpenEventDialog = (existingEvent) => setOpenEventDialogEvent(existingEvent)
    const handleGetBookingsInSelectedTimeRange = () =>
        dispatch(fetchBookings({ from, to, workplace: selectedAmbulanceId }))

    const onSelectSlot = ({ action, slots }) => {
        const timeSlotStart = addHours(slots[0], 2) // start date/time of the event
        const timeSlotEnd = addHours(slots[slots.length - 1], 2)
        const isSlotBooked = find(({ start }) => equals(start, subHours(timeSlotStart, 2)), bookings)
        if (isSlotBooked) return handleOpenEventDialog(isSlotBooked)
        return equals(action, 'click')
            ? setNewAppointmentDate({
                  start: timeSlotStart.toISOString(),
                  end: addMinutes(timeSlotStart, SLOT_DURATION).toISOString(),
              })
            : setNewAppointmentDate({
                  start: timeSlotStart.toISOString(),
                  end: timeSlotEnd.toISOString(),
              })
    }

    useEffect(() => {
        if (!isNilOrEmpty(from) && !isNilOrEmpty(to) && !isNilOrEmpty(selectedAmbulanceId) && loggedUser)
            handleGetBookingsInSelectedTimeRange()
    }, [bookingsViewDate, selectedAmbulanceId])

    return (
        <Grid container>
            <Grid item container alignItems="center" justifyContent="space-between">
                <Box marginLeft={2}>
                    <Typography variant="h6">Kalendař</Typography>
                </Box>
                <IconButton onClick={handleGetBookingsInSelectedTimeRange}>
                    <Refresh />
                </IconButton>
            </Grid>
            <Grid item xs={12}>
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
                    }}
                    step={SLOT_DURATION}
                    endAccessor="end"
                    style={{ height: isMobile ? '100vh' : '75vh', margin: 8 }}
                />
                <CalendarViewCreateEventDialog
                    open={!isNilOrEmpty(newAppointmentDate)}
                    handleClose={handleToggleCreationModal}
                    data={newAppointmentDate}
                />
                <EventDetailModal event={openEventDialogEvent} handleClose={() => setOpenEventDialogEvent(null)} />
            </Grid>
        </Grid>
    )
}

export default CalendarView
