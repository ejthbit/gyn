import { Box } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Step from '@material-ui/core/Step'
import StepContent from '@material-ui/core/StepContent'
import StepLabel from '@material-ui/core/StepLabel'
import Stepper from '@material-ui/core/Stepper'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useSelector } from 'react-redux'
import { getActiveStep } from 'src/store/reservationProcess/selectors'
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
    resetContainer: {
        padding: theme.spacing(3),
    },
}))

const getSteps = () => [
    { label: 'Vyberte termín své navštevy', step: 'first' },
    { label: 'Prosím vyplnte sve kontaktni udaje', step: 'second' },
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
    const activeStep = useSelector(getActiveStep)

    return (
        <Box className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map(({ label, step }) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            <Typography>{getStepperContent(step)}</Typography>
                            <Box className={classes.actionsContainer}>
                                <ReservationStepperControls steps={steps} />
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleResetStepper} className={classes.button}>
                        Reset
                    </Button>
                </Paper>
            )}
        </Box>
    )
}
export default ReservationStepper
