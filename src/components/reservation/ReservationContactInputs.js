import { Grid, makeStyles, TextField } from '@material-ui/core'
import { DatePicker } from '@material-ui/pickers'
import debounce from '@utilities/debounce'
import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setContactInformation } from 'src/store/reservationProcess/reservationProcessSlice'
import { getContactInformation } from 'src/store/reservationProcess/selectors'

const useStyles = makeStyles((theme) => ({
    input: {
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(0),
    },
}))

const ReservationContactInputs = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const contactInformations = useSelector(getContactInformation)
    const [contactInfo, setContactInfo] = useState(contactInformations)
    const { birthDate } = contactInformations
    const { name, email, phone } = contactInfo

    const debounceChange = useCallback(
        debounce((nextValue) => dispatch(setContactInformation(nextValue)), 1000),
        []
    )

    const handleChange = (e, prop) => {
        const nextValue = { ...contactInfo, [prop]: e.target.value }
        setContactInfo(nextValue)
        debounceChange(nextValue)
    }

    return (
        <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Jméno"
                    placeholder="Zadejte prosím své jméno"
                    value={name}
                    onChange={(e) => handleChange(e, 'name')}
                    fullWidth
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <DatePicker
                    className={classes.input}
                    label="Datum narození"
                    placeholder="Zadejte prosím své datum narození"
                    format="dd-MM-yyyy"
                    margin="normal"
                    value={birthDate}
                    views={['year', 'month', 'date']}
                    openTo="year"
                    disableFuture
                    onChange={(date) =>
                        dispatch(setContactInformation({ ...contactInfo, birthDate: date.toISOString() }))
                    }
                    okLabel="potvrdit"
                    cancelLabel="zrušit"
                    fullWidth
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Telefon"
                    placeholder="Zadejte prosím své telefonní číslo"
                    value={phone}
                    onChange={(e) => handleChange(e, 'phone')}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="E-mail"
                    placeholder="Zadejte prosím svůj e-mail"
                    value={email}
                    onChange={(e) => handleChange(e, 'email')}
                    fullWidth
                />
            </Grid>
        </Grid>
    )
}

export default ReservationContactInputs
