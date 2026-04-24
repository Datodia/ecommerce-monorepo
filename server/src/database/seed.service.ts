import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '@src/categories/entities/category.entity';
import { Product } from '@src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { seedCategories, seedProducts } from './seed-data';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async run() {
    for (const categoryData of seedCategories) {
      await this.categoryRepo.upsert(categoryData, ['slug']);
    }

    const categories = await this.categoryRepo.find();
    const categoriesBySlug = new Map(
      categories.map((category) => [category.slug, category]),
    );

    for (const productData of seedProducts) {
      const category = categoriesBySlug.get(productData.categorySlug);

      if (!category) {
        throw new Error(
          `Seed category "${productData.categorySlug}" was not found.`,
        );
      }

      const existingProduct = await this.productRepo.findOne({
        where: {
          name: productData.name,
          category: { id: category.id },
        },
        relations: {
          category: true,
        },
      });

      const payload = this.productRepo.create({
        id: existingProduct?.id,
        name: productData.name,
        description: productData.description,
        price: productData.price,
        thumbnail: productData.thumbnail,
        images: productData.images,
        categoryId: category.id,
      });

      await this.productRepo.save(payload);
    }

    return {
      categories: seedCategories.length,
      products: seedProducts.length,
    };
  }
}
