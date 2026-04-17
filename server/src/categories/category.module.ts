import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { AuthModule } from '@src/auth/auth.module';
import { StorageModule } from '@src/storage/storage.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), AuthModule, StorageModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
