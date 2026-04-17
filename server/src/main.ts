import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { raw } from 'express';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const corsOrigins =
    configService.get<string[]>('security.cors.origins') ?? [];
  const frontendUrl = configService.get<string>('frontend.url');
  const allowedOrigins = [
    ...corsOrigins,
    ...(frontendUrl ? [frontendUrl] : []),
  ];

  app.enableCors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : true,
    credentials: true,
  });

  app.use('/payments/webhook', raw({ type: 'application/json' }));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'main_queue',
      noAck: false,
      queueOptions: {
        durable: false,
      },
    },
  })

  await app.startAllMicroservices();
  await app.listen(configService.get<number>('app.port') ?? 4000);
}

void bootstrap();
