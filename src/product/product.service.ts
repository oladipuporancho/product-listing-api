import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(product: Partial<Product>) {
    const newProduct = this.productRepository.create(product);
    return this.productRepository.save(newProduct);
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return this.productRepository.findOneBy({ id });
  }

  async update(id: number, updated: Partial<Product>) {
    await this.productRepository.update(id, updated);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.productRepository.delete(id);
    return { deleted: true };
  }
}
