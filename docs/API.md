# API Reference

Interactive docs: **http://localhost:3000/api/docs** (Swagger UI, auto-generated from decorators)

All routes require a valid Keycloak Bearer token when `KEYCLOAK_JWKS_URI` is configured. Without auth enabled, routes are accessible without a token.

## Endpoints

| Method | Path                             | Description                            |
| ------ | -------------------------------- | -------------------------------------- |
| `GET`  | `/api/patients?name={query}`     | Search patients by name                |
| `GET`  | `/api/patients/:id/observations` | Vital-signs observations for a patient |

---

## GET /api/patients

Search patients on the HAPI FHIR R4 server by name fragment.

**Query parameters**

| Param  | Required | Description                                         |
| ------ | -------- | --------------------------------------------------- |
| `name` | No       | Family or given name (FHIR `name` search parameter) |

**Response** `200 OK`

```json
[
  {
    "id": "592011",
    "name": "Test Patient",
    "gender": "male",
    "birthDate": "1970-01-15"
  }
]
```

**Errors**

| Status | Cause                                          |
| ------ | ---------------------------------------------- |
| `401`  | Missing or invalid Bearer token (auth enabled) |
| `502`  | HAPI FHIR R4 server unreachable                |

---

## GET /api/patients/:id/observations

Returns vital-signs observations for a patient.

**Path parameters**

| Param | Description                                         |
| ----- | --------------------------------------------------- |
| `id`  | FHIR Patient resource ID (from the search response) |

**Response** `200 OK`

```json
[
  {
    "id": "obs-123",
    "effectiveDateTime": "2024-03-01T10:30:00Z",
    "category": "vital-signs",
    "code": "Heart rate",
    "valueQuantity": 72,
    "unit": "beats/min"
  }
]
```

**Errors**

| Status | Cause                                          |
| ------ | ---------------------------------------------- |
| `401`  | Missing or invalid Bearer token (auth enabled) |
| `404`  | Patient not found on FHIR server               |
| `502`  | HAPI FHIR R4 server unreachable                |

---

## DTO types

Defined in `packages/lib-dto/src/` - shared between the NestJS controller and the React API layer.

**`PatientDto`**

| Field       | Type     | Description                             |
| ----------- | -------- | --------------------------------------- |
| `id`        | `string` | FHIR resource ID                        |
| `name`      | `string` | Display name                            |
| `gender`    | `string` | `male` / `female` / `other` / `unknown` |
| `birthDate` | `string` | ISO date (`YYYY-MM-DD`)                 |

**`ObservationDto`**

| Field               | Type     | Description                        |
| ------------------- | -------- | ---------------------------------- |
| `id`                | `string` | FHIR resource ID                   |
| `effectiveDateTime` | `string` | ISO 8601 timestamp                 |
| `category`          | `string` | FHIR category (e.g. `vital-signs`) |
| `code`              | `string` | Human-readable observation name    |
| `valueQuantity`     | `number` | Numeric measurement value          |
| `unit`              | `string` | Unit of measure (e.g. `beats/min`) |
