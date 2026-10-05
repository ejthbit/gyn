import { useReservationDialog } from '@components/Reservation/ReservationProvider'
import scrollElementIntoView from '@utilities/scrollElementIntoView'
import React, { ReactNode } from 'react'
import { HashLink } from 'react-router-hash-link'
import routingPaths from '../../routingPaths'

type NavRouteLinkProps = { link: string; children: ReactNode }

// Menu link; the reservation entry opens the reservation dialog in place instead of navigating.
const NavRouteLink = ({ link, children }: NavRouteLinkProps) => {
    const { openReservation } = useReservationDialog()

    if (link === routingPaths.reservation) {
        return (
            <HashLink
                to={link}
                onClick={(event) => {
                    event.preventDefault()
                    openReservation()
                }}
            >
                {children}
            </HashLink>
        )
    }

    return (
        <HashLink to={link} scroll={(element) => scrollElementIntoView(element, 'smooth')}>
            {children}
        </HashLink>
    )
}

export default NavRouteLink
