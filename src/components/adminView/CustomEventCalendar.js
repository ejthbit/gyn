import React from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, makeStyles, Typography, Hidden } from '@material-ui/core'
import isNilOrEmpty from '@utilities/isNilOrEmpty'

const useStyles = makeStyles(() => ({
    root: ({ booked }) => ({
        pointerEvents: 'none',
        zIndex: '999',
        cursor: 'pointer',
    }),
}))
const CustomEventCalendar = ({ event }) => {
    const { start, end, title, resource } = event
    const classes = useStyles({ booked: resource?.booked })

    return (
        <Box height="100%">
            <Grid container direction="column" className={classes.root}>
                <Grid item>
                    <Typography variant="body2">{title}</Typography>
                </Grid>
                <Hidden smDown>
                    <Grid item>{resource.completed && <Typography variant="body2">Dokončeno</Typography>}</Grid>
                </Hidden>
            </Grid>
        </Box>
    )
}

CustomEventCalendar.propTypes = {}

export default CustomEventCalendar
