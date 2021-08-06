import React, { useState } from 'react'
import { Button, Grid, makeStyles } from '@material-ui/core'
import { getWorkDaysInMonth } from '@utilities/getDaysInMonth'
import { DatePicker } from '@material-ui/pickers'
import { getMonth, getYear } from 'date-fns'
import { includes, map } from 'ramda'
import { ArrowBack } from '@material-ui/icons'
import ServicesTable from './ServicesTable'
import isNilOrEmpty from '@utilities/isNilOrEmpty'

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
}))

const DoctorServicesView = () => {
    const classes = useStyles()
    const [selectedAction, setSelectedAction] = useState(0)
    const [selectedMonth, setSelectedMonth] = useState(null)
    const [dates, setDates] = useState([])
    const handleSetActionWorkflow = (value) => setSelectedAction(value)
    const handleGenerateTable = (date) => {
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
        return setSelectedMonth(date)
    }

    return (
        <Grid container>
            <Grid container spacing={2} alignContent="flex-end">
                {includes(selectedAction, [1, 2]) ? (
                    <>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={() => handleSetActionWorkflow(0)}>
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
                                onChange={(date) => handleGenerateTable(date)}
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
                    <ServicesTable data={dates} />
                </Grid>
            )}
        </Grid>
    )
}

export default DoctorServicesView
