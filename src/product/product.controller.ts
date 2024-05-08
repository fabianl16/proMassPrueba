import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { PaginationDto } from './dto/pagination.dto';


@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll( @Query() paginationDto: PaginationDto) {
    return this.productService.findAll( paginationDto );
  }

  @UseGuards(AuthGuard)
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.productService.findProductByTerm(term);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Post('seed')
  executeSeed(){
    return this.productService.runSeed();
  }
}
