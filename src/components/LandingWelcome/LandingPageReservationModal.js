import ReservationStepper from '@components/reservation/ReservationStepper'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'

const LandingPageReservationModal = ({ isOpen, onClose }) => {
    return (
        <Dialog maxWidth="md" open={isOpen} onClose={onClose} fullWidth>
            <DialogTitle>
                <Typography>Rezervační formulář</Typography>
            </DialogTitle>
            <DialogContent>
                <ReservationStepper />
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={onClose} color="primary">
                    Zavřít
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
