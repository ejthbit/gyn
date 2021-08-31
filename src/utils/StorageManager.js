const clearLSStorage = (e) => {
    e.preventDefault()
    localStorage.clear()
}

const isAuth = () => localStorage.getItem('isAuthenticated')

const SM = {
    clearLSStorage,
    isAuth,
}
export default SM
