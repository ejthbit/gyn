import { path } from 'ramda'

const stateId = 'reservationProcess'
export const getActiveStep = path([stateId, 'activeStep'])
export const getSelectedDate = path([stateId, 'selectedDate'])
export const getSelectedTime = path([stateId, 'selectedTime'])
export const getContactInformation = path([stateId, 'contactInformation'])
