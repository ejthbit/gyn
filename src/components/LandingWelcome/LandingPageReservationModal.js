import ReservationStepper from '@components/reservation/ReservationStepper'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    title: {
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
        },
        paddingBottom: 0,
    },
    actions: {
        justifyContent: 'space-between',
        paddingRight: theme.spacing(6.5),
        paddingLeft: theme.spacing(6.5),
        '& span': {
            color: 'red',
        },
        '& .MuiButtonBase-root': {
            width: '30%',
        },
        [theme.breakpoints.down('sm')]: {
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2),
        },
    },
}))
const LandingPageReservationModal = ({ isOpen, onClose }) => {
    const classes = useStyles()

    return (
        <Dialog maxWidth="md" open={isOpen} onClose={onClose} fullWidth>
            <DialogTitle className={classes.title} disableTypography>
                <Typography variant="h4">Rezervační formulář</Typography>
            </DialogTitle>
            <DialogContent>
                <ReservationStepper />
            </DialogContent>
            <DialogActions className={classes.actions}>
                <Typography variant="body2">
                    Povinná pole jsou označena <span> *</span>
                </Typography>
                <Button variant="outlined" onClick={onClose} color="primary">
                    <Typography color="primary" variant="body2">
                        Zavřít
                    </Typography>
                </Button>
            </DialogActions>
        </Dialog>
    )
}

LandingPageReservationModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
}

export default LandingPageReservationModal
