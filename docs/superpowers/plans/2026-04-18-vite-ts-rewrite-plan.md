# Gyn App — Vite + TypeScript Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Webpack/Babel/JS/Redux gyn app with a clean Vite/TypeScript build that keeps the landing page and navbar while delegating reservation, admin, and login to the `@ejthbit/reservation-app` npm package.

**Architecture:** Fresh Vite 5 + React 18 + TypeScript scaffold in-place in `/Users/8bit/Desktop/codebase/gyn`. Old Webpack/Redux/component files deleted. Library consumed via `file:../reservation-app`; swap to real npm name when published.

**Tech Stack:** Vite 5, React 18, TypeScript (strict: false, `any` with `// TODO:`), MUI 5, React Router 6, react-router-hash-link, axios, react-hook-form + yup, date-fns, ramda, @ejthbit/reservation-app

---

## Prerequisite

Before Task 1: run `pnpm build` in `/Users/8bit/Desktop/codebase/reservation-app` so the local library dist exists.

---

## File Map

**Create:**

- `index.html`
- `vite.config.ts`
- `tsconfig.json` + `tsconfig.node.json`
- `package.json` (replace)
- `.env.example`
- `src/main.tsx`
- `src/App.tsx`
- `src/theme.ts`
- `src/routingPaths.ts`
- `src/api/config.ts`
- `src/constants/ambulances.ts`
- `src/utilities/checkDeviceType.ts`
- `src/utilities/scrollElementIntoView.ts`
- `src/utilities/isNilOrEmpty.ts`
- `src/utilities/getGoogleMapsUrl.ts`
- `src/assets/SvgIcons.tsx`
- `src/assets/OurTeam/Text/vanek.ts`
- `src/components/Logo/TransparentLogo.tsx`
- `src/components/ScrollTop/ScrollTop.tsx`
- `src/components/Navbar/Navbar.tsx`
- `src/components/Navbar/MobileNavbar.tsx`
- `src/components/LandingWelcome/SonographyInfoModal.tsx`
- `src/components/LandingWelcome/LandingWelcome.tsx`
- `src/components/Services/Service.tsx`
- `src/components/Services/Services.tsx`
- `src/components/OurTeam/PersonDetail.tsx`
- `src/components/OurTeam/Person.tsx`
- `src/components/OurTeam/OurTeam.tsx`
- `src/components/Contacts/ContactForm.tsx`
- `src/components/Contacts/Contacts.tsx`
- `src/components/References/Reference.tsx`
- `src/components/References/References.tsx`
- `src/components/Footer/Footer.tsx`
- `src/pages/LandingPage/LandingPage.tsx`
- `src/pages/ReservationPage.tsx`

**Delete (Task 12):**

- `webpack.common.js`, `webpack.dev.js`, `webpack.prod.js`, `.babelrc`, `jsconfig.json`, `yarn.lock`
- `src/index.ejs`, `src/index.js`, `src/App.js`, `src/Routes.js`
- `src/gynBookingTheme.js`, `src/routingPaths.js`
- `src/store/` (entire), `src/api/` (old), `src/pages/adminView/` (entire)
- `src/components/reservation/` (entire), `src/components/LoginPageForm/` (entire)
- `src/components/ProtectedRoute/` (entire), `src/components/AutomaticLogoutDialog/` (entire)
- `src/components/ScrollRestoration/` (if exists)
- All `src/components/**/*.js` replaced by `.tsx` equivalents
- `src/pages/LandingPage/LandingPage.js`
- `src/utilities/*.js`
- `src/assets/SvgIcons.js`, `src/assets/OurTeam/Text/vanek.js`

---

## Task 1: Scaffold Vite Project

**Files:**

- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `index.html`
- Create: `.env.example`

- [ ] **Step 1: Replace package.json**

```json
{
    "name": "gyn",
    "version": "1.0.0",
    "private": true,
    "scripts": {
        "dev": "vite",
        "build": "tsc && vite build",
        "preview": "vite preview"
    },
    "dependencies": {
        "@ejthbit/reservation-app": "file:../reservation-app",
        "@emotion/react": "^11.11.0",
        "@emotion/styled": "^11.11.0",
        "@hookform/resolvers": "^3.3.0",
        "@mui/icons-material": "^5.14.0",
        "@mui/material": "^5.14.0",
        "axios": "^1.6.0",
        "date-fns": "^2.30.0",
        "ramda": "^0.29.0",
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "react-hook-form": "^7.47.0",
        "react-router-dom": "^6.18.0",
        "react-router-hash-link": "^2.4.3",
        "yup": "^1.3.0"
    },
    "devDependencies": {
        "@types/ramda": "^0.29.6",
        "@types/react": "^18.2.0",
        "@types/react-dom": "^18.2.0",
        "@vitejs/plugin-react": "^4.1.0",
        "typescript": "^5.2.0",
        "vite": "^5.0.0"
    }
}
```

- [ ] **Step 2: Create vite.config.ts**

```typescript
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@components': resolve(__dirname, 'src/components'),
            '@utilities': resolve(__dirname, 'src/utilities'),
            '@assets': resolve(__dirname, 'src/assets'),
        },
    },
})
```

- [ ] **Step 3: Create tsconfig.json**

```json
{
    "compilerOptions": {
        "target": "ES2020",
        "useDefineForClassFields": true,
        "lib": ["ES2020", "DOM", "DOM.Iterable"],
        "module": "ESNext",
        "skipLibCheck": true,
        "moduleResolution": "bundler",
        "allowImportingTsExtensions": true,
        "resolveJsonModule": true,
        "isolatedModules": true,
        "noEmit": true,
        "jsx": "react-jsx",
        "strict": false,
        "baseUrl": ".",
        "paths": {
            "@components/*": ["./src/components/*"],
            "@utilities/*": ["./src/utilities/*"],
            "@assets/*": ["./src/assets/*"]
        }
    },
    "include": ["src"],
    "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 4: Create tsconfig.node.json**

```json
{
    "compilerOptions": {
        "composite": true,
        "skipLibCheck": true,
        "module": "ESNext",
        "moduleResolution": "bundler",
        "allowSyntheticDefaultImports": true
    },
    "include": ["vite.config.ts"]
}
```

- [ ] **Step 5: Create index.html**

```html
<!DOCTYPE html>
<html lang="cs">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Nunito&display=swap" rel="stylesheet" />
        <title>Vaněk Gynekologie</title>
    </head>
    <body>
        <div id="root"></div>
        <script type="module" src="/src/main.tsx"></script>
    </body>
</html>
```

- [ ] **Step 6: Create .env.example**

```
VITE_API_BASE_URL=http://localhost:8080
VITE_APPOINTMENT_DURATION=20
```

- [ ] **Step 7: Install dependencies**

Run in `/Users/8bit/Desktop/codebase/gyn`:

```bash
pnpm install
```

Expected: `node_modules/` created, `@ejthbit/reservation-app` resolved from `../reservation-app/dist`.

---

## Task 2: Core App Shell

**Files:**

- Create: `src/main.tsx`
- Create: `src/theme.ts`
- Create: `src/routingPaths.ts`
- Create: `src/App.tsx`

- [ ] **Step 1: Create src/theme.ts**

```typescript
import { createTheme, lighten } from '@mui/material'

