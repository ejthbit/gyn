/* eslint-disable camelcase */
import { createSlice } from '@reduxjs/toolkit'
import { fetchAvailableTimeslots, bookAnAppointment } from './actions'

/* RTK uses on background Immer library.
This means you can write code that "mutates" the state inside the reducer,
and Immer will safely return a correct immutably updated result. */

const bookingsInitialState = {
    bookings: {},
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
    },
})

export const { clearTimeslots, clearBooking } = bookingsSlice.actions
export default bookingsSlice.reducer
