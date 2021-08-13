import { Grid, makeStyles } from '@material-ui/core'
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
            Footer
        </Grid>
    )
}
Footer.propTypes = {}

export default Footer
