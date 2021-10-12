import ReservationStepper from '@components/reservation/ReservationStepper'
import { CheckCircleOutlineOutlined, Close } from '@mui/icons-material'
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
    Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { isMobile } from '@utilities/checkDeviceType'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getOrderFinishedOk } from 'src/store/bookings/selectors'

const PREFIX = 'LandingPageReservationModal'

const classes = {
    title: `${PREFIX}-title`,
    actions: `${PREFIX}-actions`,
    backdrop: `${PREFIX}-backdrop`,
    success: `${PREFIX}-success`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
    [`& .${classes.title}`]: {
        paddingBottom: 0,
        '& svg': {
            width: theme.spacing(4),
            height: theme.spacing(4),
        },
    },

    [`& .${classes.actions}`]: {
        '& .MuiTypography-body2': {
            '& span': {
                color: 'red !important',
            },
        },
        '& .MuiButtonBase-root': {
            width: '30%',
        },
        [theme.breakpoints.down('md')]: {
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2),
        },
    },

    [`& .${classes.backdrop}`]: {
        zIndex: theme.zIndex.tooltip + 1,
    },

    [`& .${classes.success}`]: {
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
            <Root>
                <Backdrop className={classes.backdrop} open={isSuccessMsgVisible} transitionDuration={1000}>
                    <Fade in timeout={500}>
                        <Box className={classes.success}>
                            <CheckCircleOutlineOutlined color="primary" />
                            <Typography variant="h5" color="primary">
                                Vaše objednávka byla uspěšně vytvořena!
                            </Typography>
                        </Box>
                    </Fade>
                </Backdrop>
                <Dialog maxWidth="md" open={isOpen} onClose={onClose} fullWidth>
                    <DialogTitle className={classes.title}>
                        <Box display="flex" alignItems="center" justifyContent="center">
                            <Box flexGrow={1}>{<Typography variant="h4">Rezervační formulář</Typography>}</Box>
                            <Box alignSelf="flex-start">
                                <IconButton onClick={onClose} size="large">
                                    <Close />
                                </IconButton>
                            </Box>
                        </Box>
                    </DialogTitle>
                    <DialogContent>
                        <ReservationStepper />
                    </DialogContent>
                    <DialogActions
                        className={classes.actions}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            paddingRight: '52px',
                            paddingLeft: '52px',
                        }}
                    >
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
            </Root>
        )
    )
}

LandingPageReservationModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
}

export default LandingPageReservationModal
