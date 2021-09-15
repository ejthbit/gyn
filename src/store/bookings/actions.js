import { createAsyncThunk } from '@reduxjs/toolkit'
import { addMinutes } from 'date-fns'
import { forEach } from 'ramda'
import axiosGynInstance from '../../api/config'
import {
    getContactInformation,
    getSelectedAmbulance,
    getSelectedDate,
    getSelectedTime,
} from '../reservationProcess/selectors'

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

export const fetchBookings = createAsyncThunk('bookings/fetchBookings', async ({ from, to, workplace }) => {
    const URL = `${ID}/getBookings/${from}/${to}`
    const res = await axiosGynInstance.get(workplace ? `${URL}/${workplace}` : URL)
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
export const fastBooking = createAsyncThunk(
    'bookings/fastBooking',
    async ({ name, start, end }, { getState, rejectWithValue }) => {
        const state = getState()
        const selectedAmbulanceId = getSelectedAmbulance(state)
        const URL = `${ID}/booking`
        try {
            const res = await axiosGynInstance.post(URL, {
                name,
                birthDate: new Date().toISOString().slice(0, 10),
                start,
                end,
                workplace: selectedAmbulanceId,
                contact: { email: '', phone: '' },
            })
            return res.data
        } catch (error) {
            if (!error.response) throw error
            return rejectWithValue(error.response.data)
        }
    }
)

export const bookAnAppointment = createAsyncThunk(
    'bookings/bookAnAppointment',
    async (arg, { getState, rejectWithValue }) => {
        const state = getState()
        const { name, email, phone, birthDate } = getContactInformation(state)
        const selectedAmbulanceId = getSelectedAmbulance(state)

        const selectedDate = getSelectedDate(state)
        const selectedTime = getSelectedTime(state)

        const URL = `${ID}/booking`
        const start = `${selectedDate}T${selectedTime}.000Z`
        try {
            const res = await axiosGynInstance.post(URL, {
                ...((email || phone) && { contact: { email, phone } }),
                name,
                birthDate,
                start: `${selectedDate}T${selectedTime}.000Z`,
                end: addMinutes(new Date(start), 15).toISOString(),
                workplace: selectedAmbulanceId,
            })
            return res.data
        } catch (error) {
            if (!error.response) throw error
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteBooking = createAsyncThunk('bookings/deleteBookings', async (bookingId) => {
    const URL = `${ID}/booking/${bookingId}`
    const res = await axiosGynInstance.delete(URL)
    return res.data
})

export const deleteBookings = (selectedItems) => (dispatch) =>
    forEach((bookingId) => dispatch(deleteBooking(bookingId)), selectedItems)

export const patchBooking = createAsyncThunk('bookings/patchBooking', async (updatedBooking) => {
    const { id: bookingId } = updatedBooking
    const URL = `${ID}/booking/${bookingId}`
    const res = await axiosGynInstance.put(URL, updatedBooking)
    return res.data
})
