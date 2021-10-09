/* eslint-disable react/display-name */
import { Box, makeStyles, Step, StepContent, StepLabel, Stepper } from '@material-ui/core'
import getStepperContent from '@utilities/getReservationStepperStepsContent'
import isNilOrEmpty from '@utilities/isNilOrEmpty'
import { reject } from 'ramda'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import reservationSteps from 'src/constants/reservationSteps'
import { getOrderFinishedOk, lastBookingErrors } from 'src/store/bookings/selectors'
import { getActiveStep } from 'src/store/reservationProcess/selectors'
import ReservationStepperControls from './ReservationStepperControls'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& .MuiPaper-root': {
            backgroundColor: 'transparent',
        },
        [theme.breakpoints.down('sm')]: {
            '& .MuiPaper-root': {
                padding: theme.spacing(1),
            },
        },
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(1),
    },
}))

const getStepsConfiguration = (error, completedOk = false) => [
    { label: 'Výběr ambulance', step: reservationSteps.FIRST },
    { label: 'Preference lékaře', step: reservationSteps.SECOND },
    { label: 'Vyberte termín své navštevy', step: reservationSteps.THIRD },
    { label: 'Prosím vyplňte své kontaktni údaje', step: reservationSteps.FORTH },
    { label: 'Shrnutí objednávky', step: reservationSteps.FIFTH },
    { ...(completedOk && { label: 'Úspěšná objednávka', step: reservationSteps.SUCCESS }) },
    { ...(error && { label: 'Nastala chyba', step: reservationSteps.ERROR }) },
]

export const ReservationStepper = () => {
    const classes = useStyles()
    const isOrderCompleted = useSelector(getOrderFinishedOk)
    const activeStep = useSelector(getActiveStep)
    const orderErrors = useSelector(lastBookingErrors)

    const steps = useMemo(
        () => reject(isNilOrEmpty, getStepsConfiguration(orderErrors, isOrderCompleted)),
        [orderErrors, isOrderCompleted]
    )

    return (
        <Box className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map(({ label, step }) => (
                    <Step key={label}>
                        <StepLabel error={!!orderErrors}>{label}</StepLabel>
                        <StepContent>
                            <Box>{getStepperContent(step)}</Box>
                            {activeStep < 5 && (
                                <Box className={classes.actionsContainer}>
                                    <ReservationStepperControls steps={steps} />
                                </Box>
                            )}
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </Box>
    )
}
export default ReservationStepper
