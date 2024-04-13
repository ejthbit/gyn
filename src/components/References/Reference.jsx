import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import { Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import PropTypes from 'prop-types'
import React from 'react'

const PREFIX = 'Reference'

const classes = {
    quoteLeft: `${PREFIX}-quoteLeft`,
    quote: `${PREFIX}-quote`,
    quoteRight: `${PREFIX}-quoteRight`,
    quoteContainer: `${PREFIX}-quoteContainer`,
    source: `${PREFIX}-source`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
    [`& .${classes.quoteLeft}`]: {
        height: 42,
        '& svg': {
            fill: 'lightgrey',
            width: '1.1rem',
        },
    },

    [`& .${classes.quote}`]: {
        paddingLeft: '1.1rem',
        fontSize: '1.1rem',
        fontWeight: 600,
        lineHeight: 1.48,
    },

    [`& .${classes.quoteRight}`]: {
        textAlign: 'end',
        '& svg': {
            fill: 'lightgrey',
            width: '1.1rem',
        },
    },

    [`& .${classes.quoteContainer}`]: {
        maxWidth: 400,
    },

    [`& .${classes.source}`]: {
        textAlign: 'end',
        fontStyle: 'italic',
        lineHeight: '1.3',
        marginTop: theme.spacing(1),
    },
}))

const Reference = ({ text, author }) => {
    return (
        <Root>
            <Grid item xs={12} className={classes.quoteLeft}>
                <FormatQuoteIcon />
            </Grid>
            <Grid item xs={12} className={classes.quote}>
                <Typography variant="body1">{text}</Typography>
            </Grid>
            <Grid item xs={12} className={classes.quoteRight}>
                <FormatQuoteIcon />
            </Grid>
            <Grid item xs={12}>
                <Typography className={classes.source}>&mdash; {author}</Typography>
            </Grid>
        </Root>
    )
}

Reference.propTypes = {
    text: PropTypes.string,
    author: PropTypes.string,
}

export default Reference
