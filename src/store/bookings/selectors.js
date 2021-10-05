/* eslint-disable max-len */
import { parseISO, subHours } from 'date-fns'
import { equals, filter, includes, map, path } from 'ramda'
import { createSelector } from 'reselect'

const stateId = 'bookings'
const DOCTOR_ID = (_, { doctorId }) => doctorId
const BOOKING_IDS = (_, { bookingIds }) => bookingIds

export const getAvailableTimeslots = path([stateId, 'availableTimeslots', 'slots'])
export const getSonographyDates = path([stateId, 'sonographyDates'])
export const lastBookingErrors = path([stateId, 'lastBooking', 'errors'])
export const isSendingBooking = path([stateId, 'lastBooking', 'isLoading'])
export const getOrderFinishedOk = path([stateId, 'lastBooking', 'orderFinishedOk'])
export const getBookingsSelectedDate = path([stateId, 'bookings', 'selectedDate'])
export const getBookings = path([stateId, 'bookings', 'bookings'])
export const getDoctorServicesForSelectedMonth = path([stateId, 'doctorServicesForSelectedMonth', 'data'])
export const getDoctorServicesDaysForSelectedMonth = path([stateId, 'doctorServicesForSelectedMonth', 'data', 'days'])

export const makeAvailableTimeslotsWithTimeOnly = () =>
    createSelector([getAvailableTimeslots], (timeSlots) =>
        map(({ timeSlotStart, timeSlotEnd }) => {
            return {
                timeSlotStart: timeSlotStart.slice(11, 19),
                timeSlotEnd: timeSlotEnd.slice(11, 19),
            }
        }, timeSlots)
    )
export const makeBookingsByIdsSelector = () =>
    createSelector([getBookings, BOOKING_IDS], (bookings, bookingIds) =>
        filter(({ id }) => includes(id, bookingIds), bookings)
    )

export const makeBookingsSelector = () =>
    createSelector(
        [getBookings],
        (bookings) =>
            map(({ id, contact, name, start, end, birthdate, completed }) => {
                return {
                    id,
                    start,
                    end,
                    name,
                    birthdate,
                    email: contact?.email ?? '',
                    phone: contact?.phone ?? '',
                    completed,
                }
            }, bookings) ?? []
    )
export const makeCalendarEventsSelector = () =>
    createSelector(
        [getBookings],
        (bookings) =>
            map(
                ({ id, name, start, end, birthdate }) => ({
                    id,
                    start: subHours(parseISO(start), 2),
                    end: subHours(parseISO(end), 2),
                    title: `${name} - ${birthdate}`,
                    resource: {
                        booked: true,
                    },
                }),
                bookings
            ) ?? []
    )

export const makeDoctorServicesByDoctorId = () =>
    createSelector([getDoctorServicesDaysForSelectedMonth, DOCTOR_ID], (days, doctorId) =>
        equals(doctorId, '')
            ? days ?? []
            : filter((day) => equals(day.doctorId.toString(), doctorId.toString()), days ?? [])
    )
