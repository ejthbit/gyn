import { Button, CircularProgress, makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bookAnAppointment } from 'src/store/bookings/actions'
import { isSendingBooking, lastBookingErrors } from 'src/store/bookings/selectors'
import { setActiveStep } from 'src/store/reservationProcess/reservationProcessSlice'
import { getActiveStep, getDisabledReservationBtn } from 'src/store/reservationProcess/selectors'

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(1),
    },
}))

const ReservationStepperControls = ({ steps }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const activeStep = useSelector(getActiveStep)
    const isLoading = useSelector(isSendingBooking)
    const orderErrors = useSelector(lastBookingErrors)
    const disabledReservationBtn = useSelector(getDisabledReservationBtn)
    const handleChangeStep = (stepValue) => dispatch(setActiveStep(stepValue))
    const handleConfirmAppointment = () => {
        dispatch(bookAnAppointment())
        handleChangeStep(orderErrors ? 2 : 1)
    }

    return (
        <>
            {activeStep !== 0 && (
                <Button variant="outlined" onClick={() => handleChangeStep(-1)} className={classes.button}>
                    Vratit se zpět
                </Button>
            )}
            <Button
                variant="outlined"
                color="primary"
                startIcon={isLoading && <CircularProgress color="primary" />}
                onClick={() => (activeStep === 2 ? handleConfirmAppointment() : handleChangeStep(1))}
                className={classes.button}
                disabled={disabledReservationBtn}
            >
                {activeStep === 2 ? 'Odeslat objednávku' : 'Pokračovat dále'}
            </Button>
        </>
    )
}

ReservationStepperControls.propTypes = {
    steps: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default ReservationStepperControls