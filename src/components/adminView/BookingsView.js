import CustomTable from '@components/buildingbBlocks/CustomTable/CustomTable'
import { Button, Grid, makeStyles } from '@material-ui/core'
import { DatePicker } from '@material-ui/pickers'
import isNilOrEmpty from '@utilities/isNilOrEmpty'
import useMemoizedSelector from '@utilities/useMemoSelector'
import { endOfDay, startOfDay } from 'date-fns'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBookings } from 'src/store/bookings/actions'
import { setBookingsViewDate } from 'src/store/bookings/bookingsSlice'
import { getBookingsSelectedDate, makeBookingsSelector } from 'src/store/bookings/selectors'

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
            width: '33%',
        },
    },
}))

const BookingsView = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const bookingsViewDate = useSelector(getBookingsSelectedDate)
    const bookings = useMemoizedSelector(makeBookingsSelector, {}, [bookingsViewDate])

    const handleChangeDate = (data) => dispatch(setBookingsViewDate({ ...bookingsViewDate, ...data }))
    const handleSetTodayDate = () =>
        dispatch(
            setBookingsViewDate({ from: startOfDay(Date.now()).toISOString(), to: endOfDay(Date.now()).toISOString() })
        )

    useEffect(() => {
        const { from, to } = bookingsViewDate
        if (!isNilOrEmpty(from) && !isNilOrEmpty(to)) dispatch(fetchBookings({ from, to }))
        if (!isNilOrEmpty(from) && isNilOrEmpty(to))
            dispatch(fetchBookings({ from, to: endOfDay(new Date(from)).toISOString() }))
    }, [bookingsViewDate])

    const headCells = [
        { id: 'timeofbooking', numeric: false, disablePadding: false, label: 'Datum návštevy' },
        { id: 'timeofbooking', numeric: false, disablePadding: false, label: 'Čas návštevy' },
        { id: 'name', numeric: false, disablePadding: true, label: 'Jméno' },
        { id: 'birthdate', numeric: false, disablePadding: false, label: 'Datum narození' },
        { id: 'email', numeric: true, disablePadding: false, label: 'e-mail' },
        { id: 'phone', numeric: true, disablePadding: false, label: 'Telefon' },
    ]

    return (
        <Grid container>
            <Grid item container className={classes.toolbar} alignItems="flex-end" spacing={2}>
                <Grid item xs={12} sm={3}>
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
                <Grid item xs={12} sm={3}>
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
                <Grid item xs={12} sm={6}>
                    <Button className={classes.item} variant="outlined" color="primary" onClick={handleSetTodayDate}>
                        Dnes
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <CustomTable title="Objednávky" orderBy="timeofbooking" data={bookings} headCells={headCells} />
            </Grid>
        </Grid>
    )
}

export default BookingsView
