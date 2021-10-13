import FormInput from '@components/buildingbBlocks/FormInputs/FormInput'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import getDateWithCorrectOffset from '@utilities/getDateWithCorrectOffset'
import { format } from 'date-fns'
import PropTypes from 'prop-types'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { fastBooking } from 'src/store/bookings/actions'

const CalendarViewCreateEventDialog = ({ open = false, data, handleClose }) => {
    const { start, end } = data
    const dispatch = useDispatch()
    const { handleSubmit, control, reset, formState } = useForm({
        defaultValues: {
            title: '',
        },
    })
    const { isDirty } = formState
    const onCreate = async (data) => {
        const { title } = data
        const { error } = await dispatch(fastBooking({ name: title, start, end }))
        if (!error) {
            reset()
            handleClose()
        }
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
                    <FormInput control={control} name="title" placeholder="Zadejte prosím jméno pacienta" fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Zavřit
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit(onCreate)} disabled={!isDirty}>
                        Vytvořit novou objednávku
                    </Button>
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
