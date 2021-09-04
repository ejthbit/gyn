import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosGynInstance from 'src/api/config'

const ID = 'configuration'
export const fetchAmbulances = createAsyncThunk('reservationProcess/fetchAmbulances', async () => {
    const URL = `${ID}/getAmbulances`
    const res = await axiosGynInstance.get(URL)
    return res.data
})
