import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'
import isNilOrEmpty from '@utilities/isNilOrEmpty'

const TypographyExists = ({ title, value }) => {
    return !isNilOrEmpty(value) && <Typography>{title}</Typography>
}

TypographyExists.propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
}

export default TypographyExists
