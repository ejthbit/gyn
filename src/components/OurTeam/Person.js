import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import PersonDetail from './PersonDetail'
const PREFIX = 'Person'

const classes = {
    root: `${PREFIX}-root`,
    image: `${PREFIX}-image`,
    backdrop: `${PREFIX}-backdrop`,
}

const StyledBox = styled(Box)(({ theme }) => ({
    [`&.${classes.root}`]: { textAlign: 'center' },

    [`& .${classes.image}`]: {
        width: 270,
        height: 270,
        transition: 'border 0.5s ease',
        border: '5px solid #1f7a74',
        borderRadius: '50%',
        marginBottom: '10px',
        '&:hover': { border: '5px solid #70dbd4', cursor: 'pointer' },
    },

    [`& .${classes.backdrop}`]: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))

const Person = ({ image, fullName, specialization, text }) => {
    const [open, setOpen] = useState(false)

    const handleToggleDetail = () => setOpen((prevState) => !prevState)

    return (
        <StyledBox className={classes.root}>
            {image && <img src={image} className={classes.image} onClick={handleToggleDetail} />}
            <Typography variant="h6">{fullName}</Typography>
            <Typography variant="caption" color="textSecondary">
                {specialization}
            </Typography>
            {text && <PersonDetail open={open} handleClose={handleToggleDetail} title={fullName} text={text} />}
        </StyledBox>
    )
}

Person.propTypes = {
    image: PropTypes.string,
    fullName: PropTypes.string,
    specialization: PropTypes.string,
    text: PropTypes.object,
}

export default Person
