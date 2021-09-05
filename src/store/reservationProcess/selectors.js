import { createSelector } from '@reduxjs/toolkit'
import { path, map } from 'ramda'

const stateId = 'reservationProcess'
const makeArrayOfLabelValue = (label, value, arr) =>
    map((record) => ({ label: record[label], value: record[value] }), arr)

export const getActiveStep = path([stateId, 'activeStep'])
export const getSelectedDate = path([stateId, 'selectedDate'])
export const getSelectedAmbulance = path([stateId, 'selectedAmbulance'])
export const getAmbulances = path([stateId, 'ambulances', 'data'])
export const getDoctorsForSelectedAmbulance = path([stateId, 'doctorsForSelectedAmbulance', 'data'])
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
    createSelector([getAmbulances], (ambulances) => makeArrayOfLabelValue('name', 'workplace_id', ambulances))

export const makeArrayOfValueLabelDoctors = () =>
    createSelector([getDoctorsForSelectedAmbulance], (doctors) => makeArrayOfLabelValue('name', 'doctor_id', doctors))
