import React from 'react'
import { Box, MenuItem, Button } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { map } from 'ramda'
import FormSelectInput from '@components/buildingbBlocks/FormInputs/FormSelectInput'
import FormInput from '@components/buildingbBlocks/FormInputs/FormInput'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const formValidationSchema = yup.object().shape({
    location: yup.string().required(''),
    firstName: yup.string().required(''),
    lastName: yup.string().required(''),
    email: yup.string().required(''),
})

const ContactForm = () => {
    const { control, handleSubmit, formState } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(formValidationSchema),
    })
    console.log(formState.errors)

    return (
        <Box border={'1px solid black'} padding={'20px'}>
            <FormSelectInput label="Zvolte lokaci" name={'location'} control={control} fullWidth required>
                {map(
                    (location) => (
                        <MenuItem key={location} value={location}>
                            {location}
                        </MenuItem>
                    ),
                    ['Frydek', 'Senov']
                )}
            </FormSelectInput>
            <FormInput label="Jméno" name="firstName" control={control} fullWidth required />
            <FormInput label="Příjmení" name="lastName" control={control} fullWidth required />
            <FormInput label="Zde napište zprávu" name="email" control={control} fullWidth required multiline />
            <Button color="primary" variant="contained" onClick={handleSubmit((e) => console.log(e))}>
                Odeslat
            </Button>
        </Box>
    )
}

ContactForm.propTypes = {}

export default ContactForm
