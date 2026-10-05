import { useCookieConsent } from '@components/CookieConsent/CookieConsent'
import { AnnouncementsList } from '@ejthbit/reservation-app'
import { CampaignOutlined as CampaignIcon, Remove as MinimizeIcon } from '@mui/icons-material'
import { Box, Button, IconButton, Typography, useMediaQuery, useScrollTrigger } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import routingPaths from '../../routingPaths'

const PREFIX = 'Announcements'
const classes = { body: `${PREFIX}-body` }

// Floating bottom-right widget: announcements stay reachable while scrolling and never shift page layout.
const Root = styled('div')(({ theme }) => ({
    position: 'fixed',
    right: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    zIndex: theme.zIndex.speedDial,
    maxWidth: 380,
    transition: theme.transitions.create(['bottom', 'transform', 'opacity', 'visibility']),
    '&.is-hidden': { transform: 'translateY(calc(100% + 24px))', opacity: 0, visibility: 'hidden' },
    [theme.breakpoints.down('sm')]: { left: theme.spacing(2), right: theme.spacing(2), maxWidth: 'none' },
    // AnnouncementsList renders an empty box when nothing is enabled; hide the whole widget then.
    '&:not(:has(li))': { display: 'none' },
    [`& .${classes.body}`]: {
        maxHeight: '40vh',
        overflowY: 'auto',
        '& .MuiList-root': { paddingTop: 0, paddingBottom: theme.spacing(0.5) },
    },
}))

const AnnouncementsOverlay = () => {
    // undefined = automatic; set once the visitor expands or minimises the card themselves.
    const [userExpanded, setUserExpanded] = useState<boolean>()
    const { bannerHeight } = useCookieConsent()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    // On phones the cookie banner plus the full card would cover most of the screen, so start as a pill there.
    const isExpanded = userExpanded ?? !(isMobile && bannerHeight > 0)
    // The hero fills the first screen; past ~60% of it the visitor has left the landing welcome.
    const isPastHero = useScrollTrigger({ disableHysteresis: true, threshold: Math.round(window.innerHeight * 0.6) })
    const { pathname } = useLocation()

    // Announcements are for patients; staff screens (login, administration) don't show them.
    if (pathname.startsWith(routingPaths.admin) || pathname.startsWith(routingPaths.login)) return null

    return (
        <Root
            role="region"
            aria-label="Oznámení"
            // On phones the widget would cover content while reading, so it only shows over the hero.
            className={isMobile && isPastHero ? 'is-hidden' : undefined}
            sx={{ bottom: (t) => `calc(${t.spacing(3)} + ${bannerHeight}px)` }}
        >
            <Box
                sx={{
                    display: isExpanded ? 'block' : 'none',
                    alignSelf: 'stretch',
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: 8,
                    bgcolor: 'rgb(244, 196, 204)',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pl: 2, pr: 1, pt: 1.5 }}>
                    <CampaignIcon fontSize="small" />
                    <Typography sx={{ fontWeight: 700, flexGrow: 1 }}>Oznámení</Typography>
                    <IconButton size="small" aria-label="Skrýt oznámení" onClick={() => setUserExpanded(false)}>
                        <MinimizeIcon fontSize="small" />
                    </IconButton>
                </Box>
                <Box className={classes.body}>
                    <AnnouncementsList />
                </Box>
            </Box>
            {!isExpanded && (
                <Button
                    variant="contained"
                    startIcon={<CampaignIcon />}
                    onClick={() => setUserExpanded(true)}
                    sx={{
                        borderRadius: 999,
                        textTransform: 'none',
                        boxShadow: 6,
                        color: 'text.primary',
                        bgcolor: 'rgb(244, 196, 204)',
                        '&:hover': { bgcolor: 'rgb(236, 176, 187)' },
                    }}
                >
                    Oznámení
                </Button>
            )}
        </Root>
    )
}

export default AnnouncementsOverlay
