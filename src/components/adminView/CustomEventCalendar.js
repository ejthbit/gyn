import React from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import isNilOrEmpty from '@utilities/isNilOrEmpty'

const useStyles = makeStyles(() => ({
    root: ({ booked }) => ({
        pointerEvents: 'none',
        zIndex: '999',
    }),
}))
const CustomEventCalendar = ({ event }) => {
    const { start, end, title, resource } = event
    const classes = useStyles({ booked: resource?.booked })

    return (
        <Box height="100%" onClick={() => console.log('clicked event')}>
            <Grid container direction="column" className={classes.root}>
                <Grid item>
                    <Typography variant="body2">{title}</Typography>
                </Grid>
                <Grid item>{!isNilOrEmpty(resource.booked) && <Typography variant="body2">Obsazeno</Typography>}</Grid>
            </Grid>
        </Box>
    )
}

CustomEventCalendar.propTypes = {}

export default CustomEventCalendar
