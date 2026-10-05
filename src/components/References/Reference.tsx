import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import { Box, Typography } from '@mui/material'
import { lighten, styled } from '@mui/material/styles'
import React from 'react'

type ReferenceProps = { text: string; author: string }

const PREFIX = 'Reference'
const classes = {
    root: `${PREFIX}-root`,
    quoteIcon: `${PREFIX}-quoteIcon`,
    avatar: `${PREFIX}-avatar`,
}

const Root = styled('figure')(({ theme }) => {
    const primary = theme.palette.primary.main

    return {
        [`&.${classes.root}`]: {
            height: '100%',
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing(4),
            borderRadius: theme.spacing(3),
            backgroundColor: lighten(primary, 0.94),
            [theme.breakpoints.down('sm')]: { padding: theme.spacing(3) },
        },
        [`& .${classes.quoteIcon}`]: { fontSize: 48, color: primary, marginLeft: theme.spacing(-1) },
        [`& .${classes.avatar}`]: {
            display: 'grid',
            placeItems: 'center',
            width: 40,
            height: 40,
            borderRadius: '50%',
            color: theme.palette.common.white,
            backgroundColor: primary,
            fontWeight: 700,
        },
    }
})

const Reference = ({ text, author }: ReferenceProps) => (
    <Root className={classes.root}>
        <FormatQuoteIcon className={classes.quoteIcon} aria-hidden />
        <Typography component="blockquote" sx={{ m: 0, mt: 1, mb: 3, fontSize: '1.05rem', lineHeight: 1.6 }}>
            {text}
        </Typography>
        <Box component="figcaption" sx={{ mt: 'auto', display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box className={classes.avatar} aria-hidden>
                {author.charAt(0)}
            </Box>
            <Typography sx={{ fontWeight: 700 }}>{author}</Typography>
        </Box>
    </Root>
)

export default Reference
