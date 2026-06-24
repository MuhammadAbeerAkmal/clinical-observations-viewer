import { ApiProperty } from '@nestjs/swagger';

export class ObservationDto {
  @ApiProperty({ example: 'obs-456' })
  id!: string;

  @ApiProperty({ example: 'Heart rate' })
  code!: string;

  @ApiProperty({ example: 72 })
  value!: number;

  @ApiProperty({ example: 'beats/min' })
  unit!: string;

  @ApiProperty({ example: '2024-01-15T10:00:00Z' })
  effectiveDateTime!: string;

  @ApiProperty({ example: 'vital-signs' })
  category!: string;
}
