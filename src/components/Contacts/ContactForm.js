import FormInput from '@components/buildingbBlocks/FormInputs/FormInput'
import FormSelectInput from '@components/buildingbBlocks/FormInputs/FormSelectInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, makeStyles, MenuItem, Typography } from '@material-ui/core'
import { map } from 'ramda'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { sendContactMessage } from 'src/store/reservationProcess/actions'
import { getAmbulances } from 'src/store/reservationProcess/selectors'
import * as yup from 'yup'

const formValidationSchema = yup.object().shape({
    workplaceId: yup.string().required(),
    name: yup.string().required(),
    from: yup.string().required(),
})

const useStyles = makeStyles((theme) => ({
    title: {
        paddingBottom: theme.spacing(1),
    },
    input: {
        '& .MuiInputLabel-formControl': {
            color: `${theme.palette.common.white} !important`,
            paddingBottom: theme.spacing(0.5),
        },
        '& .MuiInputBase-input': {
            color: `${theme.palette.common.white} !important`,
        },
        marginBottom: theme.spacing(1),
    },
    btn: {
        marginTop: theme.spacing(2),
    },
}))

const ContactForm = () => {
    const ambulances = useSelector(getAmbulances)
    const classes = useStyles()
    const dispatch = useDispatch()

    const { control, handleSubmit, formState } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(formValidationSchema),
    })
    const { isValid, submitCount } = formState
    const onSubmit = (data) => {
        dispatch(sendContactMessage(data))
    }

    return (
        <form>
            <Grid container className={classes.root}>
                <Typography variant="body1" color="primary" className={classes.title}>
                    Kontaktujte nás
                </Typography>
                <Grid item xs={12}>
                    <FormSelectInput
                        label="Zvolte pobočku"
                        name="workplaceId"
                        control={control}
                        fullWidth
                        required
                        className={classes.input}
                    >
                        {map(
                            (workplace) => (
                                <MenuItem key={workplace.id} value={workplace.workplace_id}>
                                    {workplace.name}
                                </MenuItem>
                            ),
                            ambulances
                        )}
                    </FormSelectInput>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormInput
                        label="Jméno"
                        name="name"
                        control={control}
                        fullWidth
                        required
                        className={classes.input}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormInput
                        label="E-mail"
                        id="email"
                        name="from"
                        control={control}
                        fullWidth
                        required
                        className={classes.input}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormInput
                        label="Zpráva"
                        name="text"
                        control={control}
                        fullWidth
                        multiline
                        rows={3}
                        className={classes.input}
                    />
                </Grid>
                <Grid item xs={12}>
                    {submitCount >= 1 ? (
                        <Typography color="primary"> Vaše zpráva byla úspěšně odeslána</Typography>
                    ) : (
                        <Button
                            type="submit"
                            className={classes.btn}
                            color="primary"
                            variant="contained"
                            disabled={!isValid}
                            onClick={handleSubmit(onSubmit)}
                            fullWidth
                        >
                            Odeslat
                        </Button>
                    )}
                </Grid>
            </Grid>
        </form>
    )
}

export default ContactForm
