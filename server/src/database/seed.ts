import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { SeedService } from './seed.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedModule, {
    logger: ['error', 'warn'],
  });

  try {
    const seedService = app.get(SeedService);
    const result = await seedService.run();
    console.log(
      `Seed completed. Categories: ${result.categories}, Products: ${result.products}`,
    );
  } finally {
    await app.close();
  }
}

bootstrap().catch((error: unknown) => {
  const message =
    error instanceof Error ? error.stack ?? error.message : String(error);
  console.error(message);
  process.exit(1);
});
