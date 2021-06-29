import { Grid } from '@material-ui/core'
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

const BookingsView = () => {
    const dispatch = useDispatch()
    const bookingsViewDate = useSelector(getBookingsSelectedDate)
    const handleChangeDate = (data) => dispatch(setBookingsViewDate({ ...bookingsViewDate, ...data }))
    const bookings = useMemoizedSelector(makeBookingsSelector, {}, [bookingsViewDate])

    useEffect(() => {
        const { from, to } = bookingsViewDate
        if (!isNilOrEmpty(from) && !isNilOrEmpty(to)) dispatch(fetchBookings({ from, to }))
    }, [bookingsViewDate])

    const headCells = [
        { id: 'timeofbooking', numeric: true, disablePadding: false, label: 'Termín' },
        { id: 'name', numeric: false, disablePadding: true, label: 'Jméno' },
        { id: 'birthdate', numeric: false, disablePadding: false, label: 'datum narození' },
        { id: 'email', numeric: true, disablePadding: false, label: 'e-mail' },
        { id: 'phone', numeric: true, disablePadding: false, label: 'telefon' },
    ]

    return (
        <Grid container spacing={2} justify="center">
            <Grid item>
                <DatePicker
                    label="Termíny od: "
                    orientation="landscape"
                    variant="inline"
                    format="dd-MM-yyyy"
                    margin="normal"
                    value={bookingsViewDate.from}
                    autoOk
                    onChange={(date) => handleChangeDate({ from: startOfDay(date).toISOString() })}
                />
            </Grid>
            <Grid item>
                <DatePicker
                    label="Termíny do: "
                    orientation="landscape"
                    variant="inline"
                    format="dd-MM-yyyy"
                    margin="normal"
                    value={bookingsViewDate.to}
                    onChange={(date) => handleChangeDate({ to: endOfDay(date).toISOString() })}
                    autoOk
                />
            </Grid>
            <Grid item xs={12}>
                <CustomTable title="Objednávky" orderBy="timeofbooking" data={bookings} headCells={headCells} />
            </Grid>
        </Grid>
    )
}

export default BookingsView
