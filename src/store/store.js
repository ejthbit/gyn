import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import administrationReducer from './administration/administrationSlice'
import bookingsReducer from './bookings/bookingsSlice'
import checkTokenExpirationMiddleware from './middlewares/checkTokenExpiration'
import reservationProcessReducer from './reservationProcess/reservationProcessSlice'

const rootReducer = combineReducers({
    bookings: bookingsReducer,
    reservationProcess: reservationProcessReducer,
    administration: administrationReducer,
})
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(checkTokenExpirationMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
})
