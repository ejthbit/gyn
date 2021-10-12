import CustomTable from '@components/buildingbBlocks/CustomTable/CustomTable'
import { MobileDatePicker } from '@mui/lab'
import { Button, Fade, Grid, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import isNilOrEmpty from '@utilities/isNilOrEmpty'
import useMemoizedSelector from '@utilities/useMemoSelector'
import { endOfDay, endOfMonth, endOfWeek, parseISO, startOfDay, startOfWeek } from 'date-fns'
import startOfMonth from 'date-fns/startOfMonth'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBookings } from 'src/store/bookings/actions'
import { setBookingsViewDate } from 'src/store/bookings/bookingsSlice'
import { getBookingsSelectedDate, makeBookingsSelector } from 'src/store/bookings/selectors'
import { getSelectedAmbulance } from 'src/store/reservationProcess/selectors'

const PREFIX = 'BookingsView'

const classes = {
    toolbar: `${PREFIX}-toolbar`,
    item: `${PREFIX}-item`,
    count: `${PREFIX}-count`,
}

const StyledFade = styled(Fade)(({ theme }) => ({
    [`& .${classes.toolbar}`]: {
        marginBottom: theme.spacing(0.4),
        [theme.breakpoints.up('sm')]: {
            maxHeight: theme.spacing(6.5),
            alignContent: 'center',
            paddingBottom: theme.spacing(1.25),
        },
    },

    [`& .${classes.item}`]: {
        width: '100%',
        '&.MuiButtonBase-root': {
            [theme.breakpoints.down('sm')]: {
                width: '100%',
            },
            width: '100%',
        },
    },

    [`& .${classes.count}`]: {
        minHeight: 52,
        width: '100%',
    },
}))

const BookingsView = () => {
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
        <StyledFade in timeout={500}>
            <Grid container>
                <Grid item container className={classes.toolbar} alignItems="flex-end" spacing={2}>
                    <Grid item xs={12} sm={2}>
                        <MobileDatePicker
                            className={classes.item}
                            label="Termíny od: "
                            orientation="landscape"
                            variant="inline"
                            inputFormat="dd-MM-yyyy"
                            mask="__-__-____"
                            margin="none"
                            value={bookingsViewDate.from}
                            maxDate={!isNilOrEmpty(bookingsViewDate.to) ? parseISO(bookingsViewDate.to) : undefined}
                            renderInput={(props) => <TextField variant="standard" {...props} />}
                            onChange={(date) => handleChangeDate({ from: startOfDay(date).toISOString() })}
                            okText="Potvrdit"
                            cancelText="Zavřít"
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <MobileDatePicker
                            className={classes.item}
                            label="Termíny do: "
                            orientation="landscape"
                            variant="inline"
                            inputFormat="dd-MM-yyyy"
                            mask="__-__-____"
                            margin="none"
                            minDate={parseISO(bookingsViewDate.from)}
                            value={isNilOrEmpty(bookingsViewDate.to) ? bookingsViewDate.from : bookingsViewDate.to}
                            renderInput={(props) => <TextField variant="standard" {...props} />}
                            onChange={(date) => handleChangeDate({ to: endOfDay(date).toISOString() })}
                            okText="Potvrdit"
                            cancelText="Zavřít"
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Button
                            className={classes.item}
                            variant="outlined"
                            color="primary"
                            onClick={handleSetTodayDate}
                        >
                            Dnes
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Button
                            className={classes.item}
                            variant="outlined"
                            color="primary"
                            onClick={handleSetThisWeekDate}
                        >
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
        </StyledFade>
    )
}

export default BookingsView
