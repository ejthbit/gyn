import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import bookingsReducer from './bookings/bookingsSlice'

const rootReducer = combineReducers({
    bookings: bookingsReducer,
})
export const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware()],
    devTools: process.env.NODE_ENV !== 'production',
})
