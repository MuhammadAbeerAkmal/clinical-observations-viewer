import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { PatientsModule } from './patients.module';

const patientFhirBundle = {
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

const observationFhirBundle = {
  entry: [
    {
      resource: {
        id: 'obs1',
        resourceType: 'Observation',
        code: { text: 'Heart rate' },
        valueQuantity: { value: 72, unit: 'beats/min' },
        effectiveDateTime: '2024-01-15T10:00:00Z',
      },
    },
  ],
};

const mockFhirClient = {
  get: jest.fn().mockImplementation((path: string) => {
    if (path === '/Patient') return Promise.resolve({ data: patientFhirBundle });
    if (path === '/Observation') return Promise.resolve({ data: observationFhirBundle });
    return Promise.resolve({ data: {} });
  }),
};

describe('PatientsController (e2e - mocked FHIR client)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PatientsModule],
    })
      .overrideProvider('FHIR_CLIENT')
      .useValue(mockFhirClient)
      .compile();

    app = module.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  afterEach(async () => {
    await app.close();
    jest.clearAllMocks();
  });

  it('GET /api/patients returns patient array with correct DTO shape', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/patients')
      .query({ name: 'Smith' })
      .expect(200);

    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0]).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
      gender: expect.any(String),
      birthDate: expect.any(String),
    });
  });

  it('GET /api/patients/:id/observations returns observation array with correct DTO shape', async () => {
    const res = await request(app.getHttpServer()).get('/api/patients/p1/observations').expect(200);

    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0]).toMatchObject({
      id: expect.any(String),
      code: expect.any(String),
      value: expect.any(Number),
      unit: expect.any(String),
      effectiveDateTime: expect.any(String),
      category: expect.any(String),
    });
  });
});