const gynBookingTheme = createTheme({
    typography: {
        fontFamily: ['Nunito', 'sans-serif'].join(','),
    },
    palette: {
        primary: {
            main: '#1f7672',
        },
        secondary: {
            main: '#11cb5f',
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                html: {
                    WebkitFontSmoothing: 'auto',
                    margin: 0,
                    padding: 0,
                    overflowX: 'hidden',
                    height: '100vh',
                    width: '100vw',
                    boxSizing: 'unset',
                },
                body: {
                    margin: 0,
                    padding: 0,
                    height: '100vh',
                    width: '100vw',
                    backgroundColor: '#f8f8f8',
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&$selected': {
                        backgroundColor: lighten('#2DAAA3', 0.85),
                        '&:hover': {
                            backgroundColor: '#0000000a',
                        },
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                containedPrimary: {
                    color: '#FFF',
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                asterisk: {
                    color: '#db3131',
                    '&$error': {
                        color: '#db3131',
                    },
                },
            },
        },
        MuiLink: {
            defaultProps: {
                underline: 'hover',
            },
        },
    },
})

export default gynBookingTheme
```

- [ ] **Step 2: Create src/routingPaths.ts**

```typescript
const routingPaths = {
    login: '/login',
    services: '/#services',
    employees: '/#personnel',
    reservation: '/rezervace',
    contact: '/#contact',
    admin: '/admin',
}

export const adminPaths = {
    orders: `${routingPaths.admin}/orders`,
    doctorServices: `${routingPaths.admin}/doctorsServices`,
    calendar: `${routingPaths.admin}/calendar`,
}

export default routingPaths
```

- [ ] **Step 3: Create src/main.tsx**

```tsx
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { UserProvider } from '@ejthbit/reservation-app'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import gynBookingTheme from './theme'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <ThemeProvider theme={gynBookingTheme}>
            <UserProvider>
                <CssBaseline />
                <App />
            </UserProvider>
        </ThemeProvider>
    </BrowserRouter>
)
```

- [ ] **Step 4: Create src/App.tsx (skeleton — routes added in Task 11)**

```tsx
import { Box, CircularProgress } from '@mui/material'
import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

const LandingPage = lazy(() => import('./pages/LandingPage/LandingPage'))

const App = () => (
    <Suspense
        fallback={
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <CircularProgress size={40} />
            </Box>
        }
    >
        <Routes>
            <Route path="/" element={<LandingPage />} />
        </Routes>
    </Suspense>
)

export default App
```

- [ ] **Step 5: Create stub LandingPage so dev server boots**

Create `src/pages/LandingPage/LandingPage.tsx`:

```tsx
import React from 'react'

const LandingPage = () => <div>Landing page coming soon</div>

export default LandingPage
```

- [ ] **Step 6: Verify dev server starts**

Run:

```bash
pnpm dev
```

Expected: Vite starts on `http://localhost:5173`, browser shows "Landing page coming soon". No console errors about missing modules.

---

## Task 3: Shared Utilities + Constants

**Files:**

- Create: `src/utilities/checkDeviceType.ts`
- Create: `src/utilities/scrollElementIntoView.ts`
- Create: `src/utilities/isNilOrEmpty.ts`
- Create: `src/utilities/getGoogleMapsUrl.ts`
- Create: `src/constants/ambulances.ts`
- Create: `src/api/config.ts`

- [ ] **Step 1: Create src/utilities/checkDeviceType.ts**

```typescript
const ua = navigator.userAgent

export const isTablet = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)
export const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
export const isIOS = /|iPhone|iPad|iPod/i.test(ua)
```

- [ ] **Step 2: Create src/utilities/scrollElementIntoView.ts**

```typescript
const scrollElementIntoView = (e: HTMLElement, behavior?: ScrollBehavior) => {
    const scrollTop = window.pageYOffset || e.scrollTop
    const headerHeight = 144
    const finalOffset = e.getBoundingClientRect().top + scrollTop - headerHeight
    window.parent.scrollTo({ top: finalOffset, behavior: behavior ?? 'auto' })
}

export default scrollElementIntoView
```

- [ ] **Step 3: Create src/utilities/isNilOrEmpty.ts**

```typescript
// TODO: narrow types if needed
const isNilOrEmpty = (value: any): boolean => {
    if (value == null) return true
    if (Array.isArray(value)) return value.length === 0
    if (typeof value === 'object') return Object.keys(value).length === 0
    if (typeof value === 'string') return value.trim() === ''
    return false
}

export default isNilOrEmpty
```

- [ ] **Step 4: Create src/utilities/getGoogleMapsUrl.ts**

```typescript
type Location = { lat: number; lon: number }

const getGoogleMapsUrl = ({ lat, lon }: Location): string =>
    `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`

export default getGoogleMapsUrl
```

- [ ] **Step 5: Create src/constants/ambulances.ts**

Extracted from the hardcoded data in Contacts.js so both Contacts and ContactForm share it:

```typescript
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
```

- [ ] **Step 6: Create src/api/config.ts**

```typescript
import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})

export default api
```

- [ ] **Step 7: Verify build**

Run:

```bash
pnpm build
```

Expected: No TypeScript errors. `dist/` created.

---

## Task 4: Base Components (Logo, ScrollTop, SvgIcons)

**Files:**

- Create: `src/components/Logo/TransparentLogo.tsx`
- Create: `src/components/ScrollTop/ScrollTop.tsx`
- Create: `src/assets/SvgIcons.tsx`
- Create: `src/assets/OurTeam/Text/vanek.ts`

- [ ] **Step 1: Create src/components/Logo/TransparentLogo.tsx**

Copy SVG verbatim from `src/components/Logo/TransparentLogo.js`, rename extension to `.tsx`:

```tsx
import React from 'react'

const TransparentLogo = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 431.96 56.99">
            {/* Copy all <path> elements verbatim from src/components/Logo/TransparentLogo.js */}
        </svg>
    )
}

export default TransparentLogo
```

The SVG paths are unchanged — copy them directly from `src/components/Logo/TransparentLogo.js`.

- [ ] **Step 2: Create src/components/ScrollTop/ScrollTop.tsx**

```tsx
import { KeyboardArrowUp } from '@mui/icons-material'
import { Box, Fab, useScrollTrigger, Zoom } from '@mui/material'
import React from 'react'

const ScrollTop = () => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    })

    const handleClick = () => window.scrollTo({ top: 0, behavior: 'smooth' })

    return (
        <Zoom in={trigger}>
            <Box onClick={handleClick} role="presentation" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
                <Fab color="primary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUp color="inherit" />
                </Fab>
            </Box>
        </Zoom>
    )
}

export default ScrollTop
```

- [ ] **Step 3: Create src/assets/SvgIcons.tsx**

Rename `src/assets/SvgIcons.js` → `src/assets/SvgIcons.tsx`. The file contains React components returning JSX — no code changes needed, only the extension changes. Copy the file contents verbatim.

- [ ] **Step 4: Create src/assets/OurTeam/Text/vanek.ts**

Copy verbatim from `src/assets/OurTeam/Text/vanek.js` — no code changes, only rename to `.ts`:

```typescript
export const vanekText = {
    section1: [
        'Absolvent gymnázia Mikoláše Koperníka v Bílovci - 1986',
        // ... copy all lines from vanek.js
    ],
    section2: [
        // ... copy all lines from vanek.js
    ],
}
export const medveckaText = {
    /* copy from vanek.js */
}
export const vankovaText = {
    /* copy from vanek.js */
}
```

Copy the full content of `src/assets/OurTeam/Text/vanek.js` verbatim and rename to `.ts`.

---

## Task 5: Navbar

**Files:**

