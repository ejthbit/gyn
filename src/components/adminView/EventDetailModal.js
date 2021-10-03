import FormInput from '@components/buildingbBlocks/FormInputs/FormInput'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, Typography } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { DateTimePicker } from '@material-ui/pickers'
import isNilOrEmpty from '@utilities/isNilOrEmpty'
import { addHours, addMinutes } from 'date-fns'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { deleteBooking, patchBooking } from 'src/store/bookings/actions'

const useStyles = makeStyles((theme) => ({
    title: {
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
        },
        paddingBottom: 0,
    },
    actions: {
        justifyContent: 'flex-end',
        paddingRight: theme.spacing(6.5),
        paddingLeft: theme.spacing(6.5),
        '& .MuiButtonBase-root': {
            width: '30%',
        },
        [theme.breakpoints.down('sm')]: {
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2),
        },
    },
}))
const EventDetailModal = ({ event, handleClose }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [startValue, setStartValue] = useState(null)
    const { control, handleSubmit, reset, formState, setValue } = useForm({
        defaultValues: {
            start: '',
            end: '',
            name: '',
            birthdate: '',
        },
    })

    const handlePatchBooking = async (updatedBooking) => {
        const { error } = await dispatch(
            patchBooking({
                id: event.id,
                end: addMinutes(new Date(updatedBooking.start), 15).toISOString(),
                ...updatedBooking,
            })
        )
        if (!error) handleClose()
    }
    const handleDeleteBooking = async () => {
        const confirmDelete = window.confirm('Jste si jisti, že chcete zrušit tuto rezervaci? ')
        if (confirmDelete) {
            const { error } = await dispatch(deleteBooking(event.id))
            if (!error) handleClose()
        }
    }
    useEffect(() => {
        if (!isNilOrEmpty(event)) {
            const { start, title: name } = event
            setStartValue(start)
            reset({
                start: addHours(start, 2).toISOString(),
                name: name.split(' - ')[0],
                birthdate: name.split(' - ')[1],
            })
        }
    }, [event])

    return (
        <Dialog className={classes.root} maxWidth="sm" open={!isNilOrEmpty(event)} onClose={handleClose} fullWidth>
            <DialogTitle className={classes.title} disableTypography>
                <Typography variant="h5">Detail objednávky</Typography>
            </DialogTitle>
            <DialogContent>
                <DateTimePicker
                    id="start"
                    label="Začátek rezervace"
                    variant="dialog"
                    format="dd-MM-yyyy HH:mm:ss"
                    margin="normal"
                    value={startValue}
                    name="start"
                    onChange={(date) => {
                        setStartValue(date)
                        setValue('start', addHours(date, 2).toISOString(), { shouldDirty: true })
                    }}
                    ampm={false}
                    allowKeyboardControl
                    minutesStep={15}
                    autoOk
                    okLabel="potvrdit"
                    cancelLabel="zrušit"
                />
                <FormInput label="Jméno" control={control} name="name" fullWidth />
                <FormInput label="Datum narození" control={control} name="birthdate" fullWidth />
            </DialogContent>
            <DialogActions className={classes.actions}>
                <Button variant="outlined" onClick={handleClose} color="primary">
                    <Typography color="primary" variant="body2">
                        Zavřít
                    </Typography>
                </Button>
                <Button variant="contained" onClick={handleDeleteBooking} color="primary">
                    <Delete />
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSubmit(handlePatchBooking)}
                    color="primary"
                    disabled={!formState.isDirty}
                >
                    <Typography variant="body2">Odeslat</Typography>
                </Button>
            </DialogActions>
        </Dialog>
    )
}

EventDetailModal.propTypes = {
    event: PropTypes.object,
    handleClose: PropTypes.func,
    onSubmit: PropTypes.func,
}

export default EventDetailModal
