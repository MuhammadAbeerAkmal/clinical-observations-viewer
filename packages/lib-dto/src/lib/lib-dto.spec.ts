import { PatientDto } from './patient.dto';
import { ObservationDto } from './observation.dto';

describe('lib-dto exports', () => {
  it('PatientDto has the correct shape', () => {
    const dto: PatientDto = {
      id: 'p1',
      name: 'Test Patient',
      gender: 'male',
      birthDate: '1980-01-15',
    };
    expect(dto.id).toBe('p1');
    expect(dto.name).toBe('Test Patient');
  });

  it('ObservationDto has the correct shape', () => {
    const dto: ObservationDto = {
      id: 'obs1',
      code: 'Heart rate',
      value: 72,
      unit: 'beats/min',
      effectiveDateTime: '2024-01-15T10:00:00Z',
      category: 'vital-signs',
    };
    expect(dto.value).toBe(72);
    expect(dto.category).toBe('vital-signs');
  });
});
