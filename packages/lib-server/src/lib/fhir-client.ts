import axios, { AxiosInstance } from 'axios';

export function createFhirHttpClient(baseUrl: string): AxiosInstance {
  return axios.create({
    baseURL: baseUrl,
    headers: { Accept: 'application/fhir+json' },
    timeout: 15000,
  });
}

export const FhirHttpClient = createFhirHttpClient(
  process.env['FHIR_BASE_URL'] ?? 'https://hapi.fhir.org/baseR4',
);
