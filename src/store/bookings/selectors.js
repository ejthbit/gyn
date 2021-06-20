/* eslint-disable max-len */
import { map, path } from 'ramda'
import { createSelector } from 'reselect'

const stateId = 'bookings'
export const getAvailableTimeslots = path([stateId, 'availableTimeslots', 'slots'])

export const makeAvailableTimeslotsWithTimeOnly = () =>
    createSelector([getAvailableTimeslots], (timeSlots) =>
        map(({ timeSlotStart, timeSlotEnd }) => {
            return {
                timeSlotStart: timeSlotStart.slice(11, 19),
                timeSlotEnd: timeSlotEnd.slice(11, 19),
            }
        }, timeSlots)
    )
