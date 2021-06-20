const debounce = (fn, timeout = 500) => {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => fn(...args), timeout)
    }
}
export default debounce
