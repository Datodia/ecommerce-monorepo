import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const corsOrigins = configService.get<string[]>('security.cors.origins') ?? [];
  const frontendUrl = configService.get<string>('frontend.url');
  const allowedOrigins = [
    ...corsOrigins,
    ...(frontendUrl ? [frontendUrl] : []),
  ];

  app.enableCors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : true,
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true
  }))

  await app.listen(configService.get<number>('app.port') ?? 4000);
}
bootstrap();
