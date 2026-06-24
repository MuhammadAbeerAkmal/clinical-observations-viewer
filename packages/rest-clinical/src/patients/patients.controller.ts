import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ObservationDto, PatientDto } from 'lib-dto';
import { PatientsService } from './patients.service';

@ApiBearerAuth()
@ApiTags('patients')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  @ApiOperation({ summary: 'Search patients by name on HAPI FHIR R4' })
  @ApiQuery({ name: 'name', required: false, description: 'Partial name to search' })
  @ApiResponse({ status: 200, description: 'List of matching patients', type: [PatientDto] })
  searchPatients(@Query('name') name: string): Promise<PatientDto[]> {
    return this.patientsService.searchPatients(name ?? '');
  }

  @Get(':id/observations')
  @ApiOperation({ summary: 'Get vital-signs observations for a patient' })
  @ApiParam({ name: 'id', description: 'FHIR Patient resource ID' })
  @ApiResponse({
    status: 200,
    description: 'List of vital-signs observations',
    type: [ObservationDto],
  })
  getObservations(@Param('id') id: string): Promise<ObservationDto[]> {
    return this.patientsService.getObservations(id);
  }
}
