import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, MinLength } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ 
    example: 'Teclado Mecânico RGB', 
    description: 'Nome ou título do produto' 
  })
  @IsNotEmpty({ message: 'O título do produto é obrigatório.' })
  @MinLength(3, { message: 'O título deve ter no mínimo 3 caracteres.' })
  title: string;

  @ApiProperty({ 
    example: 299.90, 
    description: 'Preço unitário do produto com até 2 casas decimais' 
  })
  @IsNotEmpty({ message: 'O preço é obrigatório.' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'O preço deve ser um número válido.' })
  @IsPositive({ message: 'O preço deve ser maior que zero.' })
  price: number;
}
