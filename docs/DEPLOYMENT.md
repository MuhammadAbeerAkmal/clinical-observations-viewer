# Deployment

## Docker Compose (local)

```bash
# Build all images
docker compose -f docker-compose.yml -f docker-compose.build.yml build

# Start all services
docker compose -f docker-compose.yml -f docker-compose.local.yml up -d

# Stop and remove containers
docker compose -f docker-compose.yml -f docker-compose.local.yml down
```

| Service         | Internal port | Host port (local) | URL                   |
| --------------- | ------------- | ----------------- | --------------------- |
| Keycloak        | 8080          | 8080              | http://localhost:8080 |
| `rest-clinical` | 3000          | 3000              | http://localhost:3000 |
| `ui-clinical`   | 80            | 4200              | http://localhost:4200 |

## Compose file roles

| File                       | Purpose                                                      |
| -------------------------- | ------------------------------------------------------------ |
| `docker-compose.yml`       | Service definitions, environment variables, dependency order |
| `docker-compose.local.yml` | Host port mappings, Keycloak realm volume mount              |
| `docker-compose.build.yml` | Build contexts, Dockerfile paths per package                 |

Port mappings are kept in `docker-compose.local.yml` (not the base file) so staging/production files can extend `docker-compose.yml` with different port strategies without conflicts.

## CI pipelines

Both pipelines run: **lint -> test -> build** in that order.

### GitHub Actions

File: `.github/workflows/ci.yml`

- Triggers on push to `main` and all pull requests
- Node.js 20, Yarn cache

### GitLab CI

File: `.gitlab-ci.yml`

- Triggers on merge requests and pushes to `main`
- Stages: `lint`, `test`, `build`
