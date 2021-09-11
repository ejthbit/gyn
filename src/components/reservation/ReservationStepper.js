/* eslint-disable react/display-name */
import AmbulanceSelect from '@components/AmbulanceSelect/AmbulanceSelect'
import { Box, makeStyles, Step, StepContent, StepLabel, Stepper } from '@material-ui/core'
import isNilOrEmpty from '@utilities/isNilOrEmpty'
import useMemoizedSelector from '@utilities/useMemoSelector'
import { reject } from 'ramda'
import React from 'react'
import { useSelector } from 'react-redux'
import { getOrderFinishedOk, lastBookingErrors } from 'src/store/bookings/selectors'
import { getActiveStep } from 'src/store/reservationProcess/selectors'
import ReservationContactInputs from './ReservationContactInputs'
import ReservationDoctorPreference from './ReservationDoctorPreference'
import ReservationError from './ReservationError'
import ReservationStepperControls from './ReservationStepperControls'
import ReservationSuccess from './ReservationSuccess'
import ReservationSummary from './ReservationSummary'
import ReservationTermPicker from './ReservationTermPicker'

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

const getSteps = (error, completedOk = false) => [
    { label: 'Výběr ambulance', step: 'first' },
    { label: 'Preference lékaře', step: 'second' },
    { label: 'Vyberte termín své navštevy', step: 'third' },
    { label: 'Prosím vyplňte své kontaktni údaje', step: 'forth' },
    { label: 'Shrnutí objednávky', step: 'fifth' },
    { ...(completedOk && { label: 'Úspěšná objednávka', step: 'success' }) },
    { ...(error && { label: 'Nastala chyba', step: 'error' }) },
]

const getStepperContent = (step) => {
    const content = {
        first: <AmbulanceSelect />,
        second: <ReservationDoctorPreference />,
        third: <ReservationTermPicker />,
        forth: <ReservationContactInputs />,
        fifth: <ReservationSummary />,
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
