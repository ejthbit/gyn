/**
 * It takes a function and a timeout, and returns a new function that will only be called once the
 * timeout has expired
 * @param fn - The function to be debounced.
 * @param [timeout=500] - The amount of time in milliseconds to wait before executing the function.
 * @returns A function that will be called after the specified timeout.
 */
const debounce = (fn, timeout = 500) => {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => fn(...args), timeout)
    }
}
export default debounce
