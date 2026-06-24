# Clinical Observations Viewer

Authenticate via Keycloak, search patients on a public HAPI FHIR R4 server, and explore vital-signs observations as an interactive chart.

```bash
yarn install && yarn dev   # backend :3000 - frontend :4200
```

Open **http://localhost:4200**, type a name, press Search. No additional setup required.

Example patients:

- Priya Nair
- Dupont Jean
- Test-Patient Maharjan

## Documentation

| Topic                 | File                                                           | Covers                                                |
| --------------------- | -------------------------------------------------------------- | ----------------------------------------------------- |
| Get started           | [docs/GET-STARTED.md](docs/GET-STARTED.md)                     | Install, local dev, Docker + Keycloak walkthrough     |
| Architecture          | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)                   | System design, package layout, draw.io diagram        |
| API                   | [docs/API.md](docs/API.md)                                     | REST endpoints, request/response shapes, Swagger      |
| Authentication        | [docs/AUTHENTICATION.md](docs/AUTHENTICATION.md)               | OIDC PKCE S256 flow, Keycloak setup, sequence diagram |
| Environment variables | [docs/ENVIRONMENT-VARIABLES.md](docs/ENVIRONMENT-VARIABLES.md) | Backend and frontend config reference                 |
| Testing               | [docs/TESTING.md](docs/TESTING.md)                             | Running tests, coverage, mocking strategy             |
| Deployment            | [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)                       | Docker Compose, CI pipelines, production checklist    |

## Stack

| Layer      | Technology     | Version | Key libraries / tools                       |
| ---------- | -------------- | ------- | ------------------------------------------- |
| Monorepo   | Nx             | 22      | Yarn 1.22 workspaces                        |
| Backend    | NestJS         | 11      | TypeScript - Axios - Passport-JWT - Swagger |
| Frontend   | React          | 19      | Mantine 8 - Recharts 3 - React Router 7     |
| Auth       | Keycloak       | latest  | keycloak-js - jwks-rsa - passport-jwt       |
| Data       | HAPI FHIR R4   | R4      | hapi.fhir.org - public, read-only           |
| Testing    | Jest           | latest  | React Testing Library - 17 tests            |
| CI / Infra | GitHub Actions | -       | GitLab CI - Docker Compose                  |
