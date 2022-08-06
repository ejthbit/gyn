import FormInput from '@components/buildingbBlocks/FormInputs/FormInput'
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Typography } from '@mui/material'
import getDateWithCorrectOffset from '@utilities/getDateWithCorrectOffset'
import FormSelectInput from 'src/components/buildingbBlocks/FormInputs/FormSelectInput'
import { format } from 'date-fns'
import PropTypes from 'prop-types'
import { map } from 'ramda'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { fastBooking } from 'src/store/bookings/actions'
import { getBookingCategories } from 'src/store/reservationProcess/selectors'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import DialogButtons from 'src/components/buildingbBlocks/DialogButtons/DialogButtons'

const formValidationSchema = yup.object().shape({
    title: yup.string().required('Pole jméno nemůže být prázdné'),
    category: yup.number().required('Toto pole je povinné!'),
})
const CalendarViewCreateEventDialog = ({ open = false, data, handleClose }) => {
    const { start, end } = data
    const dispatch = useDispatch()
    const bookingCategories = useSelector(getBookingCategories)
    const { handleSubmit, control, reset, formState } = useForm({
        reValidateMode: 'onChange',
        resolver: yupResolver(formValidationSchema),
        defaultValues: {
            title: '',
            category: '',
        },
    })
    const { isDirty, isValid } = formState

    const onCreate = async (data) => {
        const { title, category } = data
        const { error } = await dispatch(fastBooking({ name: title, start, end, category }))
        if (!error) {
            reset()
            handleClose()
        }
    }
    const onClose = () => {
        reset()
        handleClose()
    }

    return (
        open && (
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle id="form-dialog-title">Rychlá objednávka</DialogTitle>
                <DialogContent>
                    <Box marginBottom={1}>
                        <Typography>{`Vybraný termín: ${format(
                            getDateWithCorrectOffset(start),
                            'dd/MM/yyyy HH:mm:ss'
                        )} - ${format(getDateWithCorrectOffset(end), 'dd/MM/yyyy HH:mm:ss')}`}</Typography>
                    </Box>
                    <FormInput
                        name="title"
                        label="Jméno"
                        placeholder="Zadejte prosím jméno pacienta"
                        control={control}
                        fullWidth
                        required
                    />
                    <FormSelectInput
                        sx={{ marginTop: 0.5 }}
                        label="Typ vyšetření"
                        name="category"
                        control={control}
                        fullWidth
                        required
                    >
                        {map(
                            ({ name, category_id }) => (
                                <MenuItem key={category_id} value={category_id}>
                                    {name}
                                </MenuItem>
                            ),
                            bookingCategories
                        )}
                    </FormSelectInput>
                </DialogContent>
                <DialogActions>
                    <DialogButtons
                        onSecondaryClick={onClose}
                        secondaryLabel="Zavřit"
                        primaryLabel="Vytvořit novou objednávku"
                        onPrimaryClick={handleSubmit(onCreate)}
                        disabledPrimary={!isDirty || !isValid}
                    />
                </DialogActions>
            </Dialog>
        )
    )
}

CalendarViewCreateEventDialog.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    data: PropTypes.object,
}

export default CalendarViewCreateEventDialog
