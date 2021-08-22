import { Box, makeStyles, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import PersonDetail from './PersonDetail'
const useStyles = makeStyles((theme) => ({
    root: { textAlign: 'center' },
    image: {
        width: 270,
        height: 270,
        transition: 'border 0.5s ease',
        border: '5px solid #1f7a74',
        borderRadius: '50%',
        marginBottom: '10px',
        '&:hover': { border: '5px solid #70dbd4', cursor: 'pointer' },
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))
const Person = ({ image, fullName, specialization, text }) => {
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
            <PersonDetail open={open} handleClose={handleClose} title={fullName} text={text} />
        </Box>
    )
}

Person.propTypes = {
    image: PropTypes.string,
    fullName: PropTypes.string,
    specialization: PropTypes.string,
    text: PropTypes.object,
}

export default Person
