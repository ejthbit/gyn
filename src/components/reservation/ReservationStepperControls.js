import { Button, ButtonGroup, CircularProgress, makeStyles } from '@material-ui/core'
import { isMobile } from '@utilities/checkDeviceType'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bookAnAppointment } from 'src/store/bookings/actions'
import { isSendingBooking, lastBookingErrors } from 'src/store/bookings/selectors'
import { setActiveStep } from 'src/store/reservationProcess/reservationProcessSlice'
import { getActiveStep, getDisabledReservationBtn } from 'src/store/reservationProcess/selectors'

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: theme.spacing(2),
        minHeight: isMobile ? theme.spacing(7.5) : theme.spacing(4),
        boxShadow: 'none',
    },
}))

const ReservationStepperControls = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const activeStep = useSelector(getActiveStep)
    const isLoading = useSelector(isSendingBooking)
    const orderErrors = useSelector(lastBookingErrors)
    const disabledReservationBtn = useSelector(getDisabledReservationBtn)

    const handleChangeStep = (stepValue) => dispatch(setActiveStep(stepValue))
    const handleConfirmAppointment = () => {
        dispatch(bookAnAppointment())
        handleChangeStep(orderErrors ? 4 : 1)
    }

    return (
        <ButtonGroup orientation={isMobile ? 'vertical' : 'horizontal'}>
            {activeStep !== 0 && (
                <Button variant="contained" onClick={() => handleChangeStep(-1)} className={classes.button}>
                    Vratit se zpět
                </Button>
            )}
            <Button
                variant="contained"
                color="primary"
                startIcon={isLoading && <CircularProgress color="primary" />}
                onClick={() => (activeStep === 4 ? handleConfirmAppointment() : handleChangeStep(1))}
                className={classes.button}
                disabled={disabledReservationBtn}
            >
                {activeStep === 4 ? 'Odeslat objednávku' : 'Pokračovat dále'}
            </Button>
        </ButtonGroup>
    )
}

export default ReservationStepperControls
