import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosGynInstance from '../../api/config'

const ID = '/administration'

export const createDoctorServiceForMonth = createAsyncThunk(
    'adminstration/createDoctorServiceForMonth',
    async ({ month, days, workplace }, { rejectWithValue }) => {
        const URL = `${ID}/doctorService`
        try {
            const res = await axiosGynInstance.post(URL, {
                month,
                days,
                workplace,
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
    async ({ month, days, workplace }, { rejectWithValue }) => {
        const URL = `${ID}/doctorService/${month}/${workplace}`
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

export const logIntoAdministration = createAsyncThunk(
    'adminstration/logIntoAdministration',
    async ({ email, password }, { rejectWithValue }) => {
        const URL = `${ID}/signIn`
        try {
            const res = await axiosGynInstance.post(URL, {
                email,
                password,
            })
            localStorage.setItem('user', JSON.stringify(res.data))
            return res.data
        } catch (error) {
            if (!error.response) throw error
            return rejectWithValue(error.response.data)
        }
    }
)
