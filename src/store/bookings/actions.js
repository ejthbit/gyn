import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosBookingsInstance } from '../../api/config'

/**
 * @desc fetches availableTimeSlots between from and to dates.
 * @returns {array} Array of object - which contains availableTimeslots between from and to
 */
export const fetchAvailableTimeslots = createAsyncThunk(
    'bookings/fetchAvailableTimeslots',
    async ({ from, to }) => {
        const URL = `/getAvailableSlots/${from}/${to}`
        const res = await axiosBookingsInstance.get(URL)
        return res.data
    }
)

export const BookAnAppointment = createAsyncThunk(
    'bookings/bookAnAppointment',
    async (contact, patientName, timeOfBooking) => {
        const URL = '/booking'
        const res = await axiosBookingsInstance.post(URL, {
            ...(contact && { contact }),
            name: patientName,
            timeOfBooking,
        })
        return res.data
    }
)
