import { Box, Button, Grid, Typography } from '@material-ui/core'
import { ArrowBack, ArrowForward } from '@material-ui/icons'
import isNilOrEmpty from '@utilities/isNilOrEmpty'
import { parse, startOfDay, endOfDay } from 'date-fns'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useDispatch } from 'react-redux'
import { setBookingsViewDate } from 'src/store/bookings/bookingsSlice'

const CalendarViewCustomToolbar = ({ label, date, onNavigate, onView }) => {
    const [viewState, setViewState] = useState('work_week')
    const dispatch = useDispatch()

    const addWeeks = (date, weeks) => {
        date.setDate(date.getDate() + 7 * weeks)
        return date
    }

    const addDays = (date, days) => {
        date.setDate(date.getDate() + days)
        return date
    }

    const goToDayView = () => {
        onView('day')
        setViewState('day')
    }
    const goToWeekView = () => {
        onView('work_week')
        setViewState('work_week')
    }

    const goToBack = () => {
        if (viewState === 'work_week') onNavigate('prev', addWeeks(date, -1))
        else onNavigate('prev', addDays(date, -1))
    }

    const goToNext = () => {
        if (viewState === 'work_week') onNavigate('next', addWeeks(date, +1))
        else onNavigate('next', addDays(date, +1))
    }

    const goToToday = () => {
        const now = new Date()
        date.setMonth(now.getMonth())
        date.setYear(now.getFullYear())
        date.setDate(now.getDate())
        onNavigate('current')
    }

    useEffect(() => {
        if (!isNilOrEmpty(label)) {
            dispatch(
                setBookingsViewDate({
                    from: startOfDay(parse(label.split(' - ')[0], 'dd/MM/yyyy', new Date())).toISOString(),
                    to: endOfDay(
                        parse(label.split(' - ')[1] ?? label.split(' - ')[0], 'dd/MM/yyyy', new Date())
                    ).toISOString(),
                })
            )
        }
    }, [label])

    return (
        <Box>
            <Grid container spacing={1} justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                    <Typography align="center">{label}</Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={goToBack}>
                        <ArrowBack />
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined" color="primary" onClick={goToToday}>
                        Dnes
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={goToNext}>
                        <ArrowForward />
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined" color="primary" onClick={goToWeekView}>
                        Pracovní týden
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined" color="primary" onClick={goToDayView}>
                        Den
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}
CalendarViewCustomToolbar.propTypes = {
    label: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    onNavigate: PropTypes.func,
    onView: PropTypes.func,
}

export default CalendarViewCustomToolbar
