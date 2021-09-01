import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosGynInstance from '../../api/config'
import { getSelectedDate, getSelectedTime, getContactInformation } from '../reservationProcess/selectors'

/**
 * @desc fetches availableTimeSlots between from and to dates.
 * @returns {array} Array of object - which contains availableTimeslots between from and to
 */
const ID = '/bookings'
export const fetchAvailableTimeslots = createAsyncThunk(
    'bookings/fetchAvailableTimeslots',
    async ({ from, to, workplace }) => {
        const URL = `${ID}/getAvailableSlots/${from}/${to}/${workplace}`
        const res = await axiosGynInstance.get(URL)
        return res.data
    }
)

// TODO: fetchBookingsByCriteria

export const fetchBookings = createAsyncThunk('bookings/fetchBookings', async ({ from, to }) => {
    const URL = `${ID}/getBookings/${from}/${to}`
    const res = await axiosGynInstance.get(URL)
    return res.data
})

export const fetchDoctorServicesForSelectedMonth = createAsyncThunk(
    'bookings/fetchDoctorServicesForSelectedMonth',
    async ({ month, workplace }) => {
        const URL = `${ID}/getDoctorServicesForMonth/${month}/${workplace}`
        const res = await axiosGynInstance.get(URL)
        return res.data
    }
)

export const bookAnAppointment = createAsyncThunk(
    'bookings/bookAnAppointment',
    async (arg, { getState, rejectWithValue }) => {
        const state = getState()
        const { name, email, phone, birthDate } = getContactInformation(state)
        const SELECTED_WORKPLACE_ID = 1
        const selectedDate = getSelectedDate(state)
        const selectedTime = getSelectedTime(state)

        const URL = `${ID}/booking`
        try {
            const res = await axiosGynInstance.post(URL, {
                ...((email || phone) && { contact: { email, phone } }),
                name,
                birthDate,
                timeofbooking: `${selectedDate}T${selectedTime}.000Z`,
                workplace: SELECTED_WORKPLACE_ID,
            })
            return res.data
        } catch (error) {
            if (!error.response) throw error
            return rejectWithValue(error.response.data)
        }
    }
)
