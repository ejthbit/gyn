import React from 'react'
import { Dialog, DialogTitle, Typography, DialogContent, IconButton, makeStyles } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
    root: { textAlign: 'center' },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
    },
}))
const PersonDetail = ({ open, handleClose }) => {
    const classes = useStyles()
    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle disableTypography onClose={handleClose}>
                <Typography variant="h6">Modal title</Typography>
                <IconButton className={classes.closeButton} onClick={handleClose} color="primary">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
                    eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                </Typography>
                <Typography gutterBottom>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue
                    laoreet rutrum faucibus dolor auctor.
                </Typography>
                <Typography gutterBottom>
                    Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
                </Typography>
            </DialogContent>
        </Dialog>
    )
}

PersonDetail.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
}

export default PersonDetail
