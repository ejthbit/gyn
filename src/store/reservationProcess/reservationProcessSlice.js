/* eslint-disable camelcase */
import { createSlice } from '@reduxjs/toolkit'

/* RTK uses on background Immer library.
This means you can write code that "mutates" the state inside the reducer,
and Immer will safely return a correct immutably updated result. */

const reservationProcessInitialState = {
    selectedDate: null,
    selectedTime: null,
    activeStep: 0,
    contactInformation: {
        name: '',
        email: '',
        phone: '',
        birthDate: '',
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
        setSelectedTime: (state, action) => {
            state.selectedTime = action.payload.slice(11, 16)
        },
        setContactInformation: (state, action) => {
            const { name, email, phone, birthDate } = action.payload
            state.contactInformation = {
                name,
                email,
                phone,
                birthDate,
            }
        },
    },
})

export const { setActiveStep, setSelectedDate, setSelectedTime, setContactInformation } =
    reservationProcessSlice.actions
export default reservationProcessSlice.reducer
