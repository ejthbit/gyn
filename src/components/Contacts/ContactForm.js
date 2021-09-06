import React from 'react'
import { Box, MenuItem, Button, Typography } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { map } from 'ramda'
import FormSelectInput from '@components/buildingbBlocks/FormInputs/FormSelectInput'
import FormInput from '@components/buildingbBlocks/FormInputs/FormInput'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const formValidationSchema = yup.object().shape({
    location: yup.string().required(''),
    firstName: yup.string().required(''),
    email: yup.string().required(''),
})

const ContactForm = () => {
    const { control, handleSubmit } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(formValidationSchema),
    })

    return (
        <Box border={'1px solid black'} padding={'20px'} borderRadius={6}>
            <Typography variant="h4">Kontaktní formulář</Typography>
            <FormSelectInput label="Zvolte lokaci" name={'location'} control={control} fullWidth required>
                {map(
                    (location) => (
                        <MenuItem key={location} value={location}>
                            {location}
                        </MenuItem>
                    ),
                    ['Frydek', 'Senov'] // TODO: vzit si z reduxu Ambulances objekt
                )}
            </FormSelectInput>
            <FormInput label="Jméno" name="firstName" control={control} fullWidth required />
            <FormInput label="Zpráva" name="email" control={control} fullWidth multiline rows={4} />
            <Button color="primary" variant="contained" onClick={handleSubmit((e) => console.log(e))}>
                Odeslat
            </Button>
        </Box>
    )
}

ContactForm.propTypes = {}

export default ContactForm
