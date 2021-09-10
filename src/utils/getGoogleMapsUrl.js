import { isIOS, isMobile } from './checkDeviceType'

const getGoogleMapsUrl = ({ lat, lon }) => {
    const device = isIOS && isMobile ? `maps://` : 'https://'
    return `${device}maps.google.com/maps?daddr=${lat},${lon}`
}

export default getGoogleMapsUrl
