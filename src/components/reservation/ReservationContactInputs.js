import { Grid, InputAdornment, makeStyles, TextField } from '@material-ui/core'
import { EmailOutlined, PhoneOutlined, Today } from '@material-ui/icons'
import { DatePicker } from '@material-ui/pickers'
import debounce from '@utilities/debounce'
import isNilOrEmpty from '@utilities/isNilOrEmpty'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setContactInformation, setReservationBtnDisabled } from 'src/store/reservationProcess/reservationProcessSlice'
import { getContactInformation } from 'src/store/reservationProcess/selectors'

const useStyles = makeStyles((theme) => ({
    input: {
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(0),
        '& .MuiInput-root': {
            cursor: 'pointer',
        },
    },
}))

//TODO: Use React hook forms
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
    useEffect(() => {
        dispatch(setReservationBtnDisabled(isNilOrEmpty(phone)))
    }, [phone])

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
                    format="dd-MM-yyyy"
                    margin="normal"
                    value={birthDate}
                    views={['year', 'month', 'date']}
                    openTo="year"
                    disableFuture
                    onChange={(date) =>
                        dispatch(setContactInformation({ ...contactInfo, birthDate: date.toISOString() }))
                    }
                    TextFieldComponent={({ value, onClick, onChange, inputRef }) => (
                        <TextField
                            className={classes.input}
                            label="Datum narození"
                            placeholder="Zadejte prosím své datum narození"
                            inputRef={inputRef}
                            onClick={onClick}
                            value={value}
                            onChange={onChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Today />
                                    </InputAdornment>
                                ),
                            }}
                            fullWidth
                            required
                        />
                    )}
                    autoOk
                    okLabel="potvrdit"
                    cancelLabel="zrušit"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Telefon"
                    placeholder="Zadejte prosím své telefonní číslo"
                    value={phone}
                    onChange={(e) => handleChange(e, 'phone')}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <PhoneOutlined />
                            </InputAdornment>
                        ),
                    }}
                    fullWidth
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="E-mail"
                    placeholder="Zadejte prosím svůj e-mail"
                    value={email}
                    onChange={(e) => handleChange(e, 'email')}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <EmailOutlined />
                            </InputAdornment>
                        ),
                    }}
                    fullWidth
                />
            </Grid>
        </Grid>
    )
}

export default ReservationContactInputs
