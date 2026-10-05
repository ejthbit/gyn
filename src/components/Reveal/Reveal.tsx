import { styled } from '@mui/material/styles'
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'

const Root = styled('div')(({ theme }) => ({
    // Fills stretched grid cells so cards inside keep equal heights.
    height: '100%',
    opacity: 0,
    // transform + opacity only: composited, no layout shift (CLS stays 0).
    transform: 'translateY(24px)',
    transition: theme.transitions.create(['opacity', 'transform'], {
        duration: 600,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    }),
    '&.is-visible': { opacity: 1, transform: 'none' },
    '@media (prefers-reduced-motion: reduce)': { opacity: 1, transform: 'none', transition: 'none' },
}))

type RevealProps = PropsWithChildren<{ delay?: number }>

// Fades content in once it scrolls into view. Only for content below the first screen:
// hiding the LCP element (hero headline/illustration) this way would delay Largest Contentful Paint.
const Reveal = ({ children, delay = 0 }: RevealProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const node = ref.current
        if (!node) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return
                setIsVisible(true)
                observer.disconnect()
            },
            { rootMargin: '0px 0px -10% 0px' }
        )
        observer.observe(node)
        return () => observer.disconnect()
    }, [])

    return (
        <Root ref={ref} className={isVisible ? 'is-visible' : undefined} style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </Root>
    )
}

export default Reveal
