import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'João Silva', description: 'Nome completo do usuário' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'joao@email.com', description: 'E-mail único de acesso' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'senhaSegura123', description: 'Senha de acesso', minLength: 6 })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
