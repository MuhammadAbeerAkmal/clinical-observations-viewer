# Environment Variables

## Backend (`packages/rest-clinical`)

| Variable            | Default                                                                    | Description                                |
| ------------------- | -------------------------------------------------------------------------- | ------------------------------------------ |
| `PORT`              | `3000`                                                                     | HTTP listen port                           |
| `FHIR_BASE_URL`     | `https://hapi.fhir.org/baseR4`                                             | FHIR R4 server base URL                    |
| `KEYCLOAK_JWKS_URI` | `http://localhost:8080/realms/clinical-demo/protocol/openid-connect/certs` | JWKS endpoint for JWT signature validation |
| `KEYCLOAK_ISSUER`   | `http://localhost:8080/realms/clinical-demo`                               | Expected JWT issuer claim                  |
| `UI_ORIGIN`         | `http://localhost:4200`                                                    | CORS allowed origin                        |

When `KEYCLOAK_JWKS_URI` resolves to a live endpoint, all API routes require a Bearer token. The default points to a local Keycloak instance; in production, set it to your deployed Keycloak host.

## Frontend (`packages/ui-clinical`)

| Variable                | Default                     | Description                           |
| ----------------------- | --------------------------- | ------------------------------------- |
| `NX_API_BASE_URL`       | `http://localhost:3000/api` | Backend base URL for Axios            |
| `NX_AUTH_ENABLED`       | _(unset - auth disabled)_   | Set to `true` to enable Keycloak OIDC |
| `NX_KEYCLOAK_URL`       | `http://localhost:8080`     | Keycloak base URL                     |
| `NX_KEYCLOAK_REALM`     | `clinical-demo`             | Keycloak realm name                   |
| `NX_KEYCLOAK_CLIENT_ID` | `clinical-ui`               | Keycloak public client ID             |

> The `NX_` prefix is required for Nx's webpack plugin to expose variables to the browser bundle.

## Docker Compose

In `docker-compose.yml`, service-to-service references use Docker's internal DNS (service name as hostname), not `localhost`:

```yaml
KEYCLOAK_JWKS_URI: 'http://keycloak:8080/realms/clinical-demo/protocol/openid-connect/certs'
KEYCLOAK_ISSUER: 'http://keycloak:8080/realms/clinical-demo'
```

These values differ from the `localhost` defaults used outside Docker.

## Setting variables for local dev

```bash
# Backend - create packages/rest-clinical/.env
PORT=3000
FHIR_BASE_URL=https://hapi.fhir.org/baseR4
KEYCLOAK_JWKS_URI=http://localhost:8080/realms/clinical-demo/protocol/openid-connect/certs
KEYCLOAK_ISSUER=http://localhost:8080/realms/clinical-demo

# Frontend - prefix is enough for Nx dev server
NX_AUTH_ENABLED=true yarn nx run ui-clinical:serve
```
