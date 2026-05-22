// src/products/products.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { User } from '../users/entities/user.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createProductDto: CreateProductDto, userId: number): Promise<Product> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const newProduct = this.productsRepository.create({
      ...createProductDto,
      user,
    });

    return this.productsRepository.save(newProduct);
  }

  // --- ADICIONE OS MÉTODOS ABAIXO ---

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find({ relations: { user: true } });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({ 
      where: { id }, 
      relations: { user: true } 
    });
    if (!product) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
    }
    return product;
  }

  async update(id: number, updateProductDto: any): Promise<Product> {
    await this.findOne(id); // Valida existência
    await this.productsRepository.update(id, updateProductDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id); // Valida existência
    await this.productsRepository.delete(id);
    return { message: `Produto com ID ${id} removido com sucesso.` };
  }
}
