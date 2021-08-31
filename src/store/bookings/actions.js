import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosGynInstance from '../../api/config'
import { getSelectedDate, getSelectedTime, getContactInformation } from '../reservationProcess/selectors'

/**
 * @desc fetches availableTimeSlots between from and to dates.
 * @returns {array} Array of object - which contains availableTimeslots between from and to
 */
const ID = '/bookings'
export const fetchAvailableTimeslots = createAsyncThunk('bookings/fetchAvailableTimeslots', async ({ from, to }) => {
    const URL = `${ID}/getAvailableSlots/${from}/${to}`
    const res = await axiosGynInstance.get(URL)
    return res.data
})

export const fetchBookings = createAsyncThunk('bookings/fetchBookings', async ({ from, to }) => {
    const URL = `${ID}/getBookings/${from}/${to}`
    const res = await axiosGynInstance.get(URL)
    return res.data
})

export const fetchDoctorServicesForSelectedMonth = createAsyncThunk(
    'bookings/fetchDoctorServicesForSelectedMonth',
    async (month) => {
        const URL = `${ID}/getDoctorServicesForMonth/${month}`
        const res = await axiosGynInstance.get(URL)
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

        const URL = `${ID}/booking`
        try {
            const res = await axiosGynInstance.post(URL, {
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
