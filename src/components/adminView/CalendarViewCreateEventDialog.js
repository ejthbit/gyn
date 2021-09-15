import FormInput from '@components/buildingbBlocks/FormInputs/FormInput'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { fastBooking } from 'src/store/bookings/actions'

const CalendarViewCreateEventDialog = ({ open = false, data, handleClose }) => {
    const { start, end } = data
    const dispatch = useDispatch()
    const { handleSubmit, control, reset } = useForm({
        defaultValues: {
            title: '',
        },
    })
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
            <Dialog open={open} onClose={handleClose} maxWidth="md">
                <DialogTitle id="form-dialog-title">Vytvořit novou objednávku</DialogTitle>
                <DialogContent>
                    <FormInput control={control} name="title" placeholder="Jméno pacienta" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Zavřit
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit(onCreate)}>
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
