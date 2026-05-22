import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersSeed implements OnApplicationBootstrap {
  private readonly logger = new Logger(UsersSeed.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async onApplicationBootstrap() {
    await this.seedUsers();
  }

  async seedUsers() {
    const defaultEmail = 'tiago@email.com';

    // 1. Verifica se o usuário de seed já existe no banco
    const userExists = await this.usersRepository.findOne({
      where: { email: defaultEmail },
    });

    if (userExists) {
      this.logger.log('Seed de usuários pulada: Usuário admin já existe.');
      return;
    }

    // 2. Cria o hash da senha padrão
    const hashedPassword = await bcrypt.hashSync('admin123', 10);

    // 3. Salva o usuário administrador inicial
    const adminUser = this.usersRepository.create({
      name: 'Administrador Inicial',
      email: defaultEmail,
      password: hashedPassword,
    });

    await this.usersRepository.save(adminUser);
    
    this.logger.log('Seed de usuários executada com sucesso!');
    this.logger.log(`Usuário criado -> Email: ${defaultEmail} | Senha: admin123`);
  }
}
