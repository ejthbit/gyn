import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import bookingsReducer from './bookings/bookingsSlice'
import reservationProcessReducer from './reservationProcess/reservationProcessSlice'

const rootReducer = combineReducers({
    bookings: bookingsReducer,
    reservationProcess: reservationProcessReducer,
})
export const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware()],
    devTools: process.env.NODE_ENV !== 'production',
})
