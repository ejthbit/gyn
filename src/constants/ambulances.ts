export type OpeningHour = { day: string; hours: string }
export type AmbulanceContact = { email: string; phone: string }
export type AmbulanceLocation = { lat: number; lon: number }

export type Ambulance = {
    id: number
    workplace_id: number
    name: string
    contact: AmbulanceContact
    openingHours: OpeningHour[]
    address: string
    location: AmbulanceLocation
}

export const AMBULANCES: Ambulance[] = [
    {
        id: 1,
        workplace_id: 1,
        name: 'Frýdek-Místek',
        contact: { email: 'frydek@vanek-gynekologie.cz', phone: '558 632 133' },
        openingHours: [
            { day: 'Pondělí', hours: '7:00 - 18:00' },
            { day: 'Úterý', hours: '16:00 - 19:00' },
            { day: 'Středa', hours: '7:00 - 12:00' },
            { day: 'Čtvrtek', hours: '7:00 - 12:00' },
            { day: 'Pátek', hours: '7:00 - 13:00' },
        ],
        address: 'tř. T. G. Masaryka 602, Frýdek, 738 01 Frýdek-Místek',
        location: { lat: 49.682070168115054, lon: 18.355730831002795 },
    },
    {
        id: 2,
        workplace_id: 2,
        name: 'Šenov',
        contact: { email: 'senov@vanek-gynekologie.cz', phone: '605 414 988' },
        openingHours: [
            { day: 'Úterý', hours: '7:00 - 17:00' },
            { day: 'Čtvrtek', hours: '12:00 - 16:00' },
        ],
        address: 'Vráclavská 1281, 739 34 Šenov',
        location: { lat: 49.78586251191306, lon: 18.371343152159852 },
    },
]
