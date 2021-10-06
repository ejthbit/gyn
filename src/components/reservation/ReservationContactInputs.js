import FormInput from '@components/buildingbBlocks/FormInputs/FormInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { Grid, InputAdornment, makeStyles, TextField } from '@material-ui/core'
import { EmailOutlined, PhoneOutlined, Today } from '@material-ui/icons'
import { DatePicker } from '@material-ui/pickers'
import { equals } from 'ramda'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { setContactInformation, setReservationBtnDisabled } from 'src/store/reservationProcess/reservationProcessSlice'
import { getActiveStep } from 'src/store/reservationProcess/selectors'
import * as yup from 'yup'

const useStyles = makeStyles((theme) => ({
    input: {
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(0),
        '& .MuiInput-root': {
            cursor: 'pointer',
        },
    },
}))
// TODO: Move to validations
const PATTERNS = {
    TEL: /^(?:\s*\d){9}$/,
}
const formValidationSchema = yup.object().shape({
    birthDate: yup.string().required(),
    name: yup.string().required('Pole jméno nemůže být prázdné'),
    phone: yup
        .string()
        .matches(PATTERNS.TEL, { message: 'Nesprávný formát telefonního čísla' })
        .min(9)
        .required('Toto pole je povinné!'),
    email: yup.string().email().notRequired(),
})

const ReservationContactInputs = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const activeStep = useSelector(getActiveStep)
    const [birthDate, setBirthDate] = useState(null)
    const { handleSubmit, setValue, control, formState } = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
        resolver: yupResolver(formValidationSchema),
        defaultValues: { name: '', birthDate: null, phone: '', email: '' },
    })
    const { isDirty, isValid } = formState

    const onSubmit = (data) => {
        const { name, birthDate, phone, email } = data
        dispatch(setContactInformation({ name, birthDate, phone, email }))
    }

    useEffect(() => {
        if (equals(activeStep, 3)) {
            if (isValid && isDirty) {
                handleSubmit(onSubmit)()
                dispatch(setReservationBtnDisabled(false))
            } else dispatch(setReservationBtnDisabled(!isValid))
        }
    }, [formState])

    return (
        <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} sm={6}>
                <FormInput
                    name="name"
                    label="Jméno"
                    placeholder="Zadejte prosím své jméno"
                    control={control}
                    fullWidth
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <DatePicker
                    id="bday"
                    format="dd-MM-yyyy"
                    margin="normal"
                    value={birthDate}
                    name="birthDate"
                    views={['year', 'month', 'date']}
                    openTo="year"
                    disableFuture
                    onChange={(date) => {
                        setBirthDate(date)
                        setValue('birthDate', date.toISOString())
                    }}
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
                <FormInput
                    id="tel"
                    name="phone"
                    label="Telefon"
                    placeholder="Zadejte prosím své telefonní číslo"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <PhoneOutlined />
                            </InputAdornment>
                        ),
                    }}
                    control={control}
                    fullWidth
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormInput
                    name="email"
                    label="E-mail"
                    placeholder="Zadejte prosím svůj e-mail"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <EmailOutlined />
                            </InputAdornment>
                        ),
                    }}
                    control={control}
                    fullWidth
                />
            </Grid>
        </Grid>
    )
}

export default ReservationContactInputs