- Create: `src/components/Navbar/Navbar.tsx`
- Create: `src/components/Navbar/MobileNavbar.tsx`

- [ ] **Step 1: Create src/components/Navbar/MobileNavbar.tsx**

```tsx
import TransparentLogo from '@components/Logo/TransparentLogo'
import { Close as CloseIcon, Menu as MenuIcon } from '@mui/icons-material'
import { AppBar, Box, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import MuiDrawer from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'
import scrollElementIntoView from '@utilities/scrollElementIntoView'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

type Route = { text: React.ReactNode; link: string }

type MobileNavbarProps = {
    routes: Route[]
}

const PREFIX = 'MobileNavbar'
const classes = {
    logo: `${PREFIX}-logo`,
    drawerLogo: `${PREFIX}-drawerLogo`,
    drawerRoot: `${PREFIX}-drawer`,
    root: `${PREFIX}-root`,
    toolbar: `${PREFIX}-toolbar`,
    menuItem: `${PREFIX}-menuItem`,
    offSet: `${PREFIX}-offSet`,
}

const Root = styled('div')(({ theme }) => ({
    [`& .${classes.logo}`]: {
        '& svg': {
            padding: theme.spacing(1),
            '& path': { fill: `${theme.palette.common.black} !important` },
        },
    },
    [`& .${classes.root}`]: { boxShadow: 'none', backgroundColor: 'transparent' },
    [`& .${classes.toolbar}`]: { background: '#f8f8f8', paddingTop: theme.spacing(2) },
    [`& .${classes.offSet}`]: { minHeight: theme.spacing(12) },
}))

const StyledDrawer = styled(MuiDrawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        width: '100%',
        textAlign: 'center',
        '& a': {
            '& svg': {
                width: '80%',
                padding: theme.spacing(1),
                '& path': { fill: `${theme.palette.common.black} !important` },
            },
        },
    },
    [`& .${classes.menuItem}`]: {
        padding: theme.spacing(1.5),
        '& a': {
            fontSize: 20,
            color: theme.palette.common.black,
            textDecoration: 'none',
            '&:hover': { color: '#000', borderBottom: '1px solid black' },
        },
        '& .MuiSvgIcon-root': { height: 27, padding: theme.spacing(0.5, 0, 0, 0) },
    },
}))

const MobileNavbar = ({ routes }: MobileNavbarProps) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const handleToggleDrawer = () => setIsDrawerOpen((prev) => !prev)

    return (
        <Root>
            <AppBar position="fixed" className={classes.root}>
                <Toolbar className={classes.toolbar}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item xs={6}>
                            <NavLink to="/" className={classes.logo}>
                                <TransparentLogo />
                            </NavLink>
                        </Grid>
                        <Grid item container xs={3} direction="column">
                            <IconButton onClick={handleToggleDrawer} size="large">
                                <MenuIcon />
                                <Box marginLeft={0.5}>
                                    <Typography>Menu</Typography>
                                </Box>
                            </IconButton>
                        </Grid>
                    </Grid>
                    <StyledDrawer
                        anchor="right"
                        open={isDrawerOpen}
                        onClose={handleToggleDrawer}
                        className={classes.drawerRoot}
                    >
                        <IconButton onClick={handleToggleDrawer} size="large">
                            <CloseIcon />
                        </IconButton>
                        <NavLink to="/" className={classes.drawerLogo} onClick={handleToggleDrawer}>
                            <TransparentLogo />
                        </NavLink>
                        {routes.map(({ text, link }) => (
                            <Grid key={link} item onClick={handleToggleDrawer}>
                                <Typography variant="body1" className={classes.menuItem}>
                                    <HashLink to={link} scroll={(e) => scrollElementIntoView(e, 'smooth')}>
                                        {text}
                                    </HashLink>
                                </Typography>
                            </Grid>
                        ))}
                    </StyledDrawer>
                </Toolbar>
            </AppBar>
            <Box className={classes.offSet} />
        </Root>
    )
}

export default MobileNavbar
```

- [ ] **Step 2: Create src/components/Navbar/Navbar.tsx**

```tsx
import TransparentLogo from '@components/Logo/TransparentLogo'
import { AccountCircleOutlined } from '@mui/icons-material'
import { AppBar, Box, Grid, Toolbar, Typography } from '@mui/material'
import { styled } from '@mui/system'
import scrollElementIntoView from '@utilities/scrollElementIntoView'
import { isMobile } from '@utilities/checkDeviceType'
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import routingPaths from '../../routingPaths'
import MobileNavbar from './MobileNavbar'

const PREFIX = 'Navbar'
const classes = {
    navbarBackground: `${PREFIX}-navbarBackground`,
    logo: `${PREFIX}-logo`,
    menuItem: `${PREFIX}-menuItem`,
    offSet: `${PREFIX}-offSet`,
}

const Root = styled('div')(({ theme }) => ({
    [`& .${classes.navbarBackground}`]: {
        '& .MuiToolbar-root': { paddingTop: 20 },
        height: 80,
        backgroundColor: theme.palette.primary.main,
    },
    [`& .${classes.logo}`]: {
        '& svg': {
            width: '100%',
            maxWidth: 280,
            '&:hover': { '& path': { fill: theme.palette.common.black }, cursor: 'pointer' },
        },
    },
    [`& .${classes.menuItem}`]: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        '& a': {
            fontSize: 20,
            color: theme.palette.common.white,
            textDecoration: 'none',
            '&:hover': { color: '#000', borderBottom: '1px solid black' },
        },
        '& svg': { paddingTop: theme.spacing(0.5), height: 27 },
    },
    [`& .${classes.offSet}`]: { minHeight: theme.spacing(12) },
}))

export const routes = [
    { text: 'Naše služby', link: routingPaths.services },
    { text: 'Personál', link: routingPaths.employees },
    { text: 'Rezervace', link: routingPaths.reservation },
    { text: 'Kontakt', link: routingPaths.contact },
    { text: <AccountCircleOutlined />, link: routingPaths.login },
]

const Navbar = () => {
    const location = useLocation()

    return (
        !location.pathname.match(routingPaths.admin) &&
        (isMobile ? (
            <MobileNavbar routes={routes} />
        ) : (
            <Root>
                <AppBar className={classes.navbarBackground} position="fixed">
                    <Toolbar>
                        <Grid container spacing={3} alignItems="center">
                            <Grid item md={2}>
                                <NavLink to="/" className={classes.logo}>
                                    <TransparentLogo />
                                </NavLink>
                            </Grid>
                            <Grid container md={10} spacing={2} item alignItems="center" justifyContent="flex-end">
                                {routes.map(({ text, link }) => (
                                    <Grid key={link} item>
                                        <Typography variant="body1" className={classes.menuItem}>
                                            <HashLink to={link} scroll={(e) => scrollElementIntoView(e, 'smooth')}>
                                                {text}
                                            </HashLink>
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Box className={classes.offSet} />
            </Root>
        ))
    )
}

export default Navbar
```

- [ ] **Step 3: Add Navbar + ScrollTop to App.tsx**

