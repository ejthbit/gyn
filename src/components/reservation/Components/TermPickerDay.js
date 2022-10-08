import { CheckCircle } from '@mui/icons-material'
import { Badge } from '@mui/material'
import { PickersDay } from '@mui/x-date-pickers'
import { format, startOfToday } from 'date-fns'
import PropTypes from 'prop-types'
import { find, equals } from 'ramda'
import React from 'react'
import isNilOrEmpty from 'src/utils/isNilOrEmpty'

const TermPickerDay = ({ day, DayComponentProps, doctorServicesBySelectedDoctorIdAndMonth }) => {
    const isDoctorAvailable =
        !DayComponentProps.outsideCurrentMonth &&
        find(({ date, doctors }) => {
            if (!isNilOrEmpty(doctors)) return equals(date, format(day, 'yyyy-MM-dd')) && day >= startOfToday()
        }, doctorServicesBySelectedDoctorIdAndMonth)

    return (
        <Badge overlap="circular" badgeContent={isDoctorAvailable ? <CheckCircle sx={{ height: 10 }} /> : undefined}>
            <PickersDay {...DayComponentProps} disabled={isNilOrEmpty(isDoctorAvailable)} />
        </Badge>
    )
}

TermPickerDay.propTypes = {
    day: PropTypes.object,
    DayComponentProps: PropTypes.object,
}

export default TermPickerDay
