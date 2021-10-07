import { Box, Button, Grid, makeStyles, Snackbar, Typography, Fade } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import { Alert } from '@material-ui/lab'
import { DatePicker } from '@material-ui/pickers'
import { getWorkDaysInMonth } from '@utilities/getDaysInMonth'
import isNilOrEmpty from '@utilities/isNilOrEmpty'
import { format, getMonth, getYear } from 'date-fns'
import { equals, includes, map } from 'ramda'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearServicesOperationState } from 'src/store/administration/administrationSlice'
import { servicesOperationError, servicesOperationFinishedOk } from 'src/store/administration/selectors'
import { fetchDoctorServicesForSelectedMonth } from 'src/store/bookings/actions'
import { fetchDoctorsForSelectedAmbulance } from 'src/store/reservationProcess/actions'
import { getSelectedAmbulance } from 'src/store/reservationProcess/selectors'
import ServicesTable from './ServicesTable'

const useStyles = makeStyles((theme) => ({
    datePicker: {
        [theme.breakpoints.up('sm')]: {
            '&.MuiFormControl-root': {
                top: '-12px',
                height: theme.spacing(4),
            },
        },
    },
    item: {
        width: '100%',
        '&.MuiButtonBase-root': {
            [theme.breakpoints.down('xs')]: {
                width: '100%',
            },
            width: '33%',
        },
    },
    serviceExists: {
        marginTop: theme.spacing(2),
    },
}))

const DoctorServicesView = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const selectedAmbulanceId = useSelector(getSelectedAmbulance)
    const serviceOperationFinishedOk = useSelector(servicesOperationFinishedOk)
    const serviceOperationError = useSelector(servicesOperationError)

    const d = new Date()
    const [selectedAction, setSelectedAction] = useState(0)
    const [selectedMonth, setSelectedMonth] = useState(new Date(d.setMonth(d.getMonth() + 1)))
    const [dates, setDates] = useState([])
    const [serviceExists, setServiceExists] = useState(null)

    const handleSetActionWorkflow = (value) => setSelectedAction(value)

    const handleClearActionsWorkflow = () => {
        setDates([])
        setServiceExists(false)
        handleSetActionWorkflow(0)
    }

    const handleGenerateDataForTable = async (date) => {
        setSelectedMonth(date)
        const { payload, error } = await dispatch(
            fetchDoctorServicesForSelectedMonth({
                month: format(date, 'yyyy-MM'),
                workplace: selectedAmbulanceId,
            })
        )
        if (equals(selectedAction, 2)) {
            if (error) {
                setDates([])
                setServiceExists(false)
            } else if (payload) {
                setServiceExists(true)
                setDates(payload.days)
            }
        } else if (!payload) {
            const workingDates = getWorkDaysInMonth(getMonth(date), getYear(date))
            setDates(
                map(
                    (date) => ({
                        date,
                        doctorId: '',
                        start: '',
                        end: '',
                        note: '',
                    }),
                    workingDates
                )
            )
            setServiceExists(false)
        } else setServiceExists(true)
    }

    useEffect(() => {
        if (!equals(selectedAction, 0)) handleGenerateDataForTable(selectedMonth)
        if (!isNilOrEmpty(selectedAmbulanceId)) dispatch(fetchDoctorsForSelectedAmbulance(selectedAmbulanceId))
    }, [selectedAmbulanceId, selectedAction])

    useEffect(() => {
        if (dates && serviceExists && !equals(selectedAction, 2)) setDates([])
    }, [serviceExists])

    return (
        <Fade in timeout={500}>
            <Grid container>
                <Grid container spacing={2} alignContent="flex-end">
                    {includes(selectedAction, [1, 2]) ? (
                        <>
                            <Grid item>
                                <Button variant="contained" color="primary" onClick={handleClearActionsWorkflow}>
                                    <ArrowBack />
                                </Button>
                            </Grid>
                            <Grid item>
                                <DatePicker
                                    className={classes.datePicker}
                                    label="Výběr měsíce: "
                                    orientation="landscape"
                                    format="MMMM, yyyy"
                                    margin="none"
                                    value={selectedMonth}
                                    onChange={(date) => handleGenerateDataForTable(date)}
                                    views={['year', 'month']}
                                    autoOk
                                />
                            </Grid>
                        </>
                    ) : (
                        <>
                            <Grid item>
                                <Button variant="contained" color="primary" onClick={() => handleSetActionWorkflow(1)}>
                                    Vytvořit nový rozpis
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" color="primary" onClick={() => handleSetActionWorkflow(2)}>
                                    Upravit existující rozpis
                                </Button>
                            </Grid>
                        </>
                    )}
                </Grid>
                {!isNilOrEmpty(dates) && (
                    <Grid item xs={12}>
                        <ServicesTable
                            data={dates}
                            selectedMonth={format(selectedMonth, 'yyyy-MM')}
                            isEditingServices={equals(selectedAction, 2)}
                            selectedWorkplaceId={selectedAmbulanceId}
                        />
                    </Grid>
                )}
                {
                    <Box>
                        <Snackbar
                            open={serviceOperationFinishedOk || serviceOperationError}
                            autoHideDuration={6000}
                            onClose={() => dispatch(clearServicesOperationState())}
                        >
                            {serviceOperationError ? (
                                <Alert severity="error">Při ukládání nastala chyba</Alert>
                            ) : (
                                <Alert severity="success">Úspěšně uloženo</Alert>
                            )}
                        </Snackbar>
                    </Box>
                }
                {equals(selectedAction, 1) && serviceExists ? (
                    <Typography className={classes.serviceExists} color="error">
                        Na daný měsíc již existuje rozpis.
                    </Typography>
                ) : (
                    equals(selectedAction, 2) &&
                    !serviceExists && (
                        <Typography className={classes.serviceExists} color="error">
                            Pro zadaný měsíc zatím neexistuje rozpis služeb
                        </Typography>
                    )
                )}
            </Grid>
        </Fade>
    )
}

export default DoctorServicesView
