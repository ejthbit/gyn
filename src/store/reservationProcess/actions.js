import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosGynInstance from 'src/api/config'

const ID = 'configuration'

export const fetchAmbulances = createAsyncThunk('reservationProcess/fetchAmbulances', async () => {
    const URL = `${ID}/getAmbulances`
    const res = await axiosGynInstance.get(URL)
    return res.data
})

export const fetchBookingCategories = createAsyncThunk('reservationProcess/fetchBookingCategories', async () => {
    const URL = `${ID}/getBookingCategories`
    const res = await axiosGynInstance.get(URL)
    return res.data
})

export const fetchDoctorsForSelectedAmbulance = createAsyncThunk(
    'reservationProcess/fetchDoctorsForSelectedAmbulance',
    async (ambulanceId) => {
        const URL = `${ID}/getDoctors/${ambulanceId}`
        const res = await axiosGynInstance.get(URL)
        return res.data
    }
)

export const sendContactMessage = createAsyncThunk('reservationProcess/contactForm/sendMessage', async (data) => {
    const URL = `${ID}/contactForm/sendMessage`
    const res = await axiosGynInstance.post(URL, data)
    return res.data
})
