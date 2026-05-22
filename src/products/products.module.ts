// src/products/products.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { User } from '../users/entities/user.entity'; // Importa a entidade User

@Module({
  imports: [TypeOrmModule.forFeature([Product, User])], // Registra ambas as entidades aqui
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
