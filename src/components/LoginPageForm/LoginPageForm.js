import FormInput from '@components/buildingbBlocks/FormInputs/FormInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { logIntoAdministration } from 'src/store/administration/actions'
import { isLoggedIn } from 'src/store/administration/selectors'
import * as yup from 'yup'

const LoginPageForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const isAdminLoggedIn = useSelector(isLoggedIn)

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
        <Grid container alignContent="center" direction="column" spacing={2}>
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
                    disabled={!formState.isValid}
                >
                    Přihlásit se
                </Button>
            </Grid>
        </Grid>
    )
}

export default LoginPageForm
