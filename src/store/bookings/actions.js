import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosBookingsInstance } from '../../api/config'
import { getSelectedDate, getSelectedTime, getContactInformation } from '../reservationProcess/selectors'

/**
 * @desc fetches availableTimeSlots between from and to dates.
 * @returns {array} Array of object - which contains availableTimeslots between from and to
 */
export const fetchAvailableTimeslots = createAsyncThunk('bookings/fetchAvailableTimeslots', async ({ from, to }) => {
    const URL = `/getAvailableSlots/${from}/${to}`
    const res = await axiosBookingsInstance.get(URL)
    return res.data
})

export const fetchBookings = createAsyncThunk('bookings/fetchBookings', async ({ from, to }) => {
    const URL = `/getBookings/${from}/${to}`
    const res = await axiosBookingsInstance.get(URL)
    return res.data
})
export const fetchDoctorServicesForSelectedMonth = createAsyncThunk(
    'bookings/fetchDoctorServicesForSelectedMonth',
    async (month) => {
        console.log(month)
        const URL = `/getDoctorServicesForMonth`
        const res = await axiosBookingsInstance.get(URL)
        return res.data
    }
)

export const bookAnAppointment = createAsyncThunk(
    'bookings/bookAnAppointment',
    async (arg, { getState, rejectWithValue }) => {
        const state = getState()
        const { name, email, phone, birthDate } = getContactInformation(state)
        const selectedDate = getSelectedDate(state)
        const selectedTime = getSelectedTime(state)

        const URL = '/booking'
        try {
            const res = await axiosBookingsInstance.post(URL, {
                ...((email || phone) && { contact: { email, phone } }),
                name,
                birthDate,
                timeofbooking: `${selectedDate}T${selectedTime}.000Z`,
            })
            return res.data
        } catch (error) {
            if (!error.response) throw error
            return rejectWithValue(error.response.data)
        }
    }
)
