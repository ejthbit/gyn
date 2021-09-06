import { Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: '10%',
        paddingRight: '10%',
        paddingBottom: '10%',
        '& .MuiTypography-h2': {
            marginBottom: theme.spacing(2),
            textAlign: 'center',
        },
    },
}))

const References = () => {
    const classes = useStyles()
    return (
        <Grid className={classes.root} container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h2">Reference</Typography>
            </Grid>
        </Grid>
    )
}
References.propTypes = {}

export default References
