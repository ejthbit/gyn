import { Box, Grid, Hidden, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import PropTypes from 'prop-types'
import React from 'react'

const PREFIX = 'CustomEventCalendar'

const classes = {
    root: `${PREFIX}-root`,
}

const StyledBox = styled(Box)(() => ({
    [`& .${classes.root}`]: {
        pointerEvents: 'none',
        zIndex: '999',
        cursor: 'pointer',
    },
}))

const CustomEventCalendar = ({ event }) => {
    const { title, resource } = event
    return (
        <StyledBox height="100%">
            <Grid container direction="column" className={classes.root}>
                <Grid item>
                    <Typography variant="body2">{title}</Typography>
                </Grid>
                <Hidden mdDown>
                    <Grid item>{resource.completed && <Typography variant="body2">Dokončeno</Typography>}</Grid>
                </Hidden>
            </Grid>
        </StyledBox>
    )
}

CustomEventCalendar.propTypes = {
    event: PropTypes.object,
}

export default CustomEventCalendar