```tsx
import { AdministrationPage, Login, ProtectedRoute } from '@ejthbit/reservation-app'
import { Box, CircularProgress } from '@mui/material'
import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '@components/Navbar/Navbar'
import ScrollTop from '@components/ScrollTop/ScrollTop'
import routingPaths from './routingPaths'

const LandingPage = lazy(() => import('./pages/LandingPage/LandingPage'))
const ReservationPage = lazy(() => import('./pages/ReservationPage'))

const App = () => (
    <Suspense
        fallback={
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <CircularProgress size={40} />
            </Box>
        }
    >
        <Navbar />
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path={routingPaths.reservation} element={<ReservationPage />} />
            <Route path={routingPaths.login} element={<Login />} />
            <Route
                path={`${routingPaths.admin}/*`}
                element={
                    <ProtectedRoute>
                        <AdministrationPage />
                    </ProtectedRoute>
                }
            />
        </Routes>
        <ScrollTop />
    </Suspense>
)

export default App
```

- [ ] **Step 4: Verify Navbar renders**

Run `pnpm dev`. Navigate to `http://localhost:5173`. Expected: teal AppBar visible with nav links. No console errors.

---

## Task 6: LandingWelcome

**Files:**

- Create: `src/components/LandingWelcome/SonographyInfoModal.tsx`
- Create: `src/components/LandingWelcome/LandingWelcome.tsx`

- [ ] **Step 1: Create src/components/LandingWelcome/SonographyInfoModal.tsx**

Redux removed. Fetches dates directly via axios. `getCurrentMonthSonographyDates` is replaced by a GET request.

```tsx
import api from '../../api/config'
import isNilOrEmpty from '@utilities/isNilOrEmpty'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'

type SonographyDate = { date: string; from: string; to: string }

type SonographyInfoModalProps = {
    open: boolean
    handleClose: () => void
}

const PREFIX = 'SonographyInfoModal'
const classes = {
    title: `${PREFIX}-title`,
    actions: `${PREFIX}-actions`,
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
    [`& .${classes.title}`]: {
        [theme.breakpoints.down('md')]: { textAlign: 'center' },
        paddingBottom: 0,
    },
    [`& .${classes.actions}`]: {
        justifyContent: 'flex-end',
        paddingRight: theme.spacing(6.5),
        paddingLeft: theme.spacing(6.5),
        '& span': { color: 'red' },
        '& .MuiButtonBase-root': { width: '30%' },
        [theme.breakpoints.down('md')]: {
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2),
        },
    },
}))

const SonographyInfoModal = ({ open, handleClose }: SonographyInfoModalProps) => {
    const [sonographyDates, setSonographyDates] = useState<SonographyDate[]>([])

    useEffect(() => {
        if (open && isNilOrEmpty(sonographyDates)) {
            // TODO: verify this endpoint matches the backend route for sonography dates
            api.get<SonographyDate[]>('/bookings/sonography-dates')
                .then((res) => setSonographyDates(res.data))
                .catch(() => setSonographyDates([]))
        }
    }, [open])

    return (
        <StyledDialog maxWidth="sm" open={open} onClose={handleClose} fullWidth>
            <DialogTitle className={classes.title}>
                <Typography variant="h5">Termíny Sonografie prsou (Frýdek-Místek)</Typography>
            </DialogTitle>
            <DialogContent>
                <Box margin={2}>
                    {!isNilOrEmpty(sonographyDates) ? (
                        sonographyDates.map(({ date, from, to }) => (
                            <Typography key={date} align="center">
                                {`${format(new Date(date), 'dd/MM/yyyy')} (${from}-${to})`}
                            </Typography>
                        ))
                    ) : (
                        <Typography variant="body1" color="error">
                            Omlouváme se ale na tento měsíc nejsou vypsány termíny sonografie.
                        </Typography>
                    )}
                </Box>
                <Typography variant="body2">
                    Objednání na sonografii prsou pouze telefonicky na čísle 558 632 133.
                </Typography>
                <Typography variant="body2" color="primary">
                    Objednávat se mohou také klientky, které nejsou registrované v naší ambulanci.
                </Typography>
            </DialogContent>
            <DialogActions className={classes.actions}>
                <Button variant="outlined" onClick={handleClose} color="primary">
                    <Typography color="primary" variant="body2">
                        Zavřít
                    </Typography>
                </Button>
            </DialogActions>
        </StyledDialog>
    )
}

export default SonographyInfoModal
```

- [ ] **Step 2: Create src/components/LandingWelcome/LandingWelcome.tsx**

Redux removed. `LandingPageReservationModal` replaced by `ReservationDialog` from library.

```tsx
import { ReservationDialog } from '@ejthbit/reservation-app'
import { Box, Button, ButtonGroup, Grid, Slide, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { isMobile } from '@utilities/checkDeviceType'
import React, { useState } from 'react'
import LandingPageImg from '../../assets/landingImg.jpg'
import LandingMobileImg from '../../assets/landingMobile.png'
import SonographyInfoModal from './SonographyInfoModal'

const PREFIX = 'LandingWelcome'
const classes = {
    root: `${PREFIX}-root`,
    firstHeadline: `${PREFIX}-firstHeadline`,
    btnsContainer: `${PREFIX}-btnsContainer`,
    btn: `${PREFIX}-btn`,
}

const Root = styled(Box)(({ theme }) => ({
    [`&.${classes.root}`]: {
        minHeight: 430,
        backgroundImage: `url(${LandingPageImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
        height: '60vh',
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingTop: 100,
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
            paddingLeft: '5% !important',
            paddingRight: '5% !important',
            paddingTop: 50,
            backgroundImage: `url(${LandingMobileImg})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            fontStyle: 'italic',
            minHeight: 280,
            height: '90vh',
        },
        marginTop: -24,
    },
    [`& .${classes.firstHeadline}`]: {
        '& .MuiTypography-root': { fontWeight: 'bold' },
        [theme.breakpoints.up('md')]: { paddingRight: '68% !important' },
    },
    [`& .${classes.btnsContainer}`]: {
        maxWidth: '100%',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
            padding: `${theme.spacing(1)} !important`,
        },
    },
    [`& .${classes.btn}`]: {
        '& .MuiButton-label': { color: '#FFF' },
    },
}))

const LandingWelcome = () => {
    const [isReservationOpen, setIsReservationOpen] = useState(false)
    const [isSonographyInfoOpen, setIsSonographyInfoOpen] = useState(false)

    const handleToggleReservation = () => setIsReservationOpen((prev) => !prev)
    const handleToggleSono = () => setIsSonographyInfoOpen((prev) => !prev)

    return (
        <Root className={classes.root}>
            <ReservationDialog isOpen={isReservationOpen} onClose={handleToggleReservation} />
            <SonographyInfoModal open={isSonographyInfoOpen} handleClose={handleToggleSono} />
            <Grid container>
                <Grid item xs={12} className={classes.firstHeadline}>
                    <Typography variant={isMobile ? 'h4' : 'h3'}>Vaše zdraví je u nás vždy na prvním místě</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography color="textSecondary" variant={isMobile ? 'body1' : 'h5'}>
                        Zarezervujte si svůj termín již dnes.
                    </Typography>
                </Grid>
                <Grid item container xs={12} spacing={2} className={classes.btnsContainer} justifyContent="flex-start">
                    <Grid item xs={12} md={6}>
                        <Slide direction="right" in mountOnEnter unmountOnExit timeout={700}>
                            <ButtonGroup variant="contained" orientation={isMobile ? 'vertical' : 'horizontal'}>
                                <Button
                                    className={classes.btn}
                                    size="large"
                                    color="primary"
                                    variant="contained"
                                    onClick={handleToggleReservation}
                                    fullWidth
                                >
                                    <Typography>Objednat se</Typography>
                                </Button>
                                <Button
                                    className={classes.btn}
                                    size="large"
                                    color="primary"
                                    variant="contained"
                                    onClick={handleToggleSono}
                                    fullWidth
                                >
                                    <Typography>Termíny sonografie prsou</Typography>
                                </Button>
                            </ButtonGroup>
                        </Slide>
                    </Grid>
                </Grid>
            </Grid>
        </Root>
    )
}

export default LandingWelcome
```

---

## Task 7: Services Section

**Files:**

- Create: `src/components/Services/Service.tsx`
- Create: `src/components/Services/Services.tsx`

- [ ] **Step 1: Create src/components/Services/Service.tsx**

```tsx
import { Card, CardContent, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { ReactElement } from 'react'

type ServiceProps = {
    icon: ReactElement
    label: string
    description: string
}

const PREFIX = 'Service'
const classes = {
    root: `${PREFIX}-root`,
    icon: `${PREFIX}-icon`,
    label: `${PREFIX}-label`,
}

const StyledCard = styled(Card)(({ theme }) => ({
    [`&.${classes.root}`]: {
        color: '#000',
        borderRadius: 6,
        wordBreak: 'break-word',
        backgroundClip: 'border-box',
        boxShadow: 'none',
        border: 'none',
        background: 'transparent',
        '& .MuiTypography-h5': { marginBottom: theme.spacing(1.5) },
        '& .MuiTypography-body2': { color: '#8f8f8f' },
    },
    [`& .${classes.icon}`]: {
        padding: theme.spacing(1),
        '& svg': {
            padding: 6,
            width: 65,
            height: 65,
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: 6,
        },
    },
    [`& .${classes.label}`]: { paddingTop: theme.spacing(0.5), textAlign: 'center' },
}))

const Service = ({ icon, label, description }: ServiceProps) => (
    <StyledCard className={classes.root}>
        <CardContent>
            <Grid container direction="column" alignItems="center" justifyContent="center">
                <Grid item xs={12} className={classes.icon}>
                    {icon}
                </Grid>
                <Grid item xs={12} className={classes.label}>
                    <Typography variant="h5">{label}</Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="body2" component="p" align="center">
                        {description}
                    </Typography>
                </Grid>
            </Grid>
        </CardContent>
    </StyledCard>
)

export default Service
```

- [ ] **Step 2: Create src/components/Services/Services.tsx**

```tsx
import {
    Advisementicon,
    DiagnosticIcon,
    PregnancyCareIcon,
    RoutineExaminationIcon,
    SonographyIcon,
    SpecialTreatmentIcon,
} from '@assets/SvgIcons'
import { Divider, Fade, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'
import Service from './Service'

const PREFIX = 'Services'
const classes = { root: `${PREFIX}-root` }

const StyledGrid = styled(Grid)(({ theme }) => ({
    [`&.${classes.root}`]: {
        paddingLeft: '15%',
        paddingRight: '15%',
        paddingBottom: '10%',
        '& .MuiTypography-h3': {
            marginBottom: theme.spacing(2),
            fontWeight: 'bold',
            textAlign: 'center',
            [theme.breakpoints.down('sm')]: { textAlign: 'center' },
        },
        '& .MuiTypography-body1': { color: '#8f8f8f' },
    },
}))

const services = [
    {
        icon: <RoutineExaminationIcon />,
        label: 'Preventivní prohlídky',
        description:
            'Od svých 15 let má každá žena nárok na bezplatnou preventivní prohlídku u gynekologa, a to jedenkrát za rok (po uplynutí 11 měsíců). Prohlídka je přizpůsobena věku ženy a tomu, zda je sexuálně aktivní.',
    },
    {
        icon: <PregnancyCareIcon />,
        label: 'Péče o těhotné',
        description:
            'Zajišťujeme péči o budoucí maminky včetně ultrazvuku, krevních testů, pravidelných prohlídek a zprostředkovaně také screening vrozených vývojových vad plodu.',
    },
    {
        icon: <Advisementicon />,
        label: 'Poradenství',
        description: 'Nabizíme poradenství v oblastech antikoncepce, přechodu a gynekologických potížích.',
    },
    {
        icon: <SonographyIcon />,
        label: 'Sonografie prsu',
        description:
            'Sonografické, neboli ultrazvukové vyšetření prsou patří v dnešní době k nejdůležitějším vyšetřovacím praktikám sloužícím k včasnému nálezu rakoviny prsou.',
    },
    {
        icon: <DiagnosticIcon />,
        label: 'Prevence a diagnostika nádorových onemocnění',
        description:
            'Součástí každé preventivní prohlídky je také onkologická cytologie, která pomáhá s včasným záchytem nádorových onemocnění čípku děložního, pochvy, sliznice děložní i zevního genitálu.',
    },
    {
        icon: <SpecialTreatmentIcon />,
        label: 'Speciální vyšetrení',
        description:
            'Mimo jiné se zabýváme také léčbou sterility, přípravou pacientek do zařazení IVF programů či dětskou gynekologií.',
    },
]

const Services = () => (
    <StyledGrid className={classes.root} container spacing={2} id="services">
        <Grid item xs={12}>
            <Typography variant="h3">Naše služby</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography variant="body1" component="p" align="center">
                {`Naše ambulance nabízí těhotenskou a gynekologickou péči pro ženy ve všech fázích života, od předpubertálních let po postmenopauzální období.`}
                <br />
                {`Svým pacientkám chceme dopřát co nejkomplexnější péči, proto nabízíme speciální služby včetně mateřské fetální medicíny, gynekologické onkologie, antikoncepčního poradenství a dalších.`}
                <br />
                {`Další informace o tom, jak vám můžeme pomoci, naleznete v níže uvedených službách.`}
            </Typography>
        </Grid>
        {services.map(({ icon, label, description }, index) => (
            <Fade key={label} in timeout={3000 * index}>
                <Grid xs={12} sm={6} item>
                    <Service icon={icon} label={label} description={description} />
                </Grid>
            </Fade>
        ))}
        <Divider variant="middle" />
    </StyledGrid>
)

export default Services
```

---

## Task 8: OurTeam Section

**Files:**

- Create: `src/components/OurTeam/PersonDetail.tsx`
- Create: `src/components/OurTeam/Person.tsx`
- Create: `src/components/OurTeam/OurTeam.tsx`

- [ ] **Step 1: Create src/components/OurTeam/PersonDetail.tsx**

```tsx
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import React from 'react'

type PersonText = { section1: string[]; section2?: string[] }

type PersonDetailProps = {
    open: boolean
    handleClose: () => void
    title: string
    text: PersonText
}

const PersonDetail = ({ open, handleClose, title, text }: PersonDetailProps) => (
    <Dialog maxWidth="sm" open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
            <Typography variant="h5">{title}</Typography>
        </DialogTitle>
        <DialogContent>
            <Box mb={2}>
                {text.section1.map((line) => (
                    <Typography key={line} variant="body2" gutterBottom>
                        {line}
                    </Typography>
                ))}
            </Box>
            {text.section2 && (
                <Box>
                    {text.section2.map((line) => (
                        <Typography key={line} variant="body2" gutterBottom>
                            {line}
                        </Typography>
                    ))}
                </Box>
            )}
        </DialogContent>
        <DialogActions>
            <Button variant="outlined" onClick={handleClose} color="primary">
                Zavřít
            </Button>
        </DialogActions>
    </Dialog>
)

export default PersonDetail
```

- [ ] **Step 2: Create src/components/OurTeam/Person.tsx**

```tsx
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { useState } from 'react'
import PersonDetail from './PersonDetail'

type PersonText = { section1: string[]; section2?: string[] }

type PersonProps = {
    image?: string
    fullName: string
    specialization?: string
    text?: PersonText
}

const PREFIX = 'Person'
const classes = {
    root: `${PREFIX}-root`,
    image: `${PREFIX}-image`,
}

const StyledBox = styled(Box)(() => ({
    [`&.${classes.root}`]: { textAlign: 'center' },
    [`& .${classes.image}`]: {
        width: 270,
        height: 270,
        transition: 'border 0.5s ease',
        border: '5px solid #1f7a74',
        borderRadius: '50%',
        marginBottom: '10px',
        '&:hover': { border: '5px solid #70dbd4', cursor: 'pointer' },
    },
}))

const Person = ({ image, fullName, specialization, text }: PersonProps) => {
    const [open, setOpen] = useState(false)
    const handleToggleDetail = () => setOpen((prev) => !prev)

    return (
        <StyledBox className={classes.root}>
            {image && (
                <img src={image} loading="lazy" className={classes.image} onClick={handleToggleDetail} alt={fullName} />
            )}
            <Typography variant="h6">{fullName}</Typography>
            <Typography variant="caption" color="textSecondary">
                {specialization}
            </Typography>
            {text && <PersonDetail open={open} handleClose={handleToggleDetail} title={fullName} text={text} />}
        </StyledBox>
    )
}

export default Person
```

- [ ] **Step 3: Create src/components/OurTeam/OurTeam.tsx**

```tsx
import { Fade, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { lazy } from 'react'
import Hrtonova from '../../assets/OurTeam/Img/hrtonova.jpg'
import Medvecka from '../../assets/OurTeam/Img/medvecka.jpg'
import UnknownMale from '../../assets/OurTeam/Img/unkown-male-doctor.png'
import Vanek from '../../assets/OurTeam/Img/vanek.jpg'
import Vankova from '../../assets/OurTeam/Img/vankova.jpg'
import { medveckaText, vanekText, vankovaText } from '../../assets/OurTeam/Text/vanek'
import Person from './Person'

const PREFIX = 'OurTeam'
const classes = {
    root: `${PREFIX}-root`,
    personSectionTypo: `${PREFIX}-personSectionTypo`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
    [`&.${classes.root}`]: {
        paddingLeft: '10%',
        paddingRight: '10%',
        paddingBottom: '10%',
        '& .MuiTypography-h3': {
            marginBottom: theme.spacing(2),
            fontWeight: 'bold',
            textAlign: 'center',
            [theme.breakpoints.down('sm')]: { textAlign: 'center' },
        },
        '& .MuiTypography-body1': { color: '#8f8f8f', marginBottom: theme.spacing(2) },
    },
    [`& .${classes.personSectionTypo}`]: {
        margin: 'auto',
        marginBottom: '20px',
        marginTop: '20px',
    },
}))

const doctors = [
    { fullName: 'MUDr. Miroslav Vaněk', specialization: 'Gynekologie a porodnictví', image: Vanek, text: vanekText },
    { fullName: 'prim. MUDr. Hana Vaňková', specialization: 'Sonografie prsou', image: Vankova, text: vankovaText },
    {
        fullName: 'MUDr. Jana Medvecká',
        specialization: 'Gynekologie a porodnictví',
        image: Medvecka,
        text: medveckaText,
    },
    { fullName: 'MUDr. Jaroslav Vaněk', specialization: 'Gynekologie a porodnictví', image: UnknownMale },
]

const OurTeam = () => (
    <StyledGrid className={classes.root} container spacing={2} id="personnel">
        <Grid item xs={12}>
            <Typography variant="h3">Náš tým</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography variant="body1" component="p" align="center">
                Naši vysoce kvalifikovaní lékaři a sestry se věnují ženám všech věkových kategorii při zvládání různých
                stavů, problémů a poruch, ale také při udržování plného zdraví.
            </Typography>
        </Grid>
        <Typography variant="h5" className={classes.personSectionTypo}>
            Lékaři
        </Typography>
        <Grid container justifyContent="center" spacing={8}>
            {doctors.map((doctor, index) => (
                <Fade key={doctor.fullName} in timeout={1000 * index}>
                    <Grid item md={3}>
                        <Person {...doctor} />
                    </Grid>
                </Fade>
            ))}
        </Grid>
        <Typography variant="h5" className={classes.personSectionTypo}>
            Zdravotní sestry
        </Typography>
        <Grid container justifyContent="center" spacing={8}>
            {nurses.map((nurse, index) => (
                <Fade key={nurse.fullName} in timeout={1000 * index}>
                    <Grid item>
                        <Person {...nurse} />
                    </Grid>
                </Fade>
            ))}
        </Grid>
    </StyledGrid>
)

export default OurTeam
```

---

## Task 9: Contacts Section

**Files:**

- Create: `src/components/Contacts/ContactForm.tsx`
- Create: `src/components/Contacts/Contacts.tsx`

- [ ] **Step 1: Create src/components/Contacts/ContactForm.tsx**

Redux removed. Uses hardcoded `AMBULANCES` constant. `sendContactMessage` replaced by direct axios POST.

```tsx
import api from '../../api/config'
import { AMBULANCES } from '../../constants/ambulances'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

const PREFIX = 'ContactForm'
const classes = {
    title: `${PREFIX}-title`,
    input: `${PREFIX}-input`,
    btn: `${PREFIX}-btn`,
}

const Root = styled('form')(({ theme }) => ({
    [`& .${classes.title}`]: { paddingBottom: theme.spacing(1) },
    [`& .${classes.input}`]: {
        '& .MuiInputLabel-formControl': {
            color: `${theme.palette.common.white} !important`,
            paddingBottom: theme.spacing(0.5),
        },
        '& .MuiInputBase-input': { color: `${theme.palette.common.white} !important` },
        marginBottom: theme.spacing(1),
    },
    [`& .${classes.btn}`]: { marginTop: theme.spacing(2) },
}))

type ContactFormValues = {
    workplaceId: string
    name: string
    from: string
    text?: string
}

const formValidationSchema = yup.object().shape({
    workplaceId: yup.string().required(),
    name: yup.string().required(),
    from: yup.string().required(),
})

const ContactForm = () => {
    const { control, handleSubmit, formState } = useForm<ContactFormValues>({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(formValidationSchema) as any, // TODO: narrow resolver type
    })
    const { isValid, submitCount } = formState

    const onSubmit = (data: ContactFormValues) => {
        // TODO: verify this endpoint matches the backend contact route
        api.post('/contact', data).catch(() => {
            /* silent */
        })
    }

    return (
        <Root>
            <Grid container>
                <Typography variant="body1" color="primary" className={classes.title}>
                    Kontaktujte nás
                </Typography>
                <Grid item xs={12}>
                    <Controller
                        name="workplaceId"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                select
                                label="Zvolte pobočku"
                                fullWidth
                                required
                                className={classes.input}
                            >
                                {AMBULANCES.map((a) => (
                                    <MenuItem key={a.id} value={String(a.workplace_id)}>
                                        {a.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField {...field} label="Jméno" fullWidth required className={classes.input} />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="from"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField {...field} label="E-mail" fullWidth required className={classes.input} />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="text"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Zpráva"
                                fullWidth
                                multiline
                                rows={3}
                                className={classes.input}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    {submitCount >= 1 ? (
                        <Typography color="primary">Vaše zpráva byla úspěšně odeslána</Typography>
                    ) : (
                        <Button
                            type="submit"
                            className={classes.btn}
                            color="primary"
                            variant="contained"
                            disabled={!isValid}
                            onClick={handleSubmit(onSubmit)}
                            fullWidth
                        >
                            Odeslat
                        </Button>
                    )}
                </Grid>
            </Grid>
        </Root>
    )
}

export default ContactForm
```

- [ ] **Step 2: Create src/components/Contacts/Contacts.tsx**

```tsx
import {
    AccessTime as AccessTimeIcon,
    Home,
    LocationOn as LocationOnIcon,
    Map as MapIcon,
    Phone as PhoneIcon,
} from '@mui/icons-material'
import { Box, Button, Grid, Hidden, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import getGoogleMapsUrl from '@utilities/getGoogleMapsUrl'
import React from 'react'
import { AMBULANCES } from '../../constants/ambulances'

const PREFIX = 'Contacts'
const classes = {
    root: `${PREFIX}-root`,
    sectionIcon: `${PREFIX}-sectionIcon`,
    sectionContent: `${PREFIX}-sectionContent`,
    ambulanceRow: `${PREFIX}-ambulanceRow`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
    [`&.${classes.root}`]: {
        paddingLeft: '15%',
        paddingRight: '15%',
        paddingBottom: '10%',
        whiteSpace: 'pre-wrap',
        '& .MuiTypography-h3': {
            marginBottom: theme.spacing(3),
            fontWeight: 'bold',
            textAlign: 'center',
            [theme.breakpoints.down('sm')]: { textAlign: 'left' },
        },
    },
    [`& .${classes.sectionIcon}`]: {
        textAlign: 'center',
        '& svg': { fontSize: 60, fill: theme.palette.primary.main },
    },
    [`& .${classes.sectionContent}`]: { textAlign: 'center' },
    [`& .${classes.ambulanceRow}`]: {
        '&:last-child': { borderTop: '1px solid #0000001f', paddingTop: theme.spacing(3) },
        marginBottom: theme.spacing(3),
    },
}))

const contactSections = [
    { id: 0, component: <Home /> },
    { id: 1, component: <LocationOnIcon /> },
    { id: 2, component: <AccessTimeIcon /> },
    { id: 3, component: <PhoneIcon /> },
]

const Contacts = () => (
    <StyledGrid className={classes.root} container spacing={2} id="contact">
        <Grid container item xs={12} className={classes.ambulanceRow} justifyContent="center">
            <Box marginBottom={2}>
                <Typography variant="h3">Kontakt</Typography>
            </Box>
            <Grid container spacing={4} alignItems="center">
                <Hidden mdDown>
                    {contactSections.map(({ id, component }) => (
                        <Grid key={id} item md={3} className={classes.sectionIcon}>
                            {component}
                        </Grid>
                    ))}
                </Hidden>
                {AMBULANCES.map(({ name, contact, openingHours, address, location }) => (
                    <Grid key={name} container justifyContent="center" className={classes.ambulanceRow}>
                        <Grid item md={3} className={classes.sectionContent}>
                            <Typography variant="h4">{name}</Typography>
                        </Grid>
                        <Grid item md={3} className={classes.sectionContent}>
                            <Typography>{address}</Typography>
                            <Box margin={1}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    endIcon={<MapIcon />}
                                    onClick={() => window.open(getGoogleMapsUrl(location))}
                                >
                                    Navigovat
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item md={3} className={classes.sectionContent}>
                            {openingHours.map(({ day, hours }) => (
                                <Box margin={1} key={`${day}-${name}`}>
                                    <Typography>
                                        {day} {hours}
                                    </Typography>
                                </Box>
                            ))}
                        </Grid>
                        <Grid item md={3} className={classes.sectionContent}>
                            <Typography>{contact.email}</Typography>
                            <Typography>{contact.phone}</Typography>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    </StyledGrid>
)

export default Contacts
```

---

## Task 10: References + Footer

**Files:**

- Create: `src/components/References/Reference.tsx`
- Create: `src/components/References/References.tsx`
- Create: `src/components/Footer/Footer.tsx`

- [ ] **Step 1: Create src/components/References/Reference.tsx**

```tsx
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import { Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'

type ReferenceProps = { text: string; author: string }

const PREFIX = 'Reference'
const classes = {
    quoteLeft: `${PREFIX}-quoteLeft`,
    quote: `${PREFIX}-quote`,
    quoteRight: `${PREFIX}-quoteRight`,
    source: `${PREFIX}-source`,
}

const Root = styled('div')(({ theme }) => ({
    [`& .${classes.quoteLeft}`]: { height: 42, '& svg': { fill: 'lightgrey', width: '1.1rem' } },
    [`& .${classes.quote}`]: { paddingLeft: '1.1rem', fontSize: '1.1rem', fontWeight: 600, lineHeight: 1.48 },
    [`& .${classes.quoteRight}`]: { textAlign: 'end', '& svg': { fill: 'lightgrey', width: '1.1rem' } },
    [`& .${classes.source}`]: { textAlign: 'end', fontStyle: 'italic', lineHeight: '1.3', marginTop: theme.spacing(1) },
}))

const Reference = ({ text, author }: ReferenceProps) => (
    <Root>
        <Grid item xs={12} className={classes.quoteLeft}>
            <FormatQuoteIcon />
        </Grid>
        <Grid item xs={12} className={classes.quote}>
            <Typography variant="body1">{text}</Typography>
        </Grid>
        <Grid item xs={12} className={classes.quoteRight}>
            <FormatQuoteIcon />
        </Grid>
        <Grid item xs={12}>
            <Typography className={classes.source}>&mdash; {author}</Typography>
        </Grid>
    </Root>
)

export default Reference
```

- [ ] **Step 2: Create src/components/References/References.tsx**

```tsx
import { Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'
import Reference from './Reference'

const PREFIX = 'References'
const classes = { root: `${PREFIX}-root` }

const StyledGrid = styled(Grid)(({ theme }) => ({
    [`&.${classes.root}`]: {
        paddingLeft: '10%',
        paddingRight: '10%',
        paddingBottom: '10%',
        '& .MuiTypography-h2': { marginBottom: theme.spacing(2), textAlign: 'center' },
    },
}))

const References = () => (
    <StyledGrid className={classes.root} container spacing={2}>
        <Grid item xs={12}>
            <Typography variant="h3" align="center">
                Naši spokojení pacienti
            </Typography>
        </Grid>
        <Grid item container xs={12} spacing={4}>
            <Grid item container xs={12} md={4}>
                <Reference
                    text="Je to lékař, který Vám porozumí, žádná nadřazenost, všem doporučuji, děkuji za Vaši péči."
                    author="Alena B."
                />
            </Grid>
            <Grid item container xs={12} md={4}>
                <Reference
                    text="Byla jsem zde dnes poprvé na prohlídku, jelikož čekám první ditě, a musím říct, že pan doktor je člověk na správném mistě, pěkné jednání, vše vysvětlí, jsem spokojená i sestřička byla ochotná, super."
                    author="Karin F."
                />
            </Grid>
            <Grid item container xs={12} md={4}>
                <Reference
                    text="Kež by bylo více takových odborníků se srdcem na správném mistě. Úžasný lékař, vřele doporučuji."
                    author="Dana R. J."
                />
            </Grid>
        </Grid>
    </StyledGrid>
)

export default References
```

- [ ] **Step 3: Create src/components/Footer/Footer.tsx**

```tsx
import ContactForm from '@components/Contacts/ContactForm'
import TransparentLogo from '@components/Logo/TransparentLogo'
import { routes } from '@components/Navbar/Navbar'
import { Box, Divider, Grid, Hidden, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import scrollElementIntoView from '@utilities/scrollElementIntoView'
import React from 'react'
import { HashLink } from 'react-router-hash-link'

const PREFIX = 'Footer'
const classes = {
    root: `${PREFIX}-root`,
    menuItemContainer: `${PREFIX}-menuItemContainer`,
    menuItem: `${PREFIX}-menuItem`,
    logoContainer: `${PREFIX}-logoContainer`,
    copyright: `${PREFIX}-copyright`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
    [`&.${classes.root}`]: {
        background: '#103c3a',
        color: 'white',
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6),
        paddingTop: theme.spacing(3),
        '& .MuiDivider-root': { backgroundColor: 'grey' },
    },
    [`& .${classes.menuItemContainer}`]: { marginBottom: theme.spacing(1) },
    [`& .${classes.menuItem}`]: {
        '& a': {
            color: theme.palette.common.white,
            textDecoration: 'none',
            '&:hover': { color: '#000', borderBottom: '1px solid black' },
        },
        '& svg': { paddingTop: theme.spacing(0.5), height: 27 },
    },
    [`& .${classes.logoContainer}`]: {
        marginTop: theme.spacing(2),
        '& svg': { width: '60%', maxWidth: 280 },
    },
    [`& .${classes.copyright}`]: { textAlign: 'center' },
}))

const Footer = () => (
    <StyledGrid className={classes.root} container spacing={2} justifyContent="center">
        <Grid item container xs={12} spacing={2} alignContent="center">
            <Grid item xs={12} md={3}>
                <Typography variant="body1" color="primary">
                    MUDr. Miroslav Vaněk
                    <br />
                    Gynekologická ambulance s.r.o.
                    <br />
                    <br />
                </Typography>
                <Typography variant="body2">
                    Pobočka Frýdek-Místek
                    <br />
                    tř. T. G. Masaryka 602, 738 01 Frýdek-Místek
                    <br />
                    +420 558 632 133
                    <br />
                    <br />
                    Pobočka Šenov
                    <br />
                    Vráclavská 1281, 739 34 Šenov
                    <br />
                    +420 605 414 988
                </Typography>
                <Box className={classes.logoContainer}>
                    <TransparentLogo />
                </Box>
            </Grid>
            <Grid item xs={12} md={2}>
                <Typography variant="body1" color="primary" className={classes.menuItemContainer}>
                    Mapa webu
                </Typography>
                {routes.map(
                    ({ text, link }) =>
                        typeof text === 'string' && (
                            <Grid key={link} item className={classes.menuItemContainer}>
                                <Typography variant="body2" className={classes.menuItem}>
                                    <HashLink to={link} scroll={(e) => scrollElementIntoView(e, 'smooth')}>
                                        {text}
                                    </HashLink>
                                </Typography>
                            </Grid>
                        )
                )}
            </Grid>
            <Hidden mdDown>
                <Divider variant="middle" orientation="vertical" />
            </Hidden>
            <Grid item xs={12} md={6}>
                <ContactForm />
            </Grid>
        </Grid>
        <Grid item xs={12} className={classes.copyright}>
            <Typography variant="caption">
                {`Copyright © ${new Date().getFullYear()} ejthbit. All rights reserved.`}
            </Typography>
        </Grid>
    </StyledGrid>
)

export default Footer
```

---

## Task 11: LandingPage + ReservationPage + Final Routing

**Files:**

- Create: `src/pages/LandingPage/LandingPage.tsx` (replace stub)
- Create: `src/pages/ReservationPage.tsx`

- [ ] **Step 1: Replace src/pages/LandingPage/LandingPage.tsx**

```tsx
import Contacts from '@components/Contacts/Contacts'
import Footer from '@components/Footer/Footer'
import LandingWelcome from '@components/LandingWelcome/LandingWelcome'
import OurTeam from '@components/OurTeam/OurTeam'
import References from '@components/References/References'
import Services from '@components/Services/Services'
import React, { lazy } from 'react'

const LandingPage = () => (
    <>
        <LandingWelcome />
        <Services />
        <OurTeam />
        <Contacts />
        <References />
        <Footer />
    </>
)

export default LandingPage
```

- [ ] **Step 2: Create src/pages/ReservationPage.tsx**

```tsx
import { ReservationDialog } from '@ejthbit/reservation-app'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ReservationPage = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(true)

    const handleClose = () => {
        setOpen(false)
        navigate('/')
    }

    return <ReservationDialog isOpen={open} onClose={handleClose} />
}

export default ReservationPage
```

- [ ] **Step 3: Verify full app in dev**

Run `pnpm dev`. Check:

- `/` — landing page with all sections
- Click "Objednat se" — ReservationDialog opens
- Click "Termíny sonografie prsou" — SonographyInfoModal opens
- `/rezervace` — ReservationDialog opens, navigates back to `/` on close
- `/login` — Login component from library renders
- Navbar hash links scroll to sections

---

## Task 12: Delete Old Files + Build Verification

- [ ] **Step 1: Delete Webpack config and tooling**

```bash
cd /Users/8bit/Desktop/codebase/gyn
rm -f webpack.common.js webpack.dev.js webpack.prod.js .babelrc jsconfig.json yarn.lock
```

- [ ] **Step 2: Delete old source entry points**

```bash
rm -f src/index.js src/App.js src/Routes.js src/index.ejs
rm -f src/gynBookingTheme.js src/routingPaths.js
```

- [ ] **Step 3: Delete old components replaced by library**

```bash
rm -rf src/store/
rm -rf src/pages/adminView/
rm -rf src/components/reservation/
rm -rf src/components/LoginPageForm/
rm -rf src/components/ProtectedRoute/
rm -rf src/components/AutomaticLogoutDialog/
rm -rf src/components/ScrollRestoration/
# Delete old api JS files only — keep new src/api/config.ts
rm -f src/api/config.js src/api/authHeader.js
```

- [ ] **Step 4: Delete old .js source files replaced by .tsx**

```bash
rm -f src/components/Navbar/Navbar.js src/components/Navbar/MobileNavbar.js
rm -f src/components/Logo/TransparentLogo.js
rm -f src/components/ScrollTop/ScrollTop.js
rm -f src/components/LandingWelcome/LandingWelcome.js
rm -f src/components/LandingWelcome/SonographyInfoModal.js
rm -f src/components/LandingWelcome/LandingPageReservationModal.js
rm -f src/components/LandingWelcome/LandingAlert.js
rm -f src/components/Services/Services.js src/components/Services/Service.js
rm -f src/components/OurTeam/OurTeam.js src/components/OurTeam/Person.js src/components/OurTeam/PersonDetail.js
rm -f src/components/Contacts/Contacts.js src/components/Contacts/ContactForm.js
rm -f src/components/References/References.js src/components/References/Reference.js
rm -f src/components/Footer/Footer.js
rm -f src/pages/LandingPage/LandingPage.js
rm -f src/utilities/checkDeviceType.js src/utilities/scrollElementIntoView.js
rm -f src/assets/SvgIcons.js src/assets/OurTeam/Text/vanek.js
```

- [ ] **Step 5: Run final build**

```bash
pnpm build
```

Expected: `tsc` reports no errors. `vite build` completes. `dist/` contains `index.html`, JS/CSS chunks.

- [ ] **Step 6: Smoke test the build**

```bash
pnpm preview
```

Expected: App loads on `http://localhost:4173`. All landing sections visible. ReservationDialog opens on button click.
