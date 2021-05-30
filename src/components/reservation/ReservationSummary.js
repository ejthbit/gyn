/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react'
import PropTypes from 'prop-types'
import {
    getContactInformation,
    getSelectedDate,
    getSelectedTime,
} from 'src/store/reservationProcess/selectors'
import { Grid, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'

const ReservationSummary = () => {
    const appointmentDate = useSelector(getSelectedDate)
    const appointmentTime = useSelector(getSelectedTime)
    const contactInformation = useSelector(getContactInformation)
    return (
        <Grid container direction="column">
            <Typography>
                Termín:
                {appointmentDate} {appointmentTime}
            </Typography>
            <Typography>Jméno: {contactInformation.name}</Typography>
            <Typography>Datum narození: {contactInformation.birthDate}</Typography>
        </Grid>
    )
}

ReservationSummary.propTypes = {}

export default ReservationSummary
