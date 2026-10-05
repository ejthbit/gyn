import { NAVBAR_HEIGHT } from '@components/Navbar/Navbar'
import { MOBILE_NAVBAR_HEIGHT } from '@components/Navbar/MobileNavbar'
import { useReservationDialog } from '@components/Reservation/ReservationProvider'
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
}

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
        },
        [`& .${classes.accent}`]: { display: 'block', color: primary },
        [`& .${classes.subtitle}`]: {
            marginTop: theme.spacing(3),
            fontSize: 'clamp(1.1rem, 1.6vw, 1.5rem)',
            color: theme.palette.text.secondary,
            [theme.breakpoints.down('md')]: { marginTop: theme.spacing(1.5) },
        },
        [`& .${classes.pill}`]: { borderRadius: 999, textTransform: 'none' },
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
                        className={classes.pill}
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
