import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password } = createUserDto;

    const userExists = await this.usersRepository.findOne({ where: { email } });
    if (userExists) {
      throw new ConflictException('Este e-mail já está em uso.');
    }

    const hashedPassword = await bcrypt.hashSync(password, 10);

    const newUser = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await this.usersRepository.save(newUser);
    delete (savedUser as any).password;
    return savedUser;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: { products: true } });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ 
      where: { id }, 
      relations: { products: true } 
    });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }
    return user;
  }

  async update(id: number, updateUserDto: any): Promise<User> {
    const user = await this.findOne(id); // Garante que o usuário existe antes de atualizar
    
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hashSync(updateUserDto.password, 10);
    }

    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id); // Retorna o registro atualizado
  }

  async remove(id: number): Promise<{ message: string }> {
    const user = await this.findOne(id); // Garante que existe
    await this.usersRepository.delete(id);
    return { message: `Usuário com ID ${id} removido com sucesso.` };
  }
}
