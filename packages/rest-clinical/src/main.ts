import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({ origin: process.env['UI_ORIGIN'] ?? 'http://localhost:4200' });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Clinical Observations API')
    .setDescription('Proxies HAPI FHIR R4 - patient search and vital-signs observations')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env['PORT'] ?? 3000;
  await app.listen(port);
  Logger.log(`Application running on http://localhost:${port}/api`);
  Logger.log(`Swagger UI at http://localhost:${port}/api/docs`);
}

bootstrap();
