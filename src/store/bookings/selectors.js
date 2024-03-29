/* eslint-disable max-len */
import getDateWithCorrectOffset from '@utilities/getDateWithCorrectOffset'
import isNilOrEmpty from '@utilities/isNilOrEmpty'
import { equals, filter, includes, map, path } from 'ramda'
import { createSelector } from 'reselect'

const stateId = 'bookings'
const DOCTOR_ID = (_, { doctorId }) => doctorId
const BOOKING_IDS = (_, { bookingIds }) => bookingIds
const MONTH = (_, { month }) => month
const SELECTED_WORKPLACE = (_, { selectedWorkplace }) => selectedWorkplace

export const getAvailableTimeslots = path([stateId, 'availableTimeslots', 'slots'])
export const getSonographyDates = path([stateId, 'sonographyDates'])
export const lastBookingErrors = path([stateId, 'lastBooking', 'errors'])
export const isSendingBooking = path([stateId, 'lastBooking', 'isLoading'])
export const getOrderFinishedOk = path([stateId, 'lastBooking', 'orderFinishedOk'])
export const getBookingsSelectedDate = path([stateId, 'bookings', 'selectedDate'])
export const getBookings = path([stateId, 'bookings', 'bookings'])
export const getDoctorServicesForSelectedMonth = path([stateId, 'doctorServices', 'data'])

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
            map(({ id, name, start, end, birthdate, contact, category, completed }) => {
                return {
                    id,
                    start: getDateWithCorrectOffset(start),
                    end: getDateWithCorrectOffset(end),
                    title: `${name} ${!isNilOrEmpty(birthdate) ? `- ${birthdate}` : ''}`,
                    resource: {
                        booked: true,
                        phone: contact?.phone,
                        category,
                        completed,
                    },
                }
            }, bookings) ?? []
    )

export const makeServicesForSelectedMonth = () =>
    createSelector(
        [getDoctorServicesForSelectedMonth, MONTH, SELECTED_WORKPLACE],
        (services, month, selectedWorkplace) =>
            filter(
                (service) => equals(service.month, month) && equals(service.workplace, selectedWorkplace),
                services ?? []
            )[0]
    )

export const makeDoctorServicesByDoctorId = () =>
    createSelector([makeServicesForSelectedMonth(), DOCTOR_ID], (service, doctorId) => {
        return equals(doctorId, '')
            ? service?.days ?? []
            : filter((day) => equals(day.doctorId.toString(), doctorId.toString()), service?.days ?? [])
    })

export const makeServicesSelector = () =>
    createSelector([getDoctorServicesForSelectedMonth], (services) =>
        map(({ id, workplace, month }) => ({ id, workplace, month }), services)
    )
