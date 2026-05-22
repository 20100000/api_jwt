import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { User } from '../users/entities/user.entity';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductsService {
    private productsRepository;
    private usersRepository;
    constructor(productsRepository: Repository<Product>, usersRepository: Repository<User>);
    create(createProductDto: CreateProductDto, userId: number): Promise<Product>;
    findAll(): Promise<Product[]>;
    findOne(id: number): Promise<Product>;
    update(id: number, updateProductDto: any): Promise<Product>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
