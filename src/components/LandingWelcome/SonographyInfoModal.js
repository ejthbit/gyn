import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import isNilOrEmpty from '@utilities/isNilOrEmpty'
import { format } from 'date-fns'
import PropTypes from 'prop-types'
import { map } from 'ramda'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentMonthSonographyDates } from 'src/store/bookings/actions'
import { getSonographyDates } from 'src/store/bookings/selectors'

const PREFIX = 'SonographyInfoModal'

const classes = {
    title: `${PREFIX}-title`,
    actions: `${PREFIX}-actions`,
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
    [`& .${classes.title}`]: {
        [theme.breakpoints.down('md')]: {
            textAlign: 'center',
        },
        paddingBottom: 0,
    },

    [`& .${classes.actions}`]: {
        justifyContent: 'flex-end',
        paddingRight: theme.spacing(6.5),
        paddingLeft: theme.spacing(6.5),
        '& span': {
            color: 'red',
        },
        '& .MuiButtonBase-root': {
            width: '30%',
        },
        [theme.breakpoints.down('md')]: {
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2),
        },
    },
}))

const SonographyInfoModal = ({ open, handleClose }) => {
    const dispatch = useDispatch()
    const sonographyDates = useSelector(getSonographyDates)

    useEffect(() => {
        if (isNilOrEmpty(sonographyDates)) dispatch(getCurrentMonthSonographyDates())
    }, [])

    return (
        <StyledDialog maxWidth="sm" open={open} onClose={handleClose} fullWidth>
            <DialogTitle className={classes.title}>
                <Typography variant="h5">Termíny Sonografie prsou (Frýdek-Místek)</Typography>
            </DialogTitle>
            <DialogContent>
                <Box margin={2}>
                    {!isNilOrEmpty(sonographyDates) ? (
                        map(
                            ({ date, from, to }) => (
                                <Typography key={date} align="center">
                                    {`${format(new Date(date), 'dd/MM/yyyy')} (${from}-${to})`}
                                </Typography>
                            ),
                            sonographyDates
                        )
                    ) : (
                        <Typography variant="body1" color="error">
                            Omlouváme se ale na tento měsíc nejsou vypsány termíny sonografie.
                        </Typography>
                    )}
                </Box>
                <Typography variant="body2">
                    Objednání na sonografii prsou pouze telefonicky na čísle 558 632 133.
                </Typography>
                <Typography variant="body2" color="primary">
                    Objednávat se mohou také klientky, které nejsou registrované v naší ambulanci.
                </Typography>
            </DialogContent>
            <DialogActions className={classes.actions}>
                <Button variant="outlined" onClick={handleClose} color="primary">
                    <Typography color="primary" variant="body2">
                        Zavřít
                    </Typography>
                </Button>
            </DialogActions>
        </StyledDialog>
    )
}

SonographyInfoModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
}

export default SonographyInfoModal
