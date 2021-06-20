import React from 'react'
import PropTypes from 'prop-types'
import { Button, makeStyles } from '@material-ui/core'
import { getActiveStep } from 'src/store/reservationProcess/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveStep } from 'src/store/reservationProcess/reservationProcessSlice'
import { bookAnAppointment } from 'src/store/bookings/actions'

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: theme.spacing(4),
        marginRight: theme.spacing(1),
    },
}))
const ReservationStepperControls = ({ steps }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const activeStep = useSelector(getActiveStep)
    const handleChangeStep = (stepValue) => dispatch(setActiveStep(stepValue))
    const handleConfirmAppointment = () => {
        handleChangeStep(3)
        dispatch(dispatch(bookAnAppointment))
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
                onClick={() => (activeStep === steps.length - 1 ? handleConfirmAppointment() : handleChangeStep(1))}
                className={classes.button}
            >
                {activeStep === steps.length - 1 ? 'Odeslat objednávku' : 'Pokračovat dále'}
            </Button>
        </>
    )
}

ReservationStepperControls.propTypes = {
    steps: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default ReservationStepperControls
