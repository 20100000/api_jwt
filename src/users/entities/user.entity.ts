import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false }) // Corrige o Erro 3 (delete savedUser.password)
  password: string;

  @OneToMany(() => Product, (product) => product.user) // Corrige o Erro 1 (user.products)
  products: Product[];
}
