import { Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(() => ({
    root: {
        height: '40px',
        background: '#103c3a',
        placeContent: 'center',
        alignContent: 'center',
        color: 'white',
    },
}))

const Footer = () => {
    const classes = useStyles()
    return (
        <Grid className={classes.root} container spacing={2}>
            <Typography variant="caption">Copyright © 2021 ejthbit. All rights reserved.</Typography>
        </Grid>
    )
}

export default Footer
