import { KeyboardArrowUp } from '@mui/icons-material'
import { Box, Fab, useScrollTrigger, Zoom } from '@mui/material'
import React from 'react'

const ScrollTop = () => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    })

    const handleClick = () => window.scrollTo({ top: 0, behavior: 'smooth' })

    return (
        <Zoom in={trigger}>
            <Box onClick={handleClick} role="presentation" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
                <Fab color="primary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUp color="inherit" />
                </Fab>
            </Box>
        </Zoom>
    )
}

export default ScrollTop
