import isNilOrEmpty from '@utilities/isNilOrEmpty'
import { logOutAutomatically } from '../administration/administrationSlice'

/**
 * If the user's token has expired, log them out and clear the local storage
 */
const checkTokenExpirationMiddleware =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        const tokenExp = JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user'))['exp']
        if (!isNilOrEmpty(tokenExp) && tokenExp < Date.now()) {
            next(action)
            localStorage.clear()
            dispatch(logOutAutomatically())
        }
        next(action)
    }
export default checkTokenExpirationMiddleware
