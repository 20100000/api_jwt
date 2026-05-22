import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('products')
@ApiBearerAuth() 
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto, @Request() req) {
    const userId = req.user.userId;
    return this.productsService.create(createProductDto, userId);
  }

  @Get()
  findAll() {
    return this.productsService.findAll(); 
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id); 
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: any) {
    return this.productsService.update(+id, updateProductDto); 
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id); 
  }
}
