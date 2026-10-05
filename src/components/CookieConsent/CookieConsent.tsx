import { Box, Button, Link, Paper, Slide, Stack, Typography } from '@mui/material'
import { disableGoogleAnalytics, enableGoogleAnalytics } from '@utilities/googleAnalytics'
import React, {
    createContext,
    type PropsWithChildren,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'
import CookiesInfoDialog from './CookiesInfoDialog'

type ConsentChoice = 'accepted' | 'rejected'

const CONSENT_STORAGE_KEY = 'cookieConsent'

// Storage access throws (SecurityError) when the browser blocks site data;
// treat that as "no choice yet" and keep the choice for the session only.
const readStoredChoice = (): ConsentChoice | undefined => {
    try {
        const stored = localStorage.getItem(CONSENT_STORAGE_KEY)
        return stored === 'accepted' || stored === 'rejected' ? stored : undefined
    } catch {
        return undefined
    }
}

const storeChoice = (choice: ConsentChoice) => {
    try {
        localStorage.setItem(CONSENT_STORAGE_KEY, choice)
    } catch {
        // Choice then lasts only until reload.
    }
}

type CookieConsentContextValue = {
    openCookieSettings: () => void
    // Height of the open banner (0 when closed), so other bottom-fixed UI can sit above it.
    bannerHeight: number
}

const CookieConsentContext = createContext<CookieConsentContextValue | undefined>(undefined)

export const useCookieConsent = () => {
    const context = useContext(CookieConsentContext)
    if (!context) throw new Error('useCookieConsent must be used within CookieConsentProvider')
    return context
}

export const CookieConsentProvider = ({ children }: PropsWithChildren) => {
    const [choice, setChoice] = useState(readStoredChoice)
    const [isBannerOpen, setIsBannerOpen] = useState(() => choice === undefined)
    const [isInfoOpen, setIsInfoOpen] = useState(false)
    const [bannerHeight, setBannerHeight] = useState(0)
    const bannerObserver = useRef<ResizeObserver>()

    const bannerRef = useCallback((node: HTMLDivElement | null) => {
        bannerObserver.current?.disconnect()
        if (!node) {
            setBannerHeight(0)
            return
        }
        bannerObserver.current = new ResizeObserver(() => setBannerHeight(node.offsetHeight))
        bannerObserver.current.observe(node)
    }, [])

    useEffect(() => {
        if (choice === 'accepted') enableGoogleAnalytics()
        else if (choice === 'rejected') disableGoogleAnalytics()
    }, [choice])

    const handleChoice = (nextChoice: ConsentChoice) => {
        storeChoice(nextChoice)
        setChoice(nextChoice)
        setIsBannerOpen(false)
    }

    return (
        <CookieConsentContext.Provider
            value={{ openCookieSettings: () => setIsBannerOpen(true), bannerHeight: isBannerOpen ? bannerHeight : 0 }}
        >
            {children}
            <Slide direction="up" in={isBannerOpen} mountOnEnter unmountOnExit>
                <Paper
                    ref={bannerRef}
                    role="region"
                    aria-label="Souhlas s cookies"
                    elevation={8}
                    square
                    sx={(theme) => ({
                        position: 'fixed',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        // Below modal layer so the "Více informací" dialog renders over the banner.
                        zIndex: theme.zIndex.appBar,
                        px: { xs: 2, md: 6 },
                        py: 2,
                    })}
                >
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        spacing={2}
                        alignItems={{ xs: 'stretch', md: 'center' }}
                        justifyContent="space-between"
                    >
                        <Box>
                            <Typography variant="subtitle1" component="p" color="primary">
                                GDPR a cookies
                            </Typography>
                            <Typography variant="body2">
                                Na našich webových stránkách používáme technické cookies nezbytné pro základní funkčnost
                                webu a s vaším souhlasem také analytické cookies (Google Analytics), které nám pomáhají
                                stránky zlepšovat. Cookies nikdy nepoužíváme k osobní identifikaci návštěvníků.
                            </Typography>
                            <Link
                                component="button"
                                variant="body2"
                                underline="always"
                                onClick={() => setIsInfoOpen(true)}
                                sx={{ mt: 0.5 }}
                            >
                                Více informací
                            </Link>
                        </Box>
                        <Stack direction="row" spacing={1} justifyContent="flex-end" flexShrink={0}>
                            <Button variant="contained" color="primary" onClick={() => handleChoice('accepted')}>
                                Souhlasím
                            </Button>
                            <Button variant="outlined" color="primary" onClick={() => handleChoice('rejected')}>
                                Odmítnout
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>
            </Slide>
            <CookiesInfoDialog open={isInfoOpen} handleClose={() => setIsInfoOpen(false)} />
        </CookieConsentContext.Provider>
    )
}
