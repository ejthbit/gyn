/* eslint-disable camelcase */
import { createSlice } from '@reduxjs/toolkit'
import { createDoctorServiceForMonth, logIntoAdministration, updateDoctorServiceForMonth } from './actions'

/* RTK uses on background Immer library.
This means you can write code that "mutates" the state inside the reducer,
and Immer will safely return a correct immutably updated result. */

const administrationInitialState = {
    adminState: {
        isLoading: false,
        error: undefined,
        isLoggedIn: JSON.parse(localStorage.getItem('user'))?.success ?? false,
        automaticallyLoggedOut: false,
        user: {
            name: JSON.parse(localStorage.getItem('user'))?.user?.name ?? null,
            default_workplace: JSON.parse(localStorage.getItem('user'))?.user?.default_workplace ?? null,
        },
    },
    servicesOperation: {
        isLoading: false,
        error: undefined,
        finishedOk: undefined,
    },
}
const administrationSlice = createSlice({
    name: 'administration',
    initialState: administrationInitialState,
    reducers: {
        logout: (state) => {
            state.adminState.isLoggedIn = false
            state.adminState.user = null
        },
        logOutAutomatically: (state) => {
            state.adminState.isLoggedIn = false
            state.adminState.automaticallyLoggedOut = !state.adminState.automaticallyLoggedOut
            state.adminState.user = null
        },
        clearServicesOperationState: (state) => {
            state.servicesOperation = administrationInitialState.servicesOperation
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(logIntoAdministration.pending, (state) => {
                state.adminState.isLoading = true
                state.adminState.error = undefined
            })
            .addCase(logIntoAdministration.fulfilled, (state, action) => {
                state.adminState.isLoading = false
                state.adminState.isLoggedIn = action.payload.success
                state.adminState.user = action.payload.user
            })
            .addCase(logIntoAdministration.rejected, (state, action) => {
                state.adminState.isLoading = false
                state.adminState.error = action.error
            })
            .addCase(updateDoctorServiceForMonth.fulfilled, (state) => {
                state.servicesOperation.isLoading = false
                state.servicesOperation.finishedOk = true
            })
            .addCase(updateDoctorServiceForMonth.rejected, (state, action) => {
                state.servicesOperation.isLoading = false
                state.servicesOperation.error = action.error
                state.servicesOperation.finishedOk = false
            })
            .addCase(createDoctorServiceForMonth.fulfilled, (state) => {
                state.servicesOperation.isLoading = false
                state.servicesOperation.finishedOk = true
            })
            .addCase(createDoctorServiceForMonth.rejected, (state, action) => {
                state.servicesOperation.isLoading = false
                state.servicesOperation.error = action.error
                state.servicesOperation.finishedOk = false
            })
    },
})

export const { logout, logOutAutomatically, clearServicesOperationState } = administrationSlice.actions
export default administrationSlice.reducer
