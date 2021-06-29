import React from 'react'
import PropTypes from 'prop-types'
import { map, values } from 'ramda'
import TranslatedError from './TranslatedError'
import isNilOrEmpty from '@utilities/isNilOrEmpty'

const TranslatedErrors = ({ errors }) => {
    return (
        !isNilOrEmpty(errors) &&
        map(({ message }) => <TranslatedError key={message} message={message} />, values(errors))
    )
}

TranslatedErrors.propTypes = {
    errors: PropTypes.array,
}

export default TranslatedErrors
