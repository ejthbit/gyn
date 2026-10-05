import { ReservationDialog } from '@ejthbit/reservation-app'
import React, { createContext, PropsWithChildren, useContext, useState } from 'react'

const ReservationContext = createContext<{ openReservation: () => void } | undefined>(undefined)

export const useReservationDialog = () => {
    const context = useContext(ReservationContext)
    if (!context) throw new Error('useReservationDialog must be used within ReservationProvider')
    return context
}

// Single app-wide reservation dialog so navbar, footer and hero open it over the current page.
export const ReservationProvider = ({ children }: PropsWithChildren) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <ReservationContext.Provider value={{ openReservation: () => setIsOpen(true) }}>
            {children}
            <ReservationDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </ReservationContext.Provider>
    )
}
