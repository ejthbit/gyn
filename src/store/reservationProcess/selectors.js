import { createSelector } from '@reduxjs/toolkit'
import { path, map } from 'ramda'

const stateId = 'reservationProcess'
export const getActiveStep = path([stateId, 'activeStep'])
export const getSelectedDate = path([stateId, 'selectedDate'])
export const getSelectedAmbulance = path([stateId, 'selectedAmbulance'])
export const getAmbulances = path([stateId, 'ambulances', 'data'])
export const getPreferredDoctor = path([stateId, 'preferredDoctor'])
export const getSelectedTime = path([stateId, 'selectedTime'])
export const getContactInformation = path([stateId, 'contactInformation'])
export const getDisabledReservationBtn = path([stateId, 'isReservationBtnDisabled'])

export const makeAppointmentDate = () =>
    createSelector(
        [getSelectedDate, getSelectedTime],
        (appointmentDate, appointmentTime) => `${appointmentDate} ${appointmentTime}`
    )

export const makeArrayOfValueLabelAmbulances = () =>
    createSelector([getAmbulances], (ambulances) =>
        map(({ name, workplace_id }) => ({ label: name, value: workplace_id }), ambulances)
    )
