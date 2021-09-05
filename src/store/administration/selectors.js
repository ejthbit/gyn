import { path } from 'ramda'

const stateId = 'administration'

export const isLoggedIn = path([stateId, 'adminState', 'isLoggedIn'])
export const getAdminStateErrors = path([stateId, 'adminState', 'error'])
export const isAdminStateLoading = path([stateId, 'adminState', 'isLoading'])
