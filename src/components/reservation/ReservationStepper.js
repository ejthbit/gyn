/* eslint-disable react/display-name */
import { Box, makeStyles, Step, StepContent, StepLabel, Stepper } from '@material-ui/core'
import isNilOrEmpty from '@utilities/isNilOrEmpty'
import React from 'react'
import { reject } from 'ramda'
import { useSelector } from 'react-redux'
import { getActiveStep } from 'src/store/reservationProcess/selectors'
import ReservationContactInputs from './ReservationContactInputs'
import ReservationError from './ReservationError'
import ReservationStepperControls from './ReservationStepperControls'
import ReservationSuccess from './ReservationSuccess'
import ReservationSummary from './ReservationSummary'
import ReservationTermPicker from './ReservationTermPicker'
import useMemoizedSelector from '@utilities/useMemoSelector'
import { getOrderFinishedOk, lastBookingErrors } from 'src/store/bookings/selectors'
import ReservationDoctorPreference from './ReservationDoctorPreference'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            '& .MuiPaper-root': {
                padding: 0,
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

const getSteps = (error, completedOk = false) => [
    { label: 'Preference lékaře', step: 'first' },
    { label: 'Vyberte termín své navštevy', step: 'second' },
    { label: 'Prosím vyplňte své kontaktni údaje', step: 'third' },
    { label: 'Shrnutí objednávky', step: 'forth' },
    { ...(completedOk && { label: 'Úspěšná objednávka', step: 'success' }) },
    { ...(error && { label: 'Nastala chyba', step: 'error' }) },
]

const getStepperContent = (step) => {
    const content = {
        first: <ReservationDoctorPreference />,
        second: <ReservationTermPicker />,
        third: <ReservationContactInputs />,
        forth: <ReservationSummary />,
        success: <ReservationSuccess />,
        error: <ReservationError />,
    }
    return content[step]
}

export const ReservationStepper = () => {
    const classes = useStyles()
    const isOrderCompleted = useSelector(getOrderFinishedOk)
    const orderErrors = useMemoizedSelector(lastBookingErrors)
    const activeStep = useSelector(getActiveStep)
    const steps = reject(isNilOrEmpty, getSteps(orderErrors, isOrderCompleted))

    return (
        <Box className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map(({ label, step }) => (
                    <Step key={label}>
                        <StepLabel error={!!orderErrors}>{label}</StepLabel>
                        <StepContent>
                            <Box>{getStepperContent(step)}</Box>
                            {activeStep < 4 && (
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
