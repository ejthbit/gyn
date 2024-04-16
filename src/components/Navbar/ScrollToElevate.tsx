import { useScrollTrigger } from '@mui/material'
import React, { PropsWithChildren } from 'react'

const ScrollToElevate = ({ children }: PropsWithChildren) => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window,
    })

    return React.cloneElement(children as React.ReactElement, {
        style: {
            position: trigger ? 'fixed' : 'static',
        },
    })
}

export default ScrollToElevate
