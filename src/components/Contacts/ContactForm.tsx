import api from '../../api/config'
import { AMBULANCES } from '../../constants/ambulances'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

const PREFIX = 'ContactForm'
const classes = {
    title: `${PREFIX}-title`,
    input: `${PREFIX}-input`,
    btn: `${PREFIX}-btn`,
}

const Root = styled('form')(({ theme }) => ({
    [`& .${classes.title}`]: { paddingBottom: theme.spacing(1) },
    [`& .${classes.input}`]: {
        '& .MuiInputLabel-formControl': {
            color: `${theme.palette.common.white} !important`,
            paddingBottom: theme.spacing(0.5),
        },
        '& .MuiInputBase-input': { color: `${theme.palette.common.white} !important` },
        marginBottom: theme.spacing(1),
    },
    [`& .${classes.btn}`]: { marginTop: theme.spacing(2) },
}))

type ContactFormValues = {
    workplaceId: string
    name: string
    from: string
    text?: string
}

const formValidationSchema = yup.object().shape({
    workplaceId: yup.string().required(),
    name: yup.string().required(),
    from: yup.string().email().required(),
})

const ContactForm = () => {
    const [submitted, setSubmitted] = useState(false)
    const { control, handleSubmit, formState } = useForm<ContactFormValues>({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(formValidationSchema) as any, // TODO: narrow resolver type
    })
    const { isValid } = formState

    const onSubmit = (data: ContactFormValues) => {
        // TODO: verify this endpoint matches the backend contact route
        api.post('/contact', data)
            .then(() => setSubmitted(true))
            .catch(() => {/* silent */})
    }

    return (
        <Root onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
                <Typography variant="body1" color="primary" className={classes.title}>
                    Kontaktujte nás
                </Typography>
                <Grid item xs={12}>
                    <Controller
                        name="workplaceId"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                select
                                label="Zvolte pobočku"
                                fullWidth
                                required
                                className={classes.input}
                            >
                                {AMBULANCES.map((a) => (
                                    <MenuItem key={a.id} value={String(a.workplace_id)}>
                                        {a.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField {...field} label="Jméno" fullWidth required className={classes.input} />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="from"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField {...field} label="E-mail" fullWidth required className={classes.input} />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="text"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Zpráva"
                                fullWidth
                                multiline
                                rows={3}
                                className={classes.input}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    {submitted ? (
                        <Typography color="primary">Vaše zpráva byla úspěšně odeslána</Typography>
                    ) : (
                        <Button
                            type="submit"
                            className={classes.btn}
                            color="primary"
                            variant="contained"
                            disabled={!isValid}
                            fullWidth
                        >
                            Odeslat
                        </Button>
                    )}
                </Grid>
            </Grid>
        </Root>
    )
}

export default ContactForm
