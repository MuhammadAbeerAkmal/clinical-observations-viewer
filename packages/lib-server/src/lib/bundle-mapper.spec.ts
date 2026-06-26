import { mapBundleToObservations, mapBundleToPatients } from './bundle-mapper';

const patientBundle = {
  entry: [
    {
      resource: {
        id: 'p1',
        resourceType: 'Patient',
        name: [{ family: 'Smith', given: ['John'] }],
        gender: 'male',
        birthDate: '1980-01-15',
      },
    },
  ],
};

const observationBundle = {
  entry: [
    {
      resource: {
        id: 'obs1',
        resourceType: 'Observation',
        code: { text: 'Heart rate', coding: [{ display: 'Heart rate' }] },
        valueQuantity: { value: 72, unit: 'beats/min' },
        effectiveDateTime: '2024-01-15T10:00:00Z',
      },
    },
    {
      resource: {
        id: 'obs2',
        resourceType: 'Observation',
        code: { text: 'Clinical note' },
        valueString: 'positive',
      },
    },
  ],
};

describe('mapBundleToPatients', () => {
  it('maps FHIR Patient entries to PatientDto', () => {
    const result = mapBundleToPatients(patientBundle);
    expect(result).toEqual([
      { id: 'p1', name: 'John Smith', gender: 'male', birthDate: '1980-01-15' },
    ]);
  });

  it('returns empty array for bundle with no entries', () => {
    expect(mapBundleToPatients({})).toEqual([]);
  });

  it('uses coding.display as fallback when text is absent', () => {
    const bundle = {
      entry: [
        {
          resource: {
            id: 'p2',
            name: [{ family: 'Doe' }],
            gender: 'female',
            birthDate: '1990-03-20',
          },
        },
      ],
    };
    const [dto] = mapBundleToPatients(bundle);
    expect(dto.name).toBe('Doe');
  });
});

describe('mapBundleToObservations', () => {
  it('maps numeric FHIR Observations and skips text-only ones', () => {
    const result = mapBundleToObservations(observationBundle);
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      id: 'obs1',
      code: 'Heart rate',
      value: 72,
      unit: 'beats/min',
      effectiveDateTime: '2024-01-15T10:00:00Z',
      category: 'vital-signs',
    });
  });

  it('returns empty array for bundle with no numeric observations', () => {
    expect(mapBundleToObservations({})).toEqual([]);
  });
});
