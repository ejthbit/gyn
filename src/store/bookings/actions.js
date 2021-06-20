import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosBookingsInstance } from '../../api/config'
import { getSelectedDate, getSelectedTime, getContactInformation } from '../reservationProcess/selectors'
import { setOrderFinishedOk } from '../reservationProcess/reservationProcessSlice'

/**
 * @desc fetches availableTimeSlots between from and to dates.
 * @returns {array} Array of object - which contains availableTimeslots between from and to
 */
export const fetchAvailableTimeslots = createAsyncThunk('bookings/fetchAvailableTimeslots', async ({ from, to }) => {
    const URL = `/getAvailableSlots/${from}/${to}`
    const res = await axiosBookingsInstance.get(URL)
    return res.data
})

export const bookAnAppointment = createAsyncThunk('bookings/bookAnAppointment', async (arg, { dispatch, getState }) => {
    const state = getState()
    const { name } = getContactInformation(state)
    const selectedDate = getSelectedDate(state)
    const selectedTime = getSelectedTime(state)

    const URL = '/booking'
    const res = await axiosBookingsInstance.post(URL, {
        // ...(contact && { contact }),
        name,
        timeofbooking: `${selectedDate}T${selectedTime}.000Z`,
    })
    dispatch(setOrderFinishedOk(res.data.status === 200))
    return res.data
})
