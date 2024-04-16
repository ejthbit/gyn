export const getGoogleMapsUrl = ({ lat, lon }: { lat: string; lon: string }) =>
    `https://maps.google.com/maps?daddr=${lat},${lon}`
