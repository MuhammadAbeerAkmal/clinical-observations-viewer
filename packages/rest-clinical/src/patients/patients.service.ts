import { Inject, Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { ObservationDto, PatientDto } from 'lib-dto';
import { mapBundleToObservations, mapBundleToPatients } from 'lib-server';

@Injectable()
export class PatientsService {
  constructor(@Inject('FHIR_CLIENT') private readonly http: AxiosInstance) {}

  async searchPatients(name: string): Promise<PatientDto[]> {
    const { data } = await this.http.get('/Patient', {
      params: { name, _count: 20 },
    });
    return mapBundleToPatients(data);
  }

  async getObservations(patientId: string): Promise<ObservationDto[]> {
    const { data } = await this.http.get('/Observation', {
      params: { patient: patientId, category: 'vital-signs', _count: 100 },
    });
    return mapBundleToObservations(data);
  }
}
