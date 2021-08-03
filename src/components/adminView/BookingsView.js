import { Button, Grid, makeStyles } from '@material-ui/core'
import React, { useEffect } from 'react'
import { DatePicker } from '@material-ui/pickers'
import { useDispatch, useSelector } from 'react-redux'
import { getBookingsSelectedDate, makeBookingsSelector } from 'src/store/bookings/selectors'
import { setBookingsViewDate } from 'src/store/bookings/bookingsSlice'
import { endOfDay, startOfDay } from 'date-fns'
import { fetchBookings } from 'src/store/bookings/actions'
import isNilOrEmpty from '@utilities/isNilOrEmpty'
import CustomTable from '@components/buildingbBlocks/CustomTable/CustomTable'
import useMemoizedSelector from '@utilities/useMemoSelector'

const useStyles = makeStyles(() => ({
    item: {
        height: 52,
        width: 150,
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
        <Grid container spacing={2}>
            <Grid item container spacing={2} alignItems="center">
                <Grid item>
                    <DatePicker
                        className={classes.item}
                        label="Termíny od: "
                        orientation="landscape"
                        variant="inline"
                        format="dd-MM-yyyy"
                        margin="normal"
                        value={bookingsViewDate.from}
                        maxDate={bookingsViewDate.to}
                        autoOk
                        onChange={(date) => handleChangeDate({ from: startOfDay(date).toISOString() })}
                    />
                </Grid>
                <Grid item>
                    <DatePicker
                        className={classes.item}
                        label="Termíny do: "
                        orientation="landscape"
                        variant="inline"
                        format="dd-MM-yyyy"
                        margin="normal"
                        minDate={bookingsViewDate.from}
                        value={isNilOrEmpty(bookingsViewDate.to) ? bookingsViewDate.from : bookingsViewDate.to}
                        onChange={(date) => handleChangeDate({ to: endOfDay(date).toISOString() })}
                        autoOk
                    />
                </Grid>
                <Grid item>
                    <Button className={classes.item} variant="contained" onClick={handleSetTodayDate}>
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
