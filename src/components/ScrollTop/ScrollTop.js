import React from 'react'
import { Box, Fab, makeStyles, useScrollTrigger, Zoom } from '@material-ui/core'
import { KeyboardArrowUp } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        '& svg': {
            color: theme.palette.common.white,
        },
    },
}))

const ScrollTop = () => {
    const classes = useStyles()

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    })

    const handleClick = () => window.scrollTo({ top: 0, behavior: 'smooth' })

    return (
        <Zoom in={trigger}>
            <Box onClick={handleClick} role="presentation" className={classes.root}>
                <Fab color="primary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUp />
                </Fab>
            </Box>
        </Zoom>
    )
}

export default ScrollTop
