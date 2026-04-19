# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development server (port 9000, hot reload)
yarn dev

# Production build
yarn build

# Development build (no minification)
yarn build-dev

# Lint
yarn lint

# Lint and auto-fix
yarn lint:fix
```

There is no test suite in this project.

## Environment Variables

The app uses dotenv loaded via `webpack.common.js`. You need a `.env` file in the project root with:

- `API_URL` — backend API base URL for development
- `API_PROD_URL` — backend API base URL for production
- `PROD_WEB_BASE_CONTEXT_PATH` — router basename and webpack `publicPath` in production

## Architecture

**React 17 + MUI v5 + Redux Toolkit + React Router v5, bundled with Webpack (no CRA).**

### Path Aliases

Defined in `webpack.common.js` and mirrored in `jsconfig.json`/`.babelrc`:

| Alias | Resolves to |
|-------|-------------|
| `@components` | `src/components/` |
| `@utilities` | `src/utils/` |
| `@assets` | `src/assets/` |

### Routing (`src/Routes.js`, `src/routingPaths.js`)

Three lazy-loaded pages: `LandingPage` (`/`), `ReservationStepper` (`/rezervace`), and `AdminView` (`/admin`, protected). The router `basename` switches between `/` (dev) and `PROD_WEB_BASE_CONTEXT_PATH` (prod).

### Redux Store (`src/store/`)

Three slices, each with co-located `actions.js` (async thunks) and `selectors.js`:

- **`reservationProcess`** — drives the multi-step booking wizard: selected ambulance, doctor, date, time, category, contact info, and step index. Also holds fetched config data (ambulances, doctors, booking categories).
- **`bookings`** — admin-side booking management: fetched bookings list, available timeslots, doctor services per month, sonography dates.
- **`administration`** — auth state (JWT stored in `localStorage` under key `user`), login/logout, and doctor-service CRUD operation status.

A custom middleware (`src/store/middlewares/checkTokenExpiration.js`) automatically logs out and dispatches `logOutAutomatically` when the JWT expires.

### API Layer (`src/api/`)

`config.js` creates a single `axiosGynInstance` with `baseURL` from env vars. A request interceptor re-attaches the `Authorization: Bearer <token>` header on every request by reading `localStorage.user`. All API calls go through this single instance using RTK `createAsyncThunk`.

### Public-Facing Flow

`LandingPage` is a single-page scroll site (services, team, contacts anchored via hash routes). The reservation flow is a separate route (`/rezervace`) built as a stepped wizard in `ReservationStepper`, progressing through ambulance selection → doctor preference → date/time picking → contact info → confirmation.

### Admin Flow

`AdminView` is protected by `ProtectedRoute` (checks `administration.adminState.isLoggedIn`). It contains three sub-views navigated via `AdminToolbar`: bookings table (`BookingsView`), a `react-big-calendar` calendar (`CalendarView`), and doctor-services management (`DoctorServicesView`/`ServicesTable`).

### Theme

MUI theme is defined in `src/gynBookingTheme.js`. Primary color is `#1f7672` (teal). Font is Nunito (loaded externally).

### API Error Translations

`src/assets/apiTranslations.json` maps backend error codes to human-readable Czech strings, consumed by `TranslatedError`/`TranslatedErrors` components.
