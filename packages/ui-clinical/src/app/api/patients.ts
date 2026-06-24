import type { PatientDto, ObservationDto } from 'lib-dto';
import { apiClient } from './client';

export async function searchPatients(name?: string): Promise<PatientDto[]> {
  const { data } = await apiClient.get<PatientDto[]>('/patients', {
    params: name ? { name } : undefined,
  });
  return data;
}

export async function getObservations(patientId: string): Promise<ObservationDto[]> {
  const { data } = await apiClient.get<ObservationDto[]>(`/patients/${patientId}/observations`);
  return data;
}
