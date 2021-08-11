import React, { useState } from 'react'
import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import { getWorkDaysInMonth } from '@utilities/getDaysInMonth'
import { DatePicker } from '@material-ui/pickers'
import { getMonth, getYear, format } from 'date-fns'
import { equals, includes, map } from 'ramda'
import { ArrowBack } from '@material-ui/icons'
import ServicesTable from './ServicesTable'
import isNilOrEmpty from '@utilities/isNilOrEmpty'
import { useDispatch } from 'react-redux'
import { fetchDoctorServicesForSelectedMonth } from 'src/store/bookings/actions'

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

    const [selectedAction, setSelectedAction] = useState(0)
    const [selectedMonth, setSelectedMonth] = useState(null)
    const [dates, setDates] = useState([])
    const [serviceExists, setServiceExists] = useState(false)
    const handleSetActionWorkflow = (value) => setSelectedAction(value)

    const handleClearActionsWorkflow = () => {
        setDates([])
        setServiceExists(false)
        handleSetActionWorkflow(0)
    }

    const handleGenerateDataForTable = async (date) => {
        setSelectedMonth(date)
        const { payload } = await dispatch(fetchDoctorServicesForSelectedMonth(format(date, 'yyyy-MM')))
        if (equals(selectedAction, 2)) {
            setDates(payload.days)
        } else if (!payload) {
            const workingDates = getWorkDaysInMonth(getMonth(date), getYear(date))
            setDates(
                map(
                    (date) => ({
                        date,
                        doctorId: '',
                        start: '',
                        end: '',
                    }),
                    workingDates
                )
            )
            setServiceExists(false)
        } else setServiceExists(true)
    }

    return (
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
                    />
                </Grid>
            )}
            {serviceExists && (
                <Typography className={classes.serviceExists} color="error">
                    Na daný měsíc již existuje rozpis.
                </Typography>
            )}
        </Grid>
    )
}

export default DoctorServicesView
