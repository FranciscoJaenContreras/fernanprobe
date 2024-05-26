import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(
      @Query('page') page = 1,
      @Query('pageSize') pageSize = 20,
      @Query('category') category?: string,
      @Query('minPrice') minPrice?: number,
      @Query('maxPrice') maxPrice?: number,
      @Query('sold') sold?: boolean
  ) {
      return this.productsService.findAllPaginated(+page, +pageSize, category, minPrice, maxPrice, sold);
  }

  @Get(':letters')
  findName(
      @Param('letters') letters: string,
      @Query('page') page = 1,
      @Query('pageSize') pageSize = 20,
      @Query('category') category?: string,
      @Query('minPrice') minPrice?: number, 
      @Query('maxPrice') maxPrice?: number,
      @Query('sold') sold?: boolean
  ) {
      return this.productsService.findByNamePaginated(letters, +page, +pageSize, category, minPrice, maxPrice, sold);
  }

  @Get('/user/:idUser')
  findUser(
      @Param('idUser') idUser: string,
      @Query('page') page = 1,
      @Query('pageSize') pageSize = 20,
      @Query('sold') sold?: boolean
  ) {
      return this.productsService.findByIdUserPaginated(idUser, +page, +pageSize, sold);
  }

  @Get('/sellto/:idUser')
  findSellTo(
      @Param('idUser') idUser: string,
      @Query('page') page = 1,
      @Query('pageSize') pageSize = 20
  ) {
      return this.productsService.findSellToPaginated(idUser, +page, +pageSize);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
