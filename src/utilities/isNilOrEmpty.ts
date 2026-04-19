// TODO: narrow types if needed
const isNilOrEmpty = (value: any): boolean => {
    if (value == null) return true
    if (Array.isArray(value)) return value.length === 0
    if (typeof value === 'object') return Object.keys(value).length === 0
    if (typeof value === 'string') return value.trim() === ''
    return false
}

export default isNilOrEmpty
