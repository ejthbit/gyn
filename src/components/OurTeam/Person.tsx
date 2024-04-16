import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
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
        border: `5px solid #C0ECED`,
        borderRadius: '50%',
        marginBottom: '10px',
        '&:hover': { border: `5px solid ${theme.palette.primary.main}`, cursor: 'pointer' },
    },

    [`& .${classes.backdrop}`]: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))

type PersonProps = {
    image: string
    fullName: string
    specialization: string
    text: {
        section1: []
        section2: []
    }
}
const Person = ({ image, fullName, specialization, text }: PersonProps) => {
    const [open, setOpen] = useState(false)

    const handleToggleDetail = () => setOpen((prevState) => !prevState)

    return (
        <StyledBox className={classes.root}>
            {image && <img src={image} loading="lazy" className={classes.image} onClick={handleToggleDetail} />}
            <Typography variant="h6">{fullName}</Typography>
            <Typography variant="caption" color="textSecondary">
                {specialization}
            </Typography>
            {text && <PersonDetail open={open} handleClose={handleToggleDetail} title={fullName} text={text} />}
        </StyledBox>
    )
}

export default Person
