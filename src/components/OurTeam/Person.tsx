import { Box, Button, Typography } from '@mui/material'
import { alpha, lighten, styled } from '@mui/material/styles'
import React, { useState } from 'react'
import PersonDetail from './PersonDetail'

type PersonText = { section1: string[]; section2?: string[] }

type PersonImage = { avif: string; webp: string }

type PersonProps = {
    image?: PersonImage
    fullName: string
    specialization?: string
    text?: PersonText
}

const PREFIX = 'Person'
const classes = {
    root: `${PREFIX}-root`,
    image: `${PREFIX}-image`,
}

const Root = styled('article')(({ theme }) => {
    const primary = theme.palette.primary.main

    return {
        [`&.${classes.root}`]: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: theme.spacing(4, 3),
            borderRadius: theme.spacing(3),
            backgroundColor: lighten(primary, 0.94),
        },
        [`& .${classes.image}`]: {
            width: 168,
            height: 168,
            marginBottom: theme.spacing(2.5),
            objectFit: 'cover',
            borderRadius: '50%',
            border: `6px solid ${theme.palette.common.white}`,
            boxShadow: `0 12px 28px ${alpha(primary, 0.18)}`,
        },
    }
})

const Person = ({ image, fullName, specialization, text }: PersonProps) => {
    const [open, setOpen] = useState(false)
    const handleToggleDetail = () => setOpen((prev) => !prev)

    return (
        <Root className={classes.root}>
            {image && (
                <picture>
                    <source srcSet={image.avif} type="image/avif" />
                    <img
                        src={image.webp}
                        width={168}
                        height={168}
                        loading="lazy"
                        className={classes.image}
                        alt={fullName}
                    />
                </picture>
            )}
            <Typography component="h3" sx={{ fontWeight: 700, fontSize: '1.15rem', lineHeight: 1.3 }}>
                {fullName}
            </Typography>
            <Typography variant="body2" color="primary" sx={{ mt: 0.5 }}>
                {specialization}
            </Typography>
            {text && (
                <>
                    <Box sx={{ mt: 'auto', pt: 2.5 }}>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={handleToggleDetail}
                            sx={{ borderRadius: 999, textTransform: 'none', px: 2.5 }}
                        >
                            Více o lékaři
                        </Button>
                    </Box>
                    <PersonDetail open={open} handleClose={handleToggleDetail} title={fullName} text={text} />
                </>
            )}
        </Root>
    )
}

export default Person
