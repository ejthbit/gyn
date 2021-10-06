import ReservationStepper from '@components/reservation/ReservationStepper'
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    makeStyles,
    Typography,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { isMobile } from '@utilities/checkDeviceType'
import PropTypes from 'prop-types'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    title: {
        paddingBottom: 0,
        '& svg': {
            width: theme.spacing(4),
            height: theme.spacing(4),
        },
    },
    actions: {
        justifyContent: 'space-between',
        paddingRight: theme.spacing(6.5),
        paddingLeft: theme.spacing(6.5),
        '& .MuiTypography-body2': {
            '& span': {
                color: 'red',
            },
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
        isOpen && (
            <Dialog maxWidth="md" open={isOpen} onClose={onClose} fullWidth>
                <DialogTitle className={classes.title} disableTypography>
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <Box flexGrow={1}>{<Typography variant="h4">Rezervační formulář</Typography>}</Box>
                        <Box alignSelf="flex-start">
                            <IconButton onClick={onClose}>
                                <Close />
                            </IconButton>
                        </Box>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <ReservationStepper />
                </DialogContent>
                <DialogActions className={classes.actions}>
                    <Typography variant="body2">
                        Povinná pole jsou označena <span> *</span>
                    </Typography>
                    {!isMobile && (
                        <Button variant="outlined" onClick={onClose} color="primary">
                            Zavřít
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        )
    )
}

LandingPageReservationModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
}

export default LandingPageReservationModal
