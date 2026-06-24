# Authentication

## Flow diagram

> [`docs/resources/auth-flow.drawio`](resources/auth-flow.drawio)

## Protocol

OIDC Authorization Code flow with PKCE S256. The browser uses `keycloak-js`; the NestJS API validates the resulting RS256 JWT against Keycloak's JWKS endpoint - no shared secret required.

## 10-step flow

| Step | Actor    | Action                                                                                                               |
| ---- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| 1    | Browser  | `keycloak.init({ onLoad: 'login-required', pkceMethod: 'S256' })`                                                    |
| 2    | Keycloak | 302 redirect to login page                                                                                           |
| 3    | Browser  | User POSTs credentials                                                                                               |
| 4    | Keycloak | 302 redirect back with `?code=<auth_code>`                                                                           |
| 5    | Browser  | POST `/token` with `code` + `code_verifier` (PKCE S256)                                                              |
| 6    | Keycloak | Returns `{ access_token (RS256 JWT), refresh_token, id_token }`                                                      |
| -    | Browser  | `setAuthTokenProvider()` stores the token; Axios interceptor attaches `Authorization: Bearer <JWT>` to every request |
| 7    | Browser  | `GET /api/patients?name=Smith` with Bearer header                                                                    |
| 8    | NestJS   | `JwtAuthGuard` fetches JWKS (cached after first call)                                                                |
| 9    | Keycloak | Returns `{ keys: [ RS256 public key ] }`                                                                             |
| -    | NestJS   | Verifies: RS256 signature, issuer claim, `exp` claim                                                                 |
| 10   | NestJS   | `200 OK [ PatientDto[] ]`                                                                                            |

Token is auto-refreshed every 30 s when expiry is under 60 s away (`keycloak.updateToken(60)`).
