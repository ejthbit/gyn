import scrollToTop from '@utilities/scrollToTop'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

const ScrollRestoration = ({ children }) => {
    useEffect(() => {
        scrollToTop()
    }, [])

    return children
}

ScrollRestoration.propTypes = {
    children: PropTypes.node,
}

export default ScrollRestoration
