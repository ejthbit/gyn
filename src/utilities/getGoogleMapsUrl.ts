type Location = { lat: number; lon: number }

const getGoogleMapsUrl = ({ lat, lon }: Location): string =>
    `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`

export default getGoogleMapsUrl
