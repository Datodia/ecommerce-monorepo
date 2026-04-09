import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { QueryParamsDto } from './dto/query-params.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private productRepo: Repository<Product>) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.productRepo.create(createProductDto);
    const savedProduct = await this.productRepo.save(product);
    return await this.findOne(savedProduct.id);
  }

  async findAll({page, limit, category}: QueryParamsDto) {
    const [data, total] = await this.productRepo.findAndCount({
      where: category ? { category: { slug: category } } : {},
      skip: (page - 1) * limit,
      take: limit,
      relations: {
        category: true,
      },
    });

    return {
      data,
      total,
      page,
      last_page: Math.ceil(total / limit)
    };
  }

  async findOne(id: string) {
    return await this.productRepo.findOne({
      where: { id },
      relations: {
        category: true,
      },
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.productRepo.update({ id }, updateProductDto);
    return await this.findOne(id);
  }

  async remove(id: string) {
    const product = await this.findOne(id); 
    await this.productRepo.delete({id});
    return product;
  }
}
