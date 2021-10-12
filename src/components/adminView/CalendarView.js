/* eslint-disable react/display-name */
import { Box, Fade, Grid, IconButton, Typography } from '@mui/material'
import { Refresh } from '@mui/icons-material'
import { isMobile } from '@utilities/checkDeviceType'
import isNilOrEmpty from '@utilities/isNilOrEmpty'
import useMemoizedSelector from '@utilities/useMemoSelector'
import { addHours, addMinutes, format, getDay, parse, startOfWeek, subHours } from 'date-fns'
import cs from 'date-fns/locale/cs'
import { equals, find } from 'ramda'
import React, { useEffect, useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from 'src/store/administration/selectors'
import { fetchBookings, patchBooking } from 'src/store/bookings/actions'
import { getBookingsSelectedDate, makeCalendarEventsSelector } from 'src/store/bookings/selectors'
import { getSelectedAmbulance } from 'src/store/reservationProcess/selectors'
import CalendarViewCreateEventDialog from './CalendarViewCreateEventDialog'
import CalendarViewCustomToolbar from './CalendarViewCustomToolbar'
import './css/custom-calendar.css'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import CustomEventCalendar from './CustomEventCalendar'
import EventDetailModal from './EventDetailModal'
const DragAndDropCalendar = withDragAndDrop(Calendar)
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
    const [draggedEvent, setDraggedEvent] = useState(null)
    const [openEventDialogEvent, setOpenEventDialogEvent] = useState(null)
    const handleToggleCreationModal = () => setNewAppointmentDate({})
    const handleOpenEventDialog = (existingEvent) => setOpenEventDialogEvent(existingEvent)
    const handleGetBookingsInSelectedTimeRange = () =>
        dispatch(fetchBookings({ from, to, workplace: selectedAmbulanceId }))

    const onSelectEvent = (event) => {
        const timeSlotStart = addHours(event.start, 2) // start date/time of the event
        const isSlotBooked = find(({ start }) => equals(start, subHours(timeSlotStart, 2)), bookings)
        if (isSlotBooked) return handleOpenEventDialog(event)
    }
    const onSelectSlot = ({ action, slots }) => {
        const timeSlotStart = addHours(slots[0], 2) // start date/time of the event
        const timeSlotEnd = addHours(slots[slots.length - 1], 2)
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

    const handleDragStart = (event) => setDraggedEvent(event)

    const dragFromOutsideItem = () => draggedEvent

    const moveEvent = ({ event, start, end }) =>
        dispatch(
            patchBooking({ id: event.id, start: addHours(start, 2).toISOString(), end: addHours(end, 2).toISOString() })
        )

    const onDropFromOutside = ({ start, end }) => {
        const event = {
            id: draggedEvent.id,
            start,
            end,
        }
        setDraggedEvent(null)
        moveEvent({ event, start, end })
    }

    useEffect(() => {
        if (!isNilOrEmpty(from) && !isNilOrEmpty(to) && !isNilOrEmpty(selectedAmbulanceId) && loggedUser)
            handleGetBookingsInSelectedTimeRange()
    }, [bookingsViewDate, selectedAmbulanceId])

    return (
        <Fade in timeout={500}>
            <Grid container>
                <Grid item container alignItems="center" justifyContent="space-between">
                    <Box marginLeft={2}>
                        <Typography variant="h6">Kalendař</Typography>
                    </Box>
                    <IconButton onClick={handleGetBookingsInSelectedTimeRange} size="large">
                        <Refresh />
                    </IconButton>
                </Grid>
                <Grid item xs={12}>
                    <DragAndDropCalendar
                        formats={calendarFormats}
                        onEventDrop={moveEvent}
                        dragFromOutsideItem={draggedEvent ? dragFromOutsideItem() : null}
                        onDropFromOutside={onDropFromOutside}
                        handleDragStart={handleDragStart}
                        min={new Date(0, 0, 0, 7, 0, 0)}
                        max={new Date(0, 0, 0, 19, 0, 0)}
                        localizer={localizer}
                        events={bookings}
                        views={{ work_week: true, day: true }}
                        defaultView={isMobile ? 'day' : 'work_week'}
                        culture="cs"
                        defaultDate={new Date()}
                        slotPropGetter={customSlotPropGetter}
                        dayPropGetter={customStyleDayPropGetter}
                        startAccessor="start"
                        selectable
                        resizable={false}
                        onSelectEvent={onSelectEvent}
                        onSelectSlot={onSelectSlot}
                        components={{
                            toolbar: CalendarViewCustomToolbar,
                            event: CustomEventCalendar,
                        }}
                        step={SLOT_DURATION}
                        endAccessor="end"
                        style={{ height: isMobile ? '100vh' : '75vh', margin: 8 }}
                        longPressThreshold={10}
                    />
                    <CalendarViewCreateEventDialog
                        open={!isNilOrEmpty(newAppointmentDate)}
                        handleClose={handleToggleCreationModal}
                        data={newAppointmentDate}
                    />
                    <EventDetailModal event={openEventDialogEvent} handleClose={() => setOpenEventDialogEvent(null)} />
                </Grid>
            </Grid>
        </Fade>
    )
}

export default CalendarView
