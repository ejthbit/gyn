import FormInput from '@components/buildingbBlocks/FormInputs/FormInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { EmailOutlined, PhoneOutlined } from '@mui/icons-material'
import { Grid, InputAdornment } from '@mui/material'
import { styled } from '@mui/material/styles'
import { MobileDatePicker } from '@mui/x-date-pickers'
import VALIDATION_PATTERNS from '@utilities/validationPatterns'
import { equals } from 'ramda'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { setContactInformation, setReservationBtnDisabled } from 'src/store/reservationProcess/reservationProcessSlice'
import { getActiveStep } from 'src/store/reservationProcess/selectors'
import * as yup from 'yup'
import DatepickerInput from './Components/DatepickerInput'

const PREFIX = 'ReservationContactInputs'

const classes = {
    input: `${PREFIX}-input`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
    [`& .${classes.input}`]: {
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(0),
        minHeight: theme.spacing(4),
        '& .MuiInput-root': {
            cursor: 'pointer',
        },
    },
}))

const formValidationSchema = yup.object().shape({
    birthDate: yup.string().required('Toto pole je povinné!'),
    name: yup.string().required('Pole jméno nemůže být prázdné'),
    phone: yup
        .string()
        .matches(VALIDATION_PATTERNS.TEL, { message: 'Nesprávný formát telefonního čísla' })
        .min(9)
        .required('Toto pole je povinné!'),
    email: yup.string().email().notRequired(),
})

const ReservationContactInputs = () => {
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

    const onSubmit = ({ name, birthDate, phone, email }) =>
        dispatch(setContactInformation({ name, birthDate, phone, email }))

    useEffect(() => {
        if (equals(activeStep, 3)) {
            if (isValid && isDirty) {
                handleSubmit(onSubmit)()
                dispatch(setReservationBtnDisabled(false))
            } else dispatch(setReservationBtnDisabled(!isValid))
        }
    }, [formState])

    return (
        <StyledGrid container alignItems="center" spacing={2}>
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
                <MobileDatePicker
                    id="bday"
                    label="Datum narození"
                    placeholder="Zadejte prosím své datum narození"
                    inputFormat="dd-MM-yyyy"
                    mask="__-__-____"
                    margin="normal"
                    value={birthDate}
                    name="birthDate"
                    views={['year', 'month', 'day']}
                    openTo="year"
                    disableFuture
                    onChange={(date) => {
                        setBirthDate(date)
                        setValue('birthDate', date.toISOString())
                    }}
                    renderInput={DatepickerInput}
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
        </StyledGrid>
    )
}

export default ReservationContactInputs
