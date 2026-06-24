# Architecture

## Diagram

> [`docs/resources/architecture.drawio`](resources/architecture.drawio)

## Overview

**Browser** - React 19 SPA. `keycloak-js` handles the OIDC PKCE S256 login; the resulting RS256 JWT is attached to every Axios request via `setAuthTokenProvider()` in `api/client.ts`. The browser never calls the FHIR server directly.

**NestJS API** - thin FHIR proxy on port 3000. A global `JwtAuthGuard` (registered via `APP_GUARD`) validates the Bearer token against Keycloak's JWKS endpoint before any handler runs. FHIR Bundle responses are mapped to typed `PatientDto` / `ObservationDto` objects defined in `lib-dto`.

**HAPI FHIR R4** - public read-only test server. Only called from `PatientsService` via `FhirHttpClient` (a typed Axios wrapper in `lib-server`).

**Keycloak** - RS256 JWT issuer. Optional for local dev; gated by `NX_AUTH_ENABLED=true`. See [AUTHENTICATION.md](AUTHENTICATION.md).

## Package layout

```
packages/
├── rest-clinical/   NestJS 11 API - FHIR proxy, global JWT guard, Swagger docs
├── ui-clinical/     React 19 SPA - patient search, observations chart
├── lib-dto/         Shared DTOs: PatientDto, ObservationDto (@ApiProperty decorators)
└── lib-server/      Shared backend utils: FhirHttpClient, bundle mapper helpers
```

Each package has its own `project.json` (Nx target config), `tsconfig.json`, and `jest.config.cts`.

Shared packages are referenced via TypeScript path aliases (`lib-dto`, `lib-server`) defined in `tsconfig.base.json` - resolved by webpack at build time and by `ts-jest`'s `pathsToModuleNameMapper` at test time. No npm publishing required.
