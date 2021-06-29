import { createSelector } from '@reduxjs/toolkit'
import { path } from 'ramda'

const stateId = 'reservationProcess'
export const getActiveStep = path([stateId, 'activeStep'])
export const getSelectedDate = path([stateId, 'selectedDate'])
export const getSelectedTime = path([stateId, 'selectedTime'])
export const getContactInformation = path([stateId, 'contactInformation'])
export const getDisabledReservationBtn = path([stateId, 'isReservationBtnDisabled'])
export const makeAppointmentDate = () =>
    createSelector(
        [getSelectedDate, getSelectedTime],
        (appointmentDate, appointmentTime) => `${appointmentDate} ${appointmentTime}`
    )
