/* eslint-disable camelcase */
import { createSlice } from '@reduxjs/toolkit'

/* RTK uses on background Immer library.
This means you can write code that "mutates" the state inside the reducer,
and Immer will safely return a correct immutably updated result. */

const reservationProcessInitialState = {
    selectedDate: new Date().toISOString().slice(0, 10),
    selectedTime: '',
    activeStep: 0,
    contactInformation: {
        name: '',
        email: '',
        phone: '',
        birthDate: null,
    },
    orderFinishedOk: false,
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
            state.selectedTime = action.payload
        },
        setContactInformation: (state, action) => {
            const { name, email, phone, birthDate } = action.payload
            state.contactInformation = {
                name,
                email,
                phone,
                birthDate: birthDate.slice(0, 10),
            }
        },
        setOrderFinishedOk: (state, action) => {
            state.orderFinishedOk = action.payload
        },
    },
})

export const { setActiveStep, setSelectedDate, setSelectedTime, setContactInformation, setOrderFinishedOk } =
    reservationProcessSlice.actions
export default reservationProcessSlice.reducer
