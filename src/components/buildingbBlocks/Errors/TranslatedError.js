import { Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import * as apiTranslations from '@assets/apiTranslations'

const TranslatedError = ({ message }) => <Typography color="error">{apiTranslations[message]}</Typography>

TranslatedError.propTypes = {
    message: PropTypes.string,
}

export default TranslatedError
