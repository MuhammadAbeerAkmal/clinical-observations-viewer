import { Module } from '@nestjs/common';
import { FhirHttpClient } from 'lib-server';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';

@Module({
  controllers: [PatientsController],
  providers: [PatientsService, { provide: 'FHIR_CLIENT', useValue: FhirHttpClient }],
})
export class PatientsModule {}
