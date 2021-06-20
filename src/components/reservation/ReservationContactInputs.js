import { Grid, TextField } from '@material-ui/core'
import { DatePicker } from '@material-ui/pickers'
import debounce from '@utilities/debounce'
import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setContactInformation } from 'src/store/reservationProcess/reservationProcessSlice'
import { getContactInformation } from 'src/store/reservationProcess/selectors'

const ReservationContactInputs = () => {
    const dispatch = useDispatch()
    const contactInformations = useSelector(getContactInformation)
    const [contactInfo, setContactInfo] = useState(contactInformations)
    const { birthDate } = contactInformations
    const { name, email, phone } = contactInfo

    const debounceChange = useCallback(
        debounce((nextValue) => dispatch(setContactInformation(nextValue)), 500),
        []
    )

    const handleChange = (e, prop) => {
        const nextValue = { ...contactInfo, [prop]: e.target.value }
        setContactInfo(nextValue)
        debounceChange(nextValue)
    }

    return (
        <Grid container direction="column">
            <TextField
                label="Jméno"
                placeholder="Zadejte prosím sve jméno"
                value={name}
                onChange={(e) => handleChange(e, 'name')}
                required
            />
            <DatePicker
                label="Datum narození"
                placeholder="Zadejte prosím sve datum narození"
                format="dd-MM-yyyy"
                margin="normal"
                value={birthDate}
                views={['year', 'month', 'date']}
                openTo="year"
                disableFuture
                onChange={(date) => dispatch(setContactInformation({ ...contactInfo, birthDate: date.toISOString() }))}
                required
            />
        </Grid>
    )
}

export default ReservationContactInputs
