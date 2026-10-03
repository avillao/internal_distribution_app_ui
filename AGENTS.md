# AGENTS.md — Internal Distribution App UI

## Quick start

```sh
npm install
npm run dev          # dev server on localhost:3000
npm run build        # production build
```

**Requires a running auth backend at `localhost:53400`** (set via `NEXT_PUBLIC_AUTH_BASE_URL` in `.env`).

## Verification commands

No lint, test, or formatter scripts exist. Use these manually:

```sh
npx tsc --noEmit     # type-check
npx next build       # full build check (also catches type errors)
```

There are zero test files and no test framework installed. Do not run `npm test`.

## Architecture

- **`src/app/`** — Next.js App Router pages (thin routing layer, delegates to features)
- **`src/features/`** — Feature modules (components + hooks + services + models + validators + styles). Currently only `auth`.
- **`src/shared/`** — Cross-cutting: API clients, hooks, components, enums, global styles
- **`src/proxy.ts`** — Dead code. Exports a middleware-style function but is not wired as Next.js middleware (`middleware.ts` does not exist at root). Do not import or modify it.
- **Path alias:** `@/*` maps to `./src/*`

## Functional context

Internal Distribution App UI is the user interface for managing and distributing a company's internal applications. It supports the creation and modification of applications and their versions (artifacts), followed by deployment across different environments or branches such as `dev`, `test`, and `prod`.

The application has two user roles:

- **Administrator:** can create and modify applications and artifacts, including their deployment environment, platform, enabled state, and related metadata.
- **End user / client:** can browse the catalog of applications they are authorized to access, review application and artifact information, and download an available artifact for the platform they use.

The main domain relationship is `Application` -> one or more `Artifact` records. An artifact represents a specific application version for one environment/branch and one platform. The UI must respect authorization, the artifact's `enabled` state, the requested environment, and platform availability when exposing management actions or downloads.

### Current DynamoDB data models

`Application`:

```json
{
	"applicationCode": "tia_interno",
	"name": "tia_interno",
	"packageName": "com.tia_interno",
	"enabled": true,
	"created": "2025-08-11T22:20:58.736+00:00",
	"updated": "2025-08-11T22:20:58.736+00:00"
}
```

`Artifact`:

```json
{
	"resourceApplicationCode": "gdn_interno.android.qa",
	"artifactId": "957f72b9-8677-3789-90fb-e2d7db5024ab",
	"applicationCode": "gdn_interno",
	"version": "1.0.3",
	"branch": "qa",
	"platform": "android",
	"enabled": false,
	"created": "2025-06-22T16:30:14.080+00:00",
	"updated": "2025-06-22T16:30:14.080+00:00"
}
```

When implementing domain features, preserve the distinction between the application identity (`applicationCode`) and a distributable version (`artifactId`, `version`, `branch`, and `platform`). Do not assume that an application being enabled makes all of its artifacts downloadable; both levels have their own `enabled` state.

## Auth flow

1. Login sends `application/x-www-form-urlencoded` to `/auth/login` on the backend
2. Response includes `access_token` (JWT) and `refresh_token`
3. Tokens stored in `access_token` and `refresh_token` cookie used for server-side checks
4. `AuthHydrator` component decodes JWT and hydrates Zustand store with roles from `resource_access["internal_distribution_app"].roles`
5. Admin roles -> `/dashboard/admin`; `user_*` roles -> `/dashboard/catalogo`

## CSS approach

- Bootstrap 5.3 SCSS with custom overrides in `src/shared/styles/bootstrap-custom.scss`
- CSS Modules for component-scoped styles (`.module.css`)
- The dashboard uses normal document flow: header and admin sidebar must not use fixed positioning. The admin area uses a flex layout for the sidebar and content.
- Brand color: green `#4D7C0F` / `#B2E672`, bootstrap accent `#65A30D`
- `sassOptions.quietDeps: true` suppresses Bootstrap deprecation warnings

## Known issues (verified)

- **`tokenStorage.ts` `clearTokens()`** calls `cookieStore.delete()` which is a Next.js server API - crashes on client side. Only reachable via `authService.logout()`.
- **`catalogo/page.tsx` inverted redirect** - redirects users who DO have `user_*` roles (opposite of the server-side logic in `dashboard/page.tsx`).
- **`httpClient.ts` has a commented-out 401 interceptor** - auto-refresh is planned but not implemented.
- **`AuthHydrator` re-render risk** - `useEffect` dependencies may cause infinite loops since `setRoles` creates new array references.

## Conventions

- **Code** is in English; **commit messages** and some **UI strings** are in Spanish
- Feature modules follow: `components/` -> `hooks/` -> `services/` -> `models/` -> `validators/` -> `styles/`
- `AuthService` uses a prototype-based singleton pattern (unconventional)
- Formik validation uses a custom function (not Yup/Zod), despite the `loginSchema` filename
- Version `V1.0.4-BETA` is hardcoded in the login footer (not from `package.json`)
- The `develop` branch is the active branch (not `master`)
