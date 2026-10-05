import { NAVBAR_HEIGHT } from '@components/Navbar/Navbar'
import { MOBILE_NAVBAR_HEIGHT } from '@components/Navbar/MobileNavbar'
import { useReservationDialog } from '@components/Reservation/ReservationProvider'
import { keyframes } from '@emotion/react'
import { Box, Button, Stack, Typography } from '@mui/material'
import { alpha, lighten, styled } from '@mui/material/styles'
import scrollElementIntoView from '@utilities/scrollElementIntoView'
import { HashLink } from 'react-router-hash-link'
import LandingIllustration from '../../assets/landingIllustration.svg'
import routingPaths from '../../routingPaths'

const PREFIX = 'LandingWelcome'
const classes = {
    root: `${PREFIX}-root`,
    circle: `${PREFIX}-circle`,
    content: `${PREFIX}-content`,
    illustration: `${PREFIX}-illustration`,
    illustrationBackdrop: `${PREFIX}-illustrationBackdrop`,
    text: `${PREFIX}-text`,
    headline: `${PREFIX}-headline`,
    accent: `${PREFIX}-accent`,
    subtitle: `${PREFIX}-subtitle`,
    pill: `${PREFIX}-pill`,
    secondaryPill: `${PREFIX}-secondaryPill`,
    bottomLinks: `${PREFIX}-bottomLinks`,
    cta: `${PREFIX}-cta`,
}

// Ambient motion uses transform/opacity only (composited, no layout shift) and every loop starts
// from the element's resting position, so nothing in the first screen paints later because of it.
const drift = keyframes`
    from { transform: translate(0, 0) scale(1); }
    to { transform: translate(18px, -22px) scale(1.06); }
`
const breathe = keyframes`
    from { transform: translate(-50%, -50%) scale(1); }
    to { transform: translate(-50%, -50%) scale(1.05); }
`
const float = keyframes`
    from { transform: translateY(0); }
    to { transform: translateY(-10px); }
`
const fadeUp = keyframes`
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: none; }
`
// Headline/subtitle may be the LCP element on some screens: they slide but never start transparent,
// so they are painted (and counted for LCP) in the very first frame.
const slideUp = keyframes`
    from { transform: translateY(20px); }
    to { transform: none; }
`
const ctaIn = keyframes`
    from { opacity: 0; transform: translateY(12px) scale(0.96); }
    to { opacity: 1; transform: none; }
`
const ctaPulse = keyframes`
    0% { box-shadow: 0 0 0 0 rgba(31, 118, 114, 0.45); }
    70%, 100% { box-shadow: 0 0 0 14px rgba(31, 118, 114, 0); }
`

const Root = styled('section')(({ theme }) => {
    const primary = theme.palette.primary.main

    return {
        [`&.${classes.root}`]: {
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: lighten(primary, 0.94),
            padding: theme.spacing(4, '5%', 6),
            marginBottom: theme.spacing(10),
            // Fill the viewport below the fixed navbar; svh ignores the mobile browser toolbar.
            minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
            [theme.breakpoints.down('md')]: {
                padding: theme.spacing(3, 3, 4),
                marginBottom: theme.spacing(6),
                minHeight: `calc(100svh - ${MOBILE_NAVBAR_HEIGHT}px)`,
            },
        },
        [`& .${classes.circle}`]: {
            position: 'absolute',
            borderRadius: '50%',
            pointerEvents: 'none',
            animation: `${drift} 18s ease-in-out infinite alternate`,
            '&:nth-of-type(2)': { animationDuration: '22s', animationDelay: '-6s' },
            '&:nth-of-type(3)': { animationDuration: '15s', animationDelay: '-3s' },
        },
        [`& .${classes.content}`]: {
            position: 'relative',
            flexGrow: 1,
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '7fr 5fr',
            alignItems: 'center',
            gap: theme.spacing(6),
            maxWidth: 1400,
            margin: '0 auto',
            alignContent: 'center',
            [theme.breakpoints.down('md')]: { gridTemplateColumns: '1fr', gap: theme.spacing(5) },
        },
        [`& .${classes.illustration}`]: {
            position: 'relative',
            [theme.breakpoints.down('md')]: { order: 2 },
            '& img': {
                position: 'relative',
                display: 'block',
                // LCP element: it floats from its final position and is never hidden, so LCP isn't delayed.
                animation: `${float} 6s ease-in-out infinite alternate`,
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                // Shrink on short screens so the whole hero, incl. bottom buttons, stays in one viewport.
                maxHeight: 'max(260px, calc(100vh - 300px))',
                margin: '0 auto',
                [theme.breakpoints.down('md')]: {
                    maxHeight: 'max(180px, calc(100svh - 580px))',
                },
            },
        },
        [`& .${classes.illustrationBackdrop}`]: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '92%',
            aspectRatio: '1',
            transform: 'translate(-50%, -50%)',
            animation: `${breathe} 8s ease-in-out infinite alternate`,
            borderRadius: '50%',
            backgroundColor: alpha(primary, 0.08),
        },
        [`& .${classes.text}`]: {
            textAlign: 'right',
            [theme.breakpoints.down('md')]: { textAlign: 'center' },
        },
        [`& .${classes.headline}`]: {
            fontWeight: 900,
            fontSize: 'clamp(2.25rem, 4.6vw, 4.75rem)',
            lineHeight: 1.02,
            letterSpacing: '-0.01em',
            textWrap: 'balance',
            textTransform: 'uppercase',
            color: theme.palette.text.primary,
            animation: `${slideUp} 700ms cubic-bezier(0.22, 1, 0.36, 1) both`,
        },
        [`& .${classes.accent}`]: { display: 'block', color: primary },
        [`& .${classes.subtitle}`]: {
            marginTop: theme.spacing(3),
            fontSize: 'clamp(1.1rem, 1.6vw, 1.5rem)',
            color: theme.palette.text.secondary,
            [theme.breakpoints.down('md')]: { marginTop: theme.spacing(1.5) },
            animation: `${slideUp} 700ms 100ms cubic-bezier(0.22, 1, 0.36, 1) both`,
        },
        [`& .${classes.pill}`]: { borderRadius: 999, textTransform: 'none' },
        // Main call to action isn't the LCP element: short entrance, then a single soft pulse to draw the eye.
        [`& .${classes.cta}`]: {
            animation: `${ctaIn} 600ms 250ms cubic-bezier(0.22, 1, 0.36, 1) both, ${ctaPulse} 1.6s 1.2s ease-out 2`,
            transition: theme.transitions.create(['transform', 'box-shadow']),
            '&:hover': { transform: 'translateY(-2px)', boxShadow: `0 10px 24px ${alpha(primary, 0.35)}` },
            '&:active': { transform: 'none' },
        },
        // Secondary links aren't the LCP element, so a short entrance is safe here.
        [`& .${classes.bottomLinks}`]: { animation: `${fadeUp} 700ms 300ms cubic-bezier(0.22, 1, 0.36, 1) both` },
        '@media (prefers-reduced-motion: reduce)': {
            [`& .${classes.circle}, & .${classes.illustration} img, & .${classes.illustrationBackdrop}, & .${classes.bottomLinks}, & .${classes.headline}, & .${classes.subtitle}, & .${classes.cta}`]:
                { animation: 'none' },
            [`& .${classes.cta}`]: { transition: 'none', '&:hover': { transform: 'none' } },
        },
        [`& .${classes.secondaryPill}`]: {
            padding: theme.spacing(1, 4),
            minWidth: 240,
            fontSize: '1rem',
            borderWidth: 2,
            '&:hover': { borderWidth: 2 },
            [theme.breakpoints.down('sm')]: { flex: 1, minWidth: 0, padding: theme.spacing(1, 1.5) },
        },
    }
})

