/* eslint-disable camelcase */
import { createSlice } from '@reduxjs/toolkit'
import { logIntoAdministration } from './actions'

/* RTK uses on background Immer library.
This means you can write code that "mutates" the state inside the reducer,
and Immer will safely return a correct immutably updated result. */

const administrationInitialState = {
    adminState: {
        isLoading: false,
        error: undefined,
        isLoggedIn: JSON.parse(localStorage.getItem('user'))?.success ?? false,
    },
}
const administrationSlice = createSlice({
    name: 'administration',
    initialState: administrationInitialState,
    reducers: {
        logout: (state) => {
            state.adminState.isLoggedIn = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logIntoAdministration.pending, (state) => {
            state.adminState.isLoading = true
            state.adminState.error = undefined
        })
        builder.addCase(logIntoAdministration.fulfilled, (state, action) => {
            state.adminState.isLoading = false
            state.adminState.isLoggedIn = action.payload.success
        })
        builder.addCase(logIntoAdministration.rejected, (state, action) => {
            state.adminState.isLoading = false
            state.adminState.error = action.error
        })
    },
})

export const { logout } = administrationSlice.actions
export default administrationSlice.reducer
