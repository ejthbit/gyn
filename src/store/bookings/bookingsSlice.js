/* eslint-disable camelcase */
import { createSlice } from '@reduxjs/toolkit'
import { equals, filter, map } from 'ramda'
import {
    bookAnAppointment,
    deleteBooking,
    fastBooking,
    fetchAvailableTimeslots,
    fetchBookings,
    fetchDoctorServicesForSelectedMonth,
    getCurrentMonthSonographyDates,
    patchBooking,
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
    doctorServices: {
        isLoading: false,
        errors: undefined,
        data: [],
    },
    sonographyDates: [],
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
        builder
            .addCase(fetchAvailableTimeslots.pending, (state) => {
                state.availableTimeslots.isLoading = true
                state.availableTimeslots.error = undefined
            })
            .addCase(fetchAvailableTimeslots.fulfilled, (state, action) => {
                state.availableTimeslots.isLoading = false
                state.availableTimeslots.slots = action.payload
            })
            .addCase(fetchAvailableTimeslots.rejected, (state, action) => {
                state.availableTimeslots.isLoading = false
                state.availableTimeslots.error = action.error
            })
            .addCase(bookAnAppointment.pending, (state) => {
                state.lastBooking.isLoading = true
                state.lastBooking.errors = undefined
                state.lastBooking.orderFinishedOk = false
            })
            .addCase(bookAnAppointment.rejected, (state, action) => {
                state.lastBooking.isLoading = false
                state.lastBooking.errors = action.payload.errors ?? [{ message: action.error.message }]
            })

            .addCase(bookAnAppointment.fulfilled, (state) => {
                state.lastBooking.isLoading = false
                state.lastBooking.errors = undefined
                state.lastBooking.orderFinishedOk = true
            })
            .addCase(fastBooking.fulfilled, (state, action) => {
                state.bookings.isLoading = false
                state.bookings.errors = undefined
                state.bookings.bookings = [...state.bookings.bookings, action.payload]
            })
            .addCase(fetchBookings.pending, (state) => {
                state.bookings.isLoading = true
                state.bookings.error = undefined
            })
            .addCase(fetchBookings.fulfilled, (state, action) => {
                state.bookings.isLoading = false
                state.bookings.bookings = action.payload
            })
            .addCase(fetchBookings.rejected, (state, action) => {
                state.bookings.isLoading = false
                state.bookings.error = action.error
            })
            .addCase(fetchDoctorServicesForSelectedMonth.pending, (state) => {
                state.doctorServices.isLoading = true
                state.doctorServices.error = undefined
            })
            .addCase(fetchDoctorServicesForSelectedMonth.fulfilled, (state, action) => {
                state.doctorServices.isLoading = false
                state.doctorServices.data = [...state.doctorServices.data, action.payload]
            })
            .addCase(fetchDoctorServicesForSelectedMonth.rejected, (state, action) => {
                state.doctorServices.isLoading = false
                state.doctorServices.error = action.error
            })
            .addCase(deleteBooking.fulfilled, (state, action) => {
                state.bookings.bookings = filter(({ id }) => !equals(id, action.meta.arg), state.bookings.bookings)
            })
            .addCase(patchBooking.fulfilled, (state, action) => {
                state.bookings.bookings = map(
                    (booking) => (equals(booking.id, action.payload.id) ? { ...action.payload } : booking),
                    state.bookings.bookings
                )
            })
            .addCase(getCurrentMonthSonographyDates.fulfilled, (state, action) => {
                state.sonographyDates = action.payload
            })
    },
})

export const { clearTimeslots, clearBooking, setBookingsViewDate } = bookingsSlice.actions
export default bookingsSlice.reducer
