import React from 'react'
import PropTypes from 'prop-types'
import { Grid, TextField } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { getContactInformation } from 'src/store/reservationProcess/selectors'

const ReservationContactInputs = () => {
    const dispatch = useDispatch()
    const { name, birthDate, email, phone } = useSelector(getContactInformation)
    return (
        <Grid container direction="column">
            <TextField label="Jméno" placeholder="Zadejte prosím sve jméno" value={name} required />
            <TextField
                id="standard-error-helper-text"
                label="Datum narození"
                placeholder="Zadejte prosím sve datum narození"
                value={birthDate}
                required
            />
        </Grid>
    )
}

ReservationContactInputs.propTypes = {}

export default ReservationContactInputs
