import { equals } from 'ramda'

export const isString = (value) => equals(typeof value, 'string')
