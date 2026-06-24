import { ApiProperty } from '@nestjs/swagger';

export class PatientDto {
  @ApiProperty({ example: 'patient-123' })
  id!: string;

  @ApiProperty({ example: 'Jane Smith' })
  name!: string;

  @ApiProperty({ example: 'female', enum: ['male', 'female', 'other', 'unknown'] })
  gender!: string;

  @ApiProperty({ example: '1980-06-15' })
  birthDate!: string;
}
