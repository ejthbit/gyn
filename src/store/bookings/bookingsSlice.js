/* eslint-disable camelcase */
import { createSlice } from '@reduxjs/toolkit'
import { fetchAvailableTimeslots } from './actions'

/* RTK uses on background Immer library.
This means you can write code that "mutates" the state inside the reducer,
and Immer will safely return a correct immutably updated result. */

const bookingsInitialState = {
    bookings: {},
    availableTimeslots: {
        isLoading: false,
        error: undefined,
        slots: [],
    },
}
const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: bookingsInitialState,
    reducers: {
        clearTimeslots: (state) => {
            state.availableTimeslots.slots = []
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
    },
})

export const { clearTimeslots } = bookingsSlice.actions
export default bookingsSlice.reducer
