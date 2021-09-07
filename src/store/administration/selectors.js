import { path } from 'ramda'

const stateId = 'administration'

export const isLoggedIn = path([stateId, 'adminState', 'isLoggedIn'])
export const getAdminStateErrors = path([stateId, 'adminState', 'error'])
export const isAdminAutomaticallyLoggedOut = path([stateId, 'adminState', 'automaticallyLoggedOut'])
export const isAdminStateLoading = path([stateId, 'adminState', 'isLoading'])
export const servicesOperationFinishedOk = path([stateId, 'servicesOperation', 'finishedOk'])
export const servicesOperationError = path([stateId, 'servicesOperation', 'error'])