// The illustration is the LCP element. React 18 doesn't map `fetchPriority` to the DOM attribute,
// so pass the lowercase HTML attribute through a spread (unknown lowercase attributes are forwarded as-is).
const highFetchPriority = { fetchpriority: 'high' }

const LandingWelcome = () => {
    const { openReservation } = useReservationDialog()

    return (
        <Root className={classes.root}>
            <Box
                className={classes.circle}
                sx={{
                    width: 520,
                    height: 520,
                    top: -300,
                    right: -140,
                    bgcolor: (t) => alpha(t.palette.primary.main, 0.06),
                }}
            />
            <Box
                className={classes.circle}
                sx={{
                    width: 640,
                    height: 640,
                    bottom: -400,
                    right: -220,
                    bgcolor: (t) => alpha(t.palette.primary.main, 0.1),
                }}
            />
            <Box
                className={classes.circle}
                sx={{
                    width: 320,
                    height: 320,
                    bottom: -200,
                    left: -140,
                    bgcolor: (t) => alpha(t.palette.primary.main, 0.06),
                }}
            />
            <Box className={classes.content}>
                <Box className={classes.illustration}>
                    <Box className={classes.illustrationBackdrop} />
                    <img
                        src={LandingIllustration}
                        {...highFetchPriority}
                        width={370}
                        height={281}
                        alt="Lékařka vysvětluje pacientce v gynekologickém křesle"
                    />
                </Box>
                <Box className={classes.text}>
                    <Typography component="h1" className={classes.headline}>
                        Vaše zdraví je u nás <span className={classes.accent}>vždy na prvním místě</span>
                    </Typography>
                    <Typography className={classes.subtitle}>Zarezervujte si svůj termín již dnes.</Typography>
                    <Button
                        className={`${classes.pill} ${classes.cta}`}
                        variant="contained"
                        size="large"
                        onClick={openReservation}
                        sx={{ mt: { xs: 2.5, md: 4 }, px: 6, py: 1.25, fontSize: '1.1rem' }}
                    >
                        Objednat se
                    </Button>
                </Box>
            </Box>
            <Stack
                className={classes.bottomLinks}
                direction="row"
                spacing={{ xs: 1.5, sm: 6 }}
                justifyContent="center"
                sx={{ position: 'relative', mt: { xs: 4, md: 6 } }}
            >
                <Button
                    className={`${classes.pill} ${classes.secondaryPill}`}
                    variant="outlined"
                    component={HashLink}
                    to={routingPaths.services}
                    scroll={(e: HTMLElement) => scrollElementIntoView(e, 'smooth')}
                >
                    Naše služby
                </Button>
                <Button
                    className={`${classes.pill} ${classes.secondaryPill}`}
                    variant="outlined"
                    component={HashLink}
                    to={routingPaths.employees}
                    scroll={(e: HTMLElement) => scrollElementIntoView(e, 'smooth')}
                >
                    Náš personál
                </Button>
            </Stack>
        </Root>
    )
}

export default LandingWelcome
