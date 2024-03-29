/* eslint-disable camelcase */
import { createSlice } from '@reduxjs/toolkit'
import getISODateStringWithCorrectOffset from '@utilities/getISODateStringWithCorrectOffset'
import { isNil } from 'ramda'
import { fetchAmbulances, fetchDoctorsForSelectedAmbulance, fetchBookingCategories } from './actions'

/* RTK uses on background Immer library.
This means you can write code that "mutates" the state inside the reducer,
and Immer will safely return a correct immutably updated result. */

const configurationInitialState = {
    ambulances: {
        isLoading: false,
        error: undefined,
        data: [],
    },
    doctorsForSelectedAmbulance: {
        isLoading: false,
        error: undefined,
        data: [],
    },
    bookingCategories: {
        isLoading: false,
        error: undefined,
        data: [],
    },
}
const reservationProcessInitialState = {
    selectedAmbulance: null,
    preferredDoctor: '',
    selectedDate: getISODateStringWithCorrectOffset(new Date()).slice(0, 10),
    selectedTime: '',
    selectedCategory: '',
    activeStep: 0,
    contactInformation: {
        name: '',
        email: null,
        phone: '',
        birthDate: null,
    },
    isReservationBtnDisabled: false,
}
const reservationProcessSlice = createSlice({
    name: 'reservationProcess',
    initialState: { ...configurationInitialState, ...reservationProcessInitialState },
    reducers: {
        setActiveStep: (state, action) => {
            state.activeStep += action.payload
        },
        setSelectedDate: (state, action) => {
            state.selectedDate = action.payload.slice(0, 10)
        },
        setPreferredDoctor: (state, action) => {
            state.preferredDoctor = action.payload
        },
        setSelectedTime: (state, action) => {
            state.selectedTime = action.payload
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload
        },
        setSelectedAmbulance: (state, action) => {
            state.selectedAmbulance = action.payload
        },
        setContactInformation: (state, action) => {
            const { name, email, phone, birthDate } = action.payload
            state.contactInformation = {
                name,
                email,
                phone,
                birthDate: !isNil(birthDate) ? birthDate.slice(0, 10) : state.contactInformation.birthDate,
            }
        },
        setReservationBtnDisabled: (state, action) => {
            state.isReservationBtnDisabled = action.payload
        },
        clearReservation: (state) => (state = { ...state, ...reservationProcessInitialState }),
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAmbulances.pending, (state) => {
                state.ambulances.isLoading = true
                state.ambulances.error = undefined
            })
            .addCase(fetchAmbulances.fulfilled, (state, action) => {
                const { data } = action.payload
                state.ambulances.isLoading = false
                state.ambulances.data = data
            })
            .addCase(fetchAmbulances.rejected, (state, action) => {
                state.ambulances.isLoading = false
                state.ambulances.error = action.error
            })
            .addCase(fetchDoctorsForSelectedAmbulance.pending, (state) => {
                state.doctorsForSelectedAmbulance.isLoading = true
                state.doctorsForSelectedAmbulance.error = undefined
            })
            .addCase(fetchDoctorsForSelectedAmbulance.fulfilled, (state, action) => {
                const { data } = action.payload
                state.doctorsForSelectedAmbulance.isLoading = false
                state.doctorsForSelectedAmbulance.data = data
            })
            .addCase(fetchDoctorsForSelectedAmbulance.rejected, (state, action) => {
                state.doctorsForSelectedAmbulance.isLoading = false
                state.doctorsForSelectedAmbulance.error = action.error
            })
            .addCase(fetchBookingCategories.pending, (state) => {
                state.bookingCategories.isLoading = true
                state.bookingCategories.error = undefined
            })
            .addCase(fetchBookingCategories.fulfilled, (state, action) => {
                const { data } = action.payload
                state.bookingCategories.isLoading = false
                state.bookingCategories.data = data
            })
            .addCase(fetchBookingCategories.rejected, (state, action) => {
                state.bookingCategories.isLoading = false
                state.bookingCategories.error = action.error
            })
    },
})

export const {
    setActiveStep,
    setSelectedDate,
    setPreferredDoctor,
    setSelectedAmbulance,
    setSelectedTime,
    setSelectedCategory,
    setContactInformation,
    setOrderFinishedOk,
    clearReservation,
    setReservationBtnDisabled,
} = reservationProcessSlice.actions
export default reservationProcessSlice.reducer
