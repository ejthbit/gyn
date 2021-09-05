import FormInput from '@components/buildingbBlocks/FormInputs/FormInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { logIntoAdministration } from 'src/store/administration/actions'
import { getAdminStateErrors, isLoggedIn } from 'src/store/administration/selectors'
import * as yup from 'yup'

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2),
        },
    },
}))

const LoginPageForm = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const history = useHistory()
    const isAdminLoggedIn = useSelector(isLoggedIn)
    const loggingError = useSelector(getAdminStateErrors)
    const LOGGING_ATTEMPT_LIMIT = 5

    const { handleSubmit, control, formState } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(
            yup.object().shape({
                email: yup.string().email().required(),
                password: yup.string().required(),
            })
        ),
        defaultValues: { email: '', password: '' },
    })

    const onSubmit = (data) => dispatch(logIntoAdministration(data))

    useEffect(() => {
        if (isAdminLoggedIn) history.replace('/admin')
    }, [isAdminLoggedIn])

    return (
        <Grid container alignContent="center" direction="column" spacing={2} className={classes.root}>
            <Typography variant="h4"> Pro pokračování se prosím přihlašte</Typography>
            <Grid item>
                <FormInput name={'email'} control={control} placeholder="E-mail" label="E-mail" required fullWidth />
            </Grid>
            <Grid item>
                <FormInput
                    type="password"
                    name={'password'}
                    control={control}
                    placeholder="Heslo"
                    label="Heslo"
                    required
                    fullWidth
                />
            </Grid>
            <Grid item>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit(onSubmit)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit(onSubmit)}
                    fullWidth
                    disabled={!formState.isValid || formState.submitCount >= LOGGING_ATTEMPT_LIMIT}
                >
                    Přihlásit se
                </Button>
            </Grid>
            {loggingError && (
                <Grid item>
                    <Typography variant="body1" color="error">
                        {loggingError?.message}
                    </Typography>
                </Grid>
            )}
        </Grid>
    )
}

export default LoginPageForm
