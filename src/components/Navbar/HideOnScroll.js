import { Slide, useScrollTrigger } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'

const HideOnScroll = ({ children }) => {
    const trigger = useScrollTrigger({ target: window })

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    )
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
}
export default HideOnScroll
