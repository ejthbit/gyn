import CustomTable from '@components/buildingbBlocks/CustomTable/CustomTable'
import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import { DatePicker } from '@material-ui/pickers'
import isNilOrEmpty from '@utilities/isNilOrEmpty'
import useMemoizedSelector from '@utilities/useMemoSelector'
import { endOfDay, endOfMonth, endOfWeek, startOfDay, startOfWeek } from 'date-fns'
import startOfMonth from 'date-fns/startOfMonth'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBookings } from 'src/store/bookings/actions'
import { setBookingsViewDate } from 'src/store/bookings/bookingsSlice'
import { getBookingsSelectedDate, makeBookingsSelector } from 'src/store/bookings/selectors'
import { getSelectedAmbulance } from 'src/store/reservationProcess/selectors'

const useStyles = makeStyles((theme) => ({
    toolbar: {
        [theme.breakpoints.up('sm')]: {
            maxHeight: theme.spacing(6.5),
            alignContent: 'center',
            paddingBottom: theme.spacing(1.25),
        },
    },
    item: {
        width: '100%',
        '&.MuiButtonBase-root': {
            [theme.breakpoints.down('xs')]: {
                width: '100%',
            },
            width: '100%',
        },
    },
    count: {
        minHeight: 52,
        width: '100%',
    },
}))

const BookingsView = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const selectedAmbulanceId = useSelector(getSelectedAmbulance)
    const bookingsViewDate = useSelector(getBookingsSelectedDate)
    const bookings = useMemoizedSelector(makeBookingsSelector, {}, [bookingsViewDate])

    const handleChangeDate = (data) => dispatch(setBookingsViewDate({ ...bookingsViewDate, ...data }))
    const handleSetTodayDate = () =>
        dispatch(
            setBookingsViewDate({ from: startOfDay(Date.now()).toISOString(), to: endOfDay(Date.now()).toISOString() })
        )

    const handleSetThisWeekDate = () =>
        dispatch(
            setBookingsViewDate({
                from: startOfWeek(Date.now(), { weekStartsOn: 1 }).toISOString(),
                to: endOfWeek(Date.now(), { weekStartsOn: 1 }).toISOString(),
            })
        )

    const handleSetThisMonthDate = () =>
        dispatch(
            setBookingsViewDate({
                from: startOfMonth(Date.now()).toISOString(),
                to: endOfMonth(Date.now()).toISOString(),
            })
        )

    useEffect(() => {
        const { from, to } = bookingsViewDate
        if (!isNilOrEmpty(from) && !isNilOrEmpty(to))
            dispatch(fetchBookings({ from, to, workplace: selectedAmbulanceId }))
        if (!isNilOrEmpty(from) && isNilOrEmpty(to))
            dispatch(
                fetchBookings({ from, to: endOfDay(new Date(from)).toISOString(), workplace: selectedAmbulanceId })
            )
    }, [bookingsViewDate, selectedAmbulanceId])

    const headCells = [
        { id: 'start', numeric: false, disablePadding: false, label: 'Datum návštevy' },
        { id: 'start', numeric: false, disablePadding: false, label: 'Čas návštevy' },
        { id: 'name', numeric: false, disablePadding: true, label: 'Jméno' },
        { id: 'birthdate', numeric: false, disablePadding: false, label: 'Datum narození' },
        { id: 'email', numeric: true, disablePadding: false, label: 'E-mail' },
        { id: 'phone', numeric: true, disablePadding: false, label: 'Telefon' },
        { id: 'completed', disableSorting: true, disablePadding: false, label: 'Odbaveno' },
        { id: 'akce', disableSorting: true, disablePadding: false, label: 'Akce' },
    ]

    return (
        <Grid container>
            <Grid item container className={classes.toolbar} alignItems="flex-end" spacing={2}>
                <Grid item xs={12} sm={2}>
                    <DatePicker
                        className={classes.item}
                        label="Termíny od: "
                        orientation="landscape"
                        variant="inline"
                        format="dd-MM-yyyy"
                        margin="none"
                        value={bookingsViewDate.from}
                        maxDate={bookingsViewDate.to}
                        autoOk
                        onChange={(date) => handleChangeDate({ from: startOfDay(date).toISOString() })}
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <DatePicker
                        className={classes.item}
                        label="Termíny do: "
                        orientation="landscape"
                        variant="inline"
                        format="dd-MM-yyyy"
                        margin="none"
                        minDate={bookingsViewDate.from}
                        value={isNilOrEmpty(bookingsViewDate.to) ? bookingsViewDate.from : bookingsViewDate.to}
                        onChange={(date) => handleChangeDate({ to: endOfDay(date).toISOString() })}
                        autoOk
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Button className={classes.item} variant="outlined" color="primary" onClick={handleSetTodayDate}>
                        Dnes
                    </Button>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Button className={classes.item} variant="outlined" color="primary" onClick={handleSetThisWeekDate}>
                        Týden
                    </Button>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Button
                        className={classes.item}
                        variant="outlined"
                        color="primary"
                        onClick={handleSetThisMonthDate}
                    >
                        Měsíc
                    </Button>
                </Grid>
                <Grid item xs={12} sm={2} className={classes.count}>
                    <Typography
                        variant="body1"
                        color="primary"
                    >{`Počet objednávek na dané období: ${bookings.length}`}</Typography>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <CustomTable title="Objednávky" orderBy="start" data={bookings} headCells={headCells} />
            </Grid>
        </Grid>
    )
}

export default BookingsView
