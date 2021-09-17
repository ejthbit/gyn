import { Grid, makeStyles, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import FormatQuoteIcon from '@material-ui/icons/FormatQuote'

const useStyles = makeStyles((theme) => ({
    quoteLeft: {
        '& svg': {
            fill: 'lightgrey',
            width: '1.1rem',
        },
    },
    quote: {
        paddingLeft: '1.1rem',
        fontSize: '1.1rem',
        fontWeight: 600,
        lineHeight: 1.48,
    },
    quoteRight: {
        textAlign: 'end',
        '& svg': {
            fill: 'lightgrey',
            width: '1.1rem',
        },
    },
    quoteContainer: {
        maxWidth: 400,
    },
    source: {
        textAlign: 'end',
        fontStyle: 'italic',
        lineHeight: '1.3',
        marginTop: theme.spacing(1),
    },
}))
const Reference = ({ text, author }) => {
    const classes = useStyles()
    return (
        <>
            <Grid item xs={12} className={classes.quoteLeft}>
                <FormatQuoteIcon />
            </Grid>
            <Grid item container xs={12} direction="row" className={classes.quote} justifyContent="flex-end">
                <Typography>{text}</Typography>
            </Grid>
            <Grid item xs={12} className={classes.quoteRight}>
                <FormatQuoteIcon />
            </Grid>
            <Grid item xs={12}>
                <Typography className={classes.source}>&mdash; {author}</Typography>
            </Grid>
        </>
    )
}

Reference.propTypes = {
    text: PropTypes.string,
    author: PropTypes.string,
}

export default Reference
