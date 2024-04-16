import CloseIcon from '@mui/icons-material/Close'
import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'

const PREFIX = 'PersonDetail'

const classes = {
    root: `${PREFIX}-root`,
    closeButton: `${PREFIX}-closeButton`,
    list: `${PREFIX}-list`,
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
    [`& .${classes.root}`]: { textAlign: 'center' },

    [`& .${classes.closeButton}`]: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
    },

    [`& .${classes.list}`]: {
        '& ::marker': {
            color: theme.palette.primary.main,
        },
    },
}))

type PersonDetailProps = {
    open: boolean
    handleClose: () => void
    title: string
    text: {
        section1: []
        section2: []
    }
}
const PersonDetail = ({ open, handleClose, title, text }: PersonDetailProps) => {
    return (
        <StyledDialog onClose={handleClose} open={open} disableScrollLock>
            <DialogTitle>
                <Typography variant="h6">{title}</Typography>
                <IconButton className={classes.closeButton} onClick={handleClose} color="primary" size="large">
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
        </StyledDialog>
    )
}

export default PersonDetail
