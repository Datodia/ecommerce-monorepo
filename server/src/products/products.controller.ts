import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryParamsDto } from './dto/query-params.dto';
import { AuthGuard } from '@src/auth/guard/auth.guard';
import { AdminGuard } from '@src/auth/guard/admin.guard';
import { Admin } from '@src/auth/decorators/admin.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(AuthGuard, AdminGuard)
  @Admin()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query() { limit, page, category }: QueryParamsDto) {
    return this.productsService.findAll({ page, limit, category });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, AdminGuard)
  @Admin()
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, AdminGuard)
  @Admin()
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
