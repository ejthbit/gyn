import ReservationStepper from '@components/reservation/ReservationStepper'
import {
    Backdrop,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fade,
    IconButton,
    makeStyles,
    Typography,
} from '@material-ui/core'
import { Close, CheckCircleOutlineOutlined } from '@material-ui/icons'
import { isMobile } from '@utilities/checkDeviceType'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getOrderFinishedOk } from 'src/store/bookings/selectors'

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
    backdrop: {
        zIndex: theme.zIndex.tooltip + 1,
    },
    success: {
        display: 'flex',
        justifyItems: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        '& svg': {
            width: theme.spacing(15),
            height: theme.spacing(15),
        },
    },
}))
const LandingPageReservationModal = ({ isOpen, onClose }) => {
    const isOrderCompleted = useSelector(getOrderFinishedOk)
    const [isSuccessMsgVisible, setIsSuccessMsgVisible] = useState(false)
    const toggleSuccessMsgBackdrop = () => setIsSuccessMsgVisible((prevState) => !prevState)
    const classes = useStyles()

    useEffect(() => {
        if (isOrderCompleted)
            setTimeout(() => {
                toggleSuccessMsgBackdrop()
            }, 200)
    }, [isOrderCompleted])

    useEffect(() => {
        if (isSuccessMsgVisible)
            setTimeout(() => {
                toggleSuccessMsgBackdrop()
            }, 2500)
    }, [isSuccessMsgVisible])

    return (
        isOpen && (
            <>
                <Backdrop className={classes.backdrop} open={isSuccessMsgVisible} transitionDuration={1000}>
                    <Fade in timeout={500}>
                        <Box className={classes.success}>
                            <CheckCircleOutlineOutlined color="secondary" />
                            <Typography variant="h5" color="secondary">
                                Vaše objednávka byla uspěšně vytvořena!
                            </Typography>
                        </Box>
                    </Fade>
                </Backdrop>
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
            </>
        )
    )
}

LandingPageReservationModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
}

export default LandingPageReservationModal
