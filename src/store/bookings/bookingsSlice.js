/* eslint-disable camelcase */
import { createSlice } from '@reduxjs/toolkit'
import {
    fetchAvailableTimeslots,
    bookAnAppointment,
    fetchBookings,
    fetchDoctorServicesForSelectedMonth,
} from './actions'

/* RTK uses on background Immer library.
This means you can write code that "mutates" the state inside the reducer,
and Immer will safely return a correct immutably updated result. */

const bookingsInitialState = {
    bookings: {
        isLoading: false,
        bookings: [],
        error: undefined,
        selectedDate: {
            from: null,
            to: null,
        },
    },
    availableTimeslots: {
        isLoading: false,
        errors: undefined,
        slots: [],
    },
    lastBooking: {
        isLoading: false,
        errors: undefined,
        orderFinishedOk: false,
    },
    doctorServicesForSelectedMonth: {
        isLoading: false,
        errors: undefined,
        data: [],
    },
}
const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: bookingsInitialState,
    reducers: {
        clearTimeslots: (state) => {
            state.availableTimeslots.slots = []
        },
        clearBooking: (state) => {
            state.lastBooking.errors = undefined
            state.lastBooking.orderFinishedOk = false
        },
        setBookingsViewDate: (state, action) => {
            state.bookings.selectedDate = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAvailableTimeslots.pending, (state) => {
            state.availableTimeslots.isLoading = true
            state.availableTimeslots.error = undefined
        })
        builder.addCase(fetchAvailableTimeslots.fulfilled, (state, action) => {
            state.availableTimeslots.isLoading = false
            state.availableTimeslots.slots = action.payload
        })
        builder.addCase(fetchAvailableTimeslots.rejected, (state, action) => {
            state.availableTimeslots.isLoading = false
            state.availableTimeslots.error = action.error
        })
        builder.addCase(bookAnAppointment.pending, (state) => {
            state.lastBooking.isLoading = true
            state.lastBooking.errors = undefined
        })
        builder.addCase(bookAnAppointment.rejected, (state, action) => {
            state.lastBooking.isLoading = false
            state.lastBooking.errors = action.payload.errors
        })

        builder.addCase(bookAnAppointment.fulfilled, (state) => {
            state.lastBooking.isLoading = false
            state.lastBooking.errors = undefined
            state.lastBooking.orderFinishedOk = true
        })
        builder.addCase(fetchBookings.pending, (state) => {
            state.bookings.isLoading = true
            state.bookings.error = undefined
        })
        builder.addCase(fetchBookings.fulfilled, (state, action) => {
            state.bookings.isLoading = false
            state.bookings.bookings = action.payload
        })
        builder.addCase(fetchBookings.rejected, (state, action) => {
            state.bookings.isLoading = false
            state.bookings.error = action.error
        })
        builder.addCase(fetchDoctorServicesForSelectedMonth.pending, (state) => {
            state.doctorServicesForSelectedMonth.isLoading = true
            state.doctorServicesForSelectedMonth.error = undefined
        })
        builder.addCase(fetchDoctorServicesForSelectedMonth.fulfilled, (state, action) => {
            state.doctorServicesForSelectedMonth.isLoading = false
            state.doctorServicesForSelectedMonth.data = action.payload
        })
        builder.addCase(fetchDoctorServicesForSelectedMonth.rejected, (state, action) => {
            state.doctorServicesForSelectedMonth.isLoading = false
            state.doctorServicesForSelectedMonth.error = action.error
        })
    },
})

export const { clearTimeslots, clearBooking, setBookingsViewDate } = bookingsSlice.actions
export default bookingsSlice.reducer
