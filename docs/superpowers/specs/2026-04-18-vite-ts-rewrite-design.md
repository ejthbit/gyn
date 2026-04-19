# Gyn App — Vite + TypeScript Rewrite Design

## Goal

Rewrite the gyn app from Webpack/Babel/JS/Redux to Vite/TypeScript. Strip all reservation, admin, and login implementations — replace with imports from the `@ejthbit/reservation-app` npm package. Keep the landing page and navbar.

## Architecture

Fresh Vite + React 18 + TypeScript project scaffolded in-place in `/Users/8bit/Desktop/codebase/gyn`. Old files deleted and replaced.

**Stack:**
- Vite 5, React 18, TypeScript (`any` allowed with `// TODO:` comments)
- MUI 5 (same version as reservation-app — gyn theme wraps the library)
- React Router 6
- No Redux — library manages its own state via context
- `"@ejthbit/reservation-app": "file:../reservation-app"` → swap to real npm name when published

**Env vars (`.env`):**
- `VITE_API_BASE_URL` — shared by landing page contact form and the library
- `VITE_APPOINTMENT_DURATION` — read by the library for default slot length

**Theme:** `src/theme.ts` (teal `#1f7672` primary, migrated from `gynBookingTheme.js`) wraps the whole app via MUI `ThemeProvider`. Library inherits it automatically.

## File Structure

```
gyn/
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
├── .env.example
└── src/
    ├── main.tsx            ← ThemeProvider + BrowserRouter + UserProvider
    ├── App.tsx             ← routes
    ├── theme.ts            ← gynBookingTheme migrated
    ├── routingPaths.ts
    ├── components/
    │   └── Navbar/
    │       ├── Navbar.tsx
    │       └── MobileNavbar.tsx
    └── pages/
        └── LandingPage/
            ├── LandingPage.tsx
            └── sections/
                ├── LandingWelcome.tsx
                ├── Services.tsx
                ├── OurTeam.tsx
                ├── Contacts.tsx
                ├── References.tsx
                └── Footer.tsx
```

## What Is Kept vs Removed

**Kept (migrated to `.tsx`):**
- `src/components/Navbar/` — Navbar + MobileNavbar
- `src/pages/LandingPage/` — all 5 sections + Footer
- `src/gynBookingTheme.js` → `src/theme.ts`
- `src/assets/` — images, fonts, static files

**Deleted:**
- `webpack.*.js`, `.babelrc`, `jsconfig.json`
- `src/store/` — entire Redux store
- `src/components/reservation/`
- `src/pages/adminView/`
- `src/components/LoginPageForm/`
- `src/api/`
- `src/components/ProtectedRoute/`

## Library Integration

**`src/main.tsx`:**
```tsx
import { UserProvider } from '@ejthbit/reservation-app'
import { ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { gynBookingTheme } from './theme'

<BrowserRouter>
  <ThemeProvider theme={gynBookingTheme}>
    <UserProvider>
      <App />
    </UserProvider>
  </ThemeProvider>
</BrowserRouter>
```

## Routing

| Path | Component | Source |
|------|-----------|--------|
| `/` | `LandingPage` | local |
| `/rezervace` | `ReservationDialog` | library |
| `/login` | `Login` | library |
| `/admin/*` | `AdministrationPage` | library |

`ProtectedRoute` from the library wraps `/admin/*`.

## Build

```json
"scripts": {
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview"
}
```

Output: `dist/` — plain static HTML/JS/CSS.
