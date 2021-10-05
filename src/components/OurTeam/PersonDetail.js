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
    list: {
        '& ::marker': {
            color: theme.palette.primary.main,
        },
    },
}))

const PersonDetail = ({ open, handleClose, title, text }) => {
    const classes = useStyles()
    return (
        <Dialog onClose={handleClose} open={open} disableScrollLock>
            <DialogTitle disableTypography onClose={handleClose}>
                <Typography variant="h6">{title}</Typography>
                <IconButton className={classes.closeButton} onClick={handleClose} color="primary">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Typography>Vzdělání, kvalifikace:</Typography>
                <ul className={classes.list}>
                    {text.section1 && text.section1.map((value, index) => <li key={index}>{value}</li>)}
                </ul>
                {text.section2 && (
                    <>
                        <Typography>Členství v profesních organizacích:</Typography>
                        <ul className={classes.list}>
                            {text.section2.map((value, index) => (
                                <li key={index}>{value}</li>
                            ))}
                        </ul>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}

PersonDetail.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    title: PropTypes.string,
    text: PropTypes.object,
}

export default PersonDetail
