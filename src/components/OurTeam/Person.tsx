import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { useState } from 'react'
import PersonDetail from './PersonDetail'

type PersonText = { section1: string[]; section2?: string[] }

type PersonProps = {
    image?: string
    fullName: string
    specialization?: string
    text?: PersonText
}

const PREFIX = 'Person'
const classes = {
    root: `${PREFIX}-root`,
    image: `${PREFIX}-image`,
}

const StyledBox = styled(Box)(() => ({
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
}))

const Person = ({ image, fullName, specialization, text }: PersonProps) => {
    const [open, setOpen] = useState(false)
    const handleToggleDetail = () => setOpen((prev) => !prev)

    return (
        <StyledBox className={classes.root}>
            {image && (
                <img
                    src={image}
                    loading="lazy"
                    className={classes.image}
                    onClick={text ? handleToggleDetail : undefined}
                    style={!text ? { cursor: 'default' } : undefined}
                    alt={fullName}
                />
            )}
            <Typography variant="h6">{fullName}</Typography>
            <Typography variant="caption" color="textSecondary">
                {specialization}
            </Typography>
            {text && (
                <PersonDetail open={open} handleClose={handleToggleDetail} title={fullName} text={text} />
            )}
        </StyledBox>
    )
}

export default Person
