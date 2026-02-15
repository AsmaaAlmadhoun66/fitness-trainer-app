# Fitness Trainer & Trainee Management Platform

A full-featured **React** web application for fitness trainers and coaches to manage trainees, workout and meal templates, progress tracking, and in-app chat. Built with **Create React App**, **i18next** for Arabic/English, and **CometChat** for real-time messaging.

---

## Overview

This app is a trainer dashboard and trainee management system. Trainers can view and manage their trainees, create and assign workout and meal templates, track progress (measurements, weight, water, photos), handle join requests and invitations, and communicate via group chat — all in one responsive, bilingual (Arabic/English) interface.

---

## Features

- **Authentication** — Login, registration, forget password, account activation (pre-authorization)
- **Dashboard** — Trainee overview, join requests, invitation management
- **Trainee management** — Trainee cards, profile modals, notes, exercise and meal assignment
- **Templates** — Create, edit, delete workout and meal templates; assign templates to trainees with day-based planning
- **Progress** — Measurements, weight, water intake, progress pictures (with video support)
- **Profile & settings** — User profile and app settings
- **Group chat** — Real-time messaging via CometChat Pro
- **FAQ** — In-app FAQ
- **Send invitation** — Invite new trainees
- **Trainees list** — Full trainee display (e.g. for SAS account type)
- **Internationalization (i18n)** — Arabic and English with RTL support

---

## Tech Stack & Libraries

### Core

| Library | Version | Purpose |
|--------|---------|--------|
| **React** | 17.x | UI library |
| **react-dom** | 17.x | React DOM rendering |
| **react-scripts** | 4.0.0 | Create React App build and dev server |
| **react-router-dom** | 5.2.x | Client-side routing |

### UI & styling

| Library | Purpose |
|--------|--------|
| **Bootstrap** | 4.5.x — Layout, grid, utilities |
| **Semantic UI React** | 2.x — Tabs, menus, loaders, cards, sidebar |
| **semantic-ui-css** | 2.4.x — Semantic UI styles |
| **react-icons** | 3.x — Icons (e.g. FiPlus, RiRuler2Line, GiWeightLiftingUp) |
| **pretty-checkbox** / **pretty-checkbox-react** | Checkbox styling |

### Internationalization

| Library | Purpose |
|--------|--------|
| **i18next** | 19.x — i18n core |
| **react-i18next** | 11.x — React bindings for i18next |

### HTTP & state

| Library | Purpose |
|--------|--------|
| **axios** | 0.21.x — HTTP client (used in services) |
| **fetch** | Native — Used in custom `httpService` for API calls |

### Real-time & media

| Library | Purpose |
|--------|--------|
| **@cometchat-pro/chat** | 2.1.x — Real-time chat (CometChat Pro) |
| **qier-player** | 1.2.x — Video player |
| **react-lottie** | 1.2.x — Lottie animations (e.g. alert) |

### Forms & inputs

| Library | Purpose |
|--------|--------|
| **react-select** | 3.1.x — Select/dropdown components |
| **react-phone-number-input** | 3.1.x — Phone number input with country code |
| **react-images-upload** | 1.2.x — Image upload UI |

### UX & feedback

| Library | Purpose |
|--------|--------|
| **react-toastify** | 6.x — Toast notifications |
| **react-slick** | 0.27.x — Carousel/slider |
| **slick-carousel** | 1.8.x — Slick base styles |

### Security & crypto

| Library | Purpose |
|--------|--------|
| **aes-js** | 3.1.x — AES encryption |
| **sodium-plus** | 0.9.x — Cryptography utilities |

### Testing

| Library | Purpose |
|--------|--------|
| **@testing-library/react** | 11.x | Component testing |
| **@testing-library/jest-dom** | 5.x | DOM matchers |
| **@testing-library/user-event** | 12.x | User interaction simulation |

### Other

| Library | Purpose |
|--------|--------|
| **prop-types** | 15.x — Runtime type checking |
| **web-vitals** | 0.2.x — Core Web Vitals reporting |

---

## Skills & concepts used

- **React** — Class and functional components, lifecycle, state, refs
- **React Router** — Protected routes, redirects, `withRouter`
- **REST API** — Custom `httpService` (GET, POST, PUT, DELETE, FormData), token-based auth
- **i18n** — Multi-language (AR/EN), RTL, translation namespaces
- **Real-time chat** — CometChat init, login, user creation, messaging
- **Service layer** — Account, trainee, template, meal, exercise, user, chat, toaster services
- **Responsive layout** — Bootstrap grid, Semantic UI responsive components
- **Modals & overlays** — Profile modal, trainee modal, confirm alerts, template assign flow
- **Form handling** — Controlled inputs, validation, file upload
- **Toast notifications** — Success/error feedback with react-toastify
- **Create React App** — Eject-free CRA setup, env and build config

---

## Project structure (high level)

```
src/
├── App.js                 # Auth guard, layout (sidebar, header, footer), chat login
├── index.js               # Router, i18n provider, route definitions
├── config.js              # CometChat appId, apiKey, GUID
├── i18n.js                # i18next init
├── components/            # Reusable UI (buttons, inputs, modals, sidebar, breadcrumb, etc.)
├── pages/                 # Route-level views (login, home, template, progress, chat, etc.)
├── services/              # API and app logic (account, http, trainee, template, chat, …)
├── resources/             # i18n JSON (ar, en)
└── assets/                # Icons, images, lotties
```

---

## Prerequisites

- **Node.js** (LTS recommended, e.g. 14+)
- **npm** or **yarn**
- Backend API and valid account (base URL configured in `src/services/http-service/httpService.js`)
- CometChat Pro app (App ID and API Key in `src/config.js`)

---

## Getting started

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/fitness-trainer-app.git
   cd fitness-trainer-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure**
   - Set CometChat credentials in `src/config.js` (appId, apiKey, GUID if needed).
   - Ensure `src/services/http-service/httpService.js` (or env) points to your API base URL.

4. **Run development server**
   ```bash
   npm start
   # or
   yarn start
   ```
   App runs on **http://localhost:4200** (port set in `package.json`).

5. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

6. **Run tests**
   ```bash
   npm test
   # or
   yarn test
   ```

---

## Scripts

| Command | Description |
|--------|-------------|
| `npm start` / `yarn start` | Start dev server (port 4200) |
| `npm run build` / `yarn build` | Production build |
| `npm test` / `yarn test` | Run tests |
| `npm run eject` | Eject CRA (irreversible) |

---

## Environment & API

- API base URL is set in `src/services/http-service/httpService.js`.
- Auth uses a token stored in `localStorage` and the `Authorization: token <token>` header.
- App version header: `App-Version: 2.1.6` (adjust as needed).

---

## Browser support

Targets modern browsers as per Create React App `browserslist`: production — `>0.2%`, not dead, not op_mini all; development — latest Chrome, Firefox, Safari.

---

## License

This project is private by default. See repository settings and any local `LICENSE` file for terms.

---

## Keywords (for SEO and discovery)

React fitness trainer app, trainee management, workout template, meal plan, progress tracking, CometChat, i18next Arabic English, RTL React, Create React App, trainer dashboard, fitness coaching software, React SPA, trainer platform.
