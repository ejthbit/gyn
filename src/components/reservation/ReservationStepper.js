import { Box } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Step from '@material-ui/core/Step'
import StepContent from '@material-ui/core/StepContent'
import StepLabel from '@material-ui/core/StepLabel'
import Stepper from '@material-ui/core/Stepper'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Done } from '@material-ui/icons'
import React from 'react'
import { useSelector } from 'react-redux'
import { getActiveStep, getOrderFinishedOk } from 'src/store/reservationProcess/selectors'
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
    const isOrderCompleted = useSelector(getOrderFinishedOk)

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
            {isOrderCompleted && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>
                        Vaše objednávka byla uspěšná! <Done />
                    </Typography>
                </Paper>
            )}
        </Box>
    )
}
export default ReservationStepper
