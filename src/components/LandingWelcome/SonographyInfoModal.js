import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    makeStyles,
    Typography,
} from '@material-ui/core'
import { map } from 'ramda'
import PropTypes from 'prop-types'
import React from 'react'
import { getSonographyDates } from 'src/store/bookings/selectors'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    title: {
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
        },
        paddingBottom: 0,
    },
    actions: {
        justifyContent: 'flex-end',
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

const SonographyInfoModal = ({ open, handleClose }) => {
    const classes = useStyles()
    const sonographyDates = useSelector(getSonographyDates)

    return (
        <Dialog maxWidth="sm" open={open} onClose={handleClose} fullWidth>
            <DialogTitle className={classes.title} disableTypography>
                <Typography variant="h5">Termíny Sonografie prsou (Frýdek-Místek)</Typography>
            </DialogTitle>
            <DialogContent>
                <Box margin={2}>
                    {map(
                        ({ date, from, to }) => (
                            <Typography key={date} align="center">
                                {`${date} (${from}-${to})`}
                            </Typography>
                        ),
                        sonographyDates
                    )}
                </Box>
                <Typography variant="body2">
                    Objednání na sonografii prsou pouze telefonicky na čísle 558 632 133.
                </Typography>
                <Typography variant="body2" color="primary">
                    Objednávat se mohou take i klientky, které nejsou registrované v naší ambulanci.
                </Typography>
            </DialogContent>
            <DialogActions className={classes.actions}>
                <Button variant="outlined" onClick={handleClose} color="primary">
                    <Typography color="primary" variant="body2">
                        Zavřít
                    </Typography>
                </Button>
            </DialogActions>
        </Dialog>
    )
}

SonographyInfoModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
}

export default SonographyInfoModal
