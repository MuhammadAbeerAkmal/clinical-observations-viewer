import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PatientsModule } from '../patients/patients.module';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Module({
  imports: [PatientsModule, AuthModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
