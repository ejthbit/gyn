/* eslint-disable max-len */
import { map, path } from 'ramda'
import { createSelector } from 'reselect'

const stateId = 'bookings'
export const getAvailableTimeslots = path([stateId, 'availableTimeslots', 'slots'])
export const lastBookingErrors = path([stateId, 'lastBooking', 'errors'])
export const isSendingBooking = path([stateId, 'lastBooking', 'isLoading'])
export const getOrderFinishedOk = path([stateId, 'lastBooking', 'orderFinishedOk'])
export const getBookingsSelectedDate = path([stateId, 'bookings', 'selectedDate'])
export const getBookings = path([stateId, 'bookings', 'bookings'])

export const makeAvailableTimeslotsWithTimeOnly = () =>
    createSelector([getAvailableTimeslots], (timeSlots) =>
        map(({ timeSlotStart, timeSlotEnd }) => {
            return {
                timeSlotStart: timeSlotStart.slice(11, 19),
                timeSlotEnd: timeSlotEnd.slice(11, 19),
            }
        }, timeSlots)
    )

export const makeBookingsSelector = () =>
    createSelector([getBookings], (bookings) =>
        map(({ contact, name, timeofbooking, birthdate }) => {
            return { timeofbooking, name, birthdate, email: '', phone: '' }
        }, bookings)
    )
