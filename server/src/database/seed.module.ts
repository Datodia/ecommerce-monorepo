import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '@src/categories/entities/category.entity';
import configuration from '@src/config/configuration';
import { validateEnv } from '@src/config/env.validation';
import { Product } from '@src/products/entities/product.entity';
import { SeedService } from './seed.service';
import { createTypeOrmOptions } from './typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: validateEnv,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: createTypeOrmOptions,
    }),
    TypeOrmModule.forFeature([Category, Product]),
  ],
  providers: [SeedService],
})
export class SeedModule {}
