import { Box, makeStyles, Step, StepContent, StepLabel, Stepper } from '@material-ui/core'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bookAnAppointment } from 'src/store/bookings/actions'
import { clearReservation } from 'src/store/reservationProcess/reservationProcessSlice'
import { getActiveStep, getOrderFinishedOk } from 'src/store/reservationProcess/selectors'
import StepContentWithBtn from '../buildingbBlocks/StepContentWithBtn'
import ReservationContactInputs from './ReservationContactInputs'
import ReservationStepperControls from './ReservationStepperControls'
import ReservationSummary from './ReservationSummary'
import ReservationTermPicker from './ReservationTermPicker'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },

    button: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(1),
    },
}))

const getSteps = () => [
    { label: 'Vyberte termín své navštevy', step: 'first' },
    { label: 'Prosím vyplňte své kontaktni údaje', step: 'second' },
    { label: 'Shrnutí objednávky', step: 'third' },
]

const getStepperContent = (step) => {
    const content = {
        first: <ReservationTermPicker />,
        second: <ReservationContactInputs />,
        third: <ReservationSummary />,
        default: 'Unknown step',
    }
    return content[step] || content.default
}

const steps = getSteps()
export const ReservationStepper = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const activeStep = useSelector(getActiveStep)
    const isOrderCompleted = useSelector(getOrderFinishedOk)

    const renderCompletionMessage = useCallback(() => {
        if (isOrderCompleted)
            return (
                <StepContentWithBtn
                    text="Vaše objednávka byla uspěšná!"
                    variant="success"
                    btnText="Vytvořit novou objednávku"
                    onBtnClick={() => dispatch(clearReservation())}
                />
            )
        else
            return (
                <StepContentWithBtn
                    text="Omlouváme se ale při vytvaření rezervace vznikl problém. Zkuste to prosím později "
                    variant="error"
                    btnText="Zkusit znovu"
                    onBtnClick={() => dispatch(bookAnAppointment())}
                />
            )
    }, [isOrderCompleted])

    return (
        <Box className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map(({ label, step }) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            <Box>{getStepperContent(step)}</Box>
                            <Box className={classes.actionsContainer}>
                                <ReservationStepperControls steps={steps} />
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep > 3 && renderCompletionMessage()}
        </Box>
    )
}
export default ReservationStepper
