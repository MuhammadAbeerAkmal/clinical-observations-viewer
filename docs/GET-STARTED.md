# Getting Started

## Prerequisites

- Node.js 20+
- Yarn 1.22+
- Docker (optional - only needed for Keycloak auth)

## Local dev (no Docker, no Keycloak)

```bash
yarn install
yarn dev
```

| Service     | URL                            |
| ----------- | ------------------------------ |
| Frontend    | http://localhost:4200          |
| Backend API | http://localhost:3000/api      |
| Swagger UI  | http://localhost:3000/api/docs |

Open http://localhost:4200, type a name in the search box, press **Search**. The backend proxies the public HAPI FHIR R4 test server. No additional setup needed.

## With Docker + Keycloak auth

```bash
docker compose -f docker-compose.yml -f docker-compose.local.yml up -d
```

| Service        | URL                            | Credentials   |
| -------------- | ------------------------------ | ------------- |
| Frontend       | http://localhost:4200          | demo / demo   |
| Keycloak admin | http://localhost:8080          | admin / admin |
| Swagger UI     | http://localhost:3000/api/docs | -             |

The Keycloak realm (`clinical-demo`) and demo user are auto-imported from [`dev/keycloak-realms/clinical-realm.json`](../dev/keycloak-realms/clinical-realm.json) on first start.

> `demo / demo` is for local development only.

## First run walkthrough

1. `yarn install` at the repo root installs all workspace dependencies
2. `yarn dev` starts both NestJS (`:3000`) and the webpack dev server (`:4200`) in parallel via Nx
3. Navigate to **http://localhost:4200**
4. Type a name and press **Search**. Results come from HAPI FHIR R4
5. Click any patient row to see their vital-signs observations chart

## Useful Nx commands

```bash
# Serve a single package
yarn nx run rest-clinical:serve
yarn nx run ui-clinical:serve

# Lint
yarn nx run-many --target=lint --all
```
