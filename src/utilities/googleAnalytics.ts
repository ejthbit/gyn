// Google Analytics is loaded only after the visitor accepts analytics cookies
// (Czech e-communications act requires opt-in). Without VITE_GA_MEASUREMENT_ID nothing loads.
const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID
const SCRIPT_ID = 'google-analytics-gtag'

// gtag.js reads the `ga-disable-<id>` window property to opt out of sending hits.
const setGaDisabled = (disabled: boolean) => {
    ;(window as unknown as Record<string, boolean>)[`ga-disable-${measurementId}`] = disabled
}

export const enableGoogleAnalytics = () => {
    if (!measurementId) return
    setGaDisabled(false)
    if (document.getElementById(SCRIPT_ID)) return

    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
        // gtag.js requires the `arguments` object itself, not an array copy.
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    // Google signals feed demographics/interests reports; disabled to match the "no profiling" policy text.
    window.gtag('config', measurementId, {
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
    })

    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    document.head.appendChild(script)
}

// Withdrawal: stop further hits and remove the _ga / _ga_<id> cookies, which GA sets on the
// registrable domain (e.g. .vanek-gynekologie.cz), so every parent domain is tried.
export const disableGoogleAnalytics = () => {
    if (!measurementId) return
    setGaDisabled(true)

    const hostParts = window.location.hostname.split('.')
    const domains = hostParts.map((_, index) => hostParts.slice(index).join('.'))
    document.cookie
        .split(';')
        .map((cookie) => cookie.split('=')[0].trim())
        .filter((name) => name === '_ga' || name.startsWith('_ga_'))
        .forEach((name) => {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
            domains.forEach((domain) => {
                document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${domain}`
            })
        })
}
