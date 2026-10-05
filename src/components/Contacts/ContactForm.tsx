import api from '../../api/config'
import { AMBULANCES } from '../../constants/ambulances'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Link, MenuItem, TextField, Typography } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

const PREFIX = 'ContactForm'
const classes = { fields: `${PREFIX}-fields`, fullRow: `${PREFIX}-fullRow` }

// Light card so the inputs keep MUI's default, readable styling inside the dark footer.
const Root = styled('form')(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: theme.spacing(3),
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
    boxShadow: `0 24px 48px ${alpha(theme.palette.common.black, 0.2)}`,
    [theme.breakpoints.down('sm')]: { padding: theme.spacing(3) },
    [`& .${classes.fields}`]: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: theme.spacing(2),
        [theme.breakpoints.down('sm')]: { gridTemplateColumns: '1fr' },
    },
    [`& .${classes.fullRow}`]: { gridColumn: '1 / -1' },
}))

const formValidationSchema = yup.object({
    workplaceId: yup.string().required(),
    name: yup.string().required(),
    from: yup.string().email().required(),
    text: yup.string(),
})

type ContactFormValues = yup.InferType<typeof formValidationSchema>

type ContactFormProps = { onShowPrivacyInfo: () => void }

const ContactForm = ({ onShowPrivacyInfo }: ContactFormProps) => {
    const [submitted, setSubmitted] = useState(false)
    const { control, handleSubmit, formState } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(formValidationSchema),
    })
    const { isValid } = formState

    const onSubmit = (data: ContactFormValues) => {
        // TODO: verify this endpoint matches the backend contact route
        api.post('/contact', data)
            .then(() => setSubmitted(true))
            .catch(() => {
                /* silent */
            })
    }

    return (
        <Root onSubmit={handleSubmit(onSubmit)}>
            <Typography component="h2" sx={{ fontWeight: 900, fontSize: '1.75rem', lineHeight: 1.2, mb: 0.5 }}>
                Kontaktujte nás
            </Typography>
            <Box sx={{ width: 48, height: 4, borderRadius: 2, bgcolor: 'primary.main', mb: 3 }} />
            <Box className={classes.fields}>
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
                            className={classes.fullRow}
                        >
                            {AMBULANCES.map((a) => (
                                <MenuItem key={a.id} value={String(a.workplace_id)}>
                                    {a.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                />
                <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <TextField {...field} label="Jméno" fullWidth required />}
                />
                <Controller
                    name="from"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <TextField {...field} label="E-mail" type="email" fullWidth required />}
                />
                <Controller
                    name="text"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField {...field} label="Zpráva" fullWidth multiline rows={4} className={classes.fullRow} />
                    )}
                />
                <Box className={classes.fullRow}>
                    {submitted ? (
                        <Typography color="primary" sx={{ fontWeight: 700 }}>
                            Vaše zpráva byla úspěšně odeslána
                        </Typography>
                    ) : (
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={!isValid}
                            fullWidth
                            sx={{ borderRadius: 999, textTransform: 'none', fontSize: '1.05rem' }}
                        >
                            Odeslat
                        </Button>
                    )}
                    <Typography variant="caption" color="text.secondary" component="p" sx={{ mt: 1.5 }}>
                        Odesláním formuláře nám poskytujete své jméno a e-mail, které použijeme výhradně k odpovědi na
                        vaši zprávu. Více informací v části{' '}
                        <Link component="button" type="button" variant="caption" onClick={onShowPrivacyInfo}>
                            GDPR a cookies
                        </Link>
                        .
                    </Typography>
                </Box>
            </Box>
        </Root>
    )
}

export default ContactForm
