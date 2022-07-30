import FormInput from '@components/buildingbBlocks/FormInputs/FormInput'
import { Delete } from '@mui/icons-material'
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    TextField,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import getISODateStringWithCorrectOffset from '@utilities/getISODateStringWithCorrectOffset'
import isNilOrEmpty from '@utilities/isNilOrEmpty'
import DialogButtons from '@components/buildingbBlocks/DialogButtons/DialogButtons'
import { addMinutes } from 'date-fns'
import PropTypes from 'prop-types'
import { equals } from 'ramda'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { deleteBooking, patchBooking } from 'src/store/bookings/actions'
import { TimePicker } from '@mui/x-date-pickers'

const PREFIX = 'EventDetailModal'

const classes = {
    title: `${PREFIX}-title`,
    actions: `${PREFIX}-actions`,
    btnItem: `${PREFIX}-btnItem`,
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
    [`& .${classes.title}`]: {
        [theme.breakpoints.down('md')]: {
            textAlign: 'center',
        },
        paddingBottom: 0,
        marginBottom: theme.spacing(1),
    },

    [`& .${classes.actions}`]: {
        justifyContent: 'flex-end',
        paddingRight: theme.spacing(6.5),
        paddingLeft: theme.spacing(6.5),
        '& .MuiButtonBase-root': {
            width: '30%',
        },
        [theme.breakpoints.down('md')]: {
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2),
        },
    },

    [`& .${classes.btnItem}`]: {
        minHeight: 36,
    },
}))

const EventDetailModal = ({ event, handleClose }) => {
    const dispatch = useDispatch()
    const [startValue, setStartValue] = useState(null)
    const [completedValue, setCompletedValue] = useState(false)
    const [precautionaryInspectionValue, setPrecautionaryInspectionValue] = useState(false)
    const { control, handleSubmit, reset, formState, setValue } = useForm({
        defaultValues: {
            start: '',
            end: '',
            name: '',
            birthdate: '',
            phone: '',
            completed: completedValue,
        },
    })
    const { isDirty } = formState
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
            const { start, title: name, resource } = event
            setStartValue(start)
            setCompletedValue(resource?.completed)
            setPrecautionaryInspectionValue(equals(resource?.category, 2))
            reset({
                start: getISODateStringWithCorrectOffset(start),
                name: name.split(' - ')[0],
                birthdate: name.split(' - ')[1],
                phone: isNilOrEmpty(resource?.phone) ? 'Nevyplněno' : resource?.phone,
                completed: resource?.completed,
            })
        }
    }, [event, reset])
    return (
        <StyledDialog maxWidth="sm" open={!isNilOrEmpty(event)} onClose={handleClose} disableScrollLock fullWidth>
            <DialogTitle className={classes.title}>Detail objednávky</DialogTitle>
            <DialogContent sx={{ display: 'grid', gap: 1 }}>
                <TimePicker
                    id="start"
                    label="Začátek rezervace"
                    variant="dialog"
                    inputFormat="dd-MM-yyyy HH:mm"
                    views={['hours', 'minutes']}
                    openTo="hours"
                    mask="__-__-____ __:__"
                    value={startValue}
                    name="start"
                    onChange={(date) => {
                        setStartValue(date)
                        setValue('start', getISODateStringWithCorrectOffset(date), {
                            shouldDirty: true,
                        })
                    }}
                    renderInput={(params) => <TextField {...params} variant="standard" required />}
                    ampm={false}
                    minutesStep={15}
                />
                <FormInput label="Jméno" control={control} name="name" fullWidth />
                <FormInput
                    label="Datum narození"
                    placeholder="RRRR-MM-DD"
                    control={control}
                    name="birthdate"
                    fullWidth
                />
                <FormInput
                    label="Telefonní číslo"
                    placeholder="Telefonní číslo"
                    control={control}
                    name="phone"
                    fullWidth
                    disabled={true ?? !!control.defaultValuesRef.current.phone}
                />
                <FormControlLabel
                    label="Dokončená objednávka"
                    control={
                        <Checkbox
                            color="primary"
                            name="completed"
                            checked={completedValue}
                            onChange={(e) => {
                                setCompletedValue((prevState) => !prevState)
                                setValue('completed', e.target.checked, { shouldDirty: true })
                            }}
                        />
                    }
                />
                <FormControlLabel
                    label="Preventivní prohlídka"
                    control={
                        <Checkbox
                            color="primary"
                            name="precautionaryInspection"
                            checked={precautionaryInspectionValue}
                            disabled
                        />
                    }
                />
            </DialogContent>
            <DialogActions className={classes.actions}>
                <DialogButtons
                    onSecondaryClick={handleClose}
                    secondaryLabel="Zavřit"
                    primaryLabel="Odeslat"
                    onPrimaryClick={handleSubmit(handlePatchBooking)}
                    additionalActionComponent={
                        <Button
                            className={classes.btnItem}
                            variant="contained"
                            onClick={handleDeleteBooking}
                            color="primary"
                        >
                            <Delete />
                        </Button>
                    }
                    disabledPrimary={!isDirty}
                />
            </DialogActions>
        </StyledDialog>
    )
}

EventDetailModal.propTypes = {
    event: PropTypes.object,
    handleClose: PropTypes.func,
}

export default EventDetailModal
