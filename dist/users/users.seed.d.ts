import { OnApplicationBootstrap } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersSeed implements OnApplicationBootstrap {
    private readonly usersRepository;
    private readonly logger;
    constructor(usersRepository: Repository<User>);
    onApplicationBootstrap(): Promise<void>;
    seedUsers(): Promise<void>;
}
