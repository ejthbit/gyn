import { useScrollTrigger } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'

const ScrollToElevate = ({ children }) => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window,
    })

    return React.cloneElement(children, {
        style: {
            position: trigger ? 'fixed' : 'static',
        },
    })
}

ScrollToElevate.propTypes = {
    children: PropTypes.element.isRequired,
}

export default ScrollToElevate
