const getOpeningHours = () =>
    Array(24)
        .fill(0)
        .map((_, i) => {
            return ('0' + i + ':0' + 60 * (i % 1)).replace(/\d(\d\d)/g, '$1')
        })
export default getOpeningHours
