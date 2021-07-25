/* eslint-disable camelcase */
import { createSlice } from '@reduxjs/toolkit'
import { isNil } from 'ramda'

/* RTK uses on background Immer library.
This means you can write code that "mutates" the state inside the reducer,
and Immer will safely return a correct immutably updated result. */

const reservationProcessInitialState = {
    preferredDoctor: '',
    selectedDate: new Date().toISOString().slice(0, 10),
    selectedTime: '',
    activeStep: 0,
    contactInformation: {
        name: '',
        email: '',
        phone: '',
        birthDate: null,
    },
}
const reservationProcessSlice = createSlice({
    name: 'reservationProcess',
    initialState: reservationProcessInitialState,
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
        clearReservation: () => reservationProcessInitialState,
    },
})

export const {
    setActiveStep,
    setSelectedDate,
    setPreferredDoctor,
    setSelectedTime,
    setContactInformation,
    setOrderFinishedOk,
    clearReservation,
    setReservationBtnDisabled,
} = reservationProcessSlice.actions
export default reservationProcessSlice.reducer
