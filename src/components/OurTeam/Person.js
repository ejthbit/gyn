import { Box, makeStyles, Typography, Backdrop } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
const useStyles = makeStyles((theme) => ({
    root: { textAlign: 'center' },
    image: {
        width: 270,
        height: 270,
        transition: 'border 0.5s ease',
        border: '10px solid #d7f4f3',
        borderRadius: '50%',
        marginBottom: '10px',
        '&:hover': { border: '10px solid #1F7672', cursor: 'pointer' },
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))
const Person = ({ image, fullName, specialization }) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    return (
        <Box className={classes.root}>
            {image ? <img src={image} className={classes.image} onClick={handleOpen} /> : null}
            <Typography variant="h6">{fullName}</Typography>
            <Typography variant="caption" color="textSecondary">
                {specialization}
            </Typography>
            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                Show Detail - majbeee
            </Backdrop>
        </Box>
    )
}

Person.propTypes = {
    image: PropTypes.string,
    fullName: PropTypes.string,
    specialization: PropTypes.string,
}

export default Person
