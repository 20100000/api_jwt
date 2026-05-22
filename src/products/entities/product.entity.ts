// src/products/product.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity'; // Importa a outra entidade

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('decimal', { precision: 10, scale: 2 }) // Configura tipo decimal para dinheiro
  price: number;

  @Column({ default: true })
  inStock: boolean;

  // Muitos produtos pertencem a um único usuário
  @ManyToOne(() => User, (user) => user.products, { onDelete: 'CASCADE' })
  user: User;
}
