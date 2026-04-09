import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { QueryParamsDto } from './dto/query-params.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>
  ){}

  async onModuleInit(){
    const resp = await fetch('https://api.escuelajs.co/api/v1/categories');
    const categories = await resp.json();
    const insetedCategories = categories.map((category: any) => ({
      name: category.name,
      slug: category.slug,
      images: category.image
    }))

    const count = await this.categoryRepo.count();
    if(count === 0){
      await this.categoryRepo.insert(insetedCategories);
    }
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepo.save(createCategoryDto);
    return category;
  }

  async findAll({page , limit, category }: QueryParamsDto) {
    const [data, total] = await this.categoryRepo.findAndCount({
      where: category ? { name: category } : {},
      skip: (page - 1) * limit,
      take: limit
    });

    return {
      data,
      total,
      page,
      last_page: Math.ceil(total / limit)
    };
  }

  async findOne(id: string) {
    return await this.categoryRepo.findOne({ where: { id } });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    await this.categoryRepo.update({ id }, updateCategoryDto);
    return await this.categoryRepo.findOne({ where: { id } });
  }

  async remove(id: string) {
    await this.categoryRepo.delete({ id });
    return { message: 'Category deleted successfully' };
  }
}
