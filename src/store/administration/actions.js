import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosGynInstance } from '../../api/config'

const ID = '/administration'

export const createDoctorServiceForMonth = createAsyncThunk(
    'adminstration/createDoctorServiceForMonth',
    async ({ month, days }, { rejectWithValue }) => {
        const URL = `${ID}/doctorService`
        try {
            const res = await axiosGynInstance.post(URL, {
                month,
                days,
            })
            return res.data
        } catch (error) {
            if (!error.response) throw error
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateDoctorServiceForMonth = createAsyncThunk(
    'adminstration/updateDoctorServiceForMonth',
    async ({ month, days }, { rejectWithValue }) => {
        const URL = `${ID}/doctorService/${month}`
        try {
            const res = await axiosGynInstance.put(URL, {
                days,
            })
            return res.data
        } catch (error) {
            if (!error.response) throw error
            return rejectWithValue(error.response.data)
        }
    }
)
