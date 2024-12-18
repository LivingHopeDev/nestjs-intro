import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') desc: string,
    @Body('price') price: number,
  ): any {
    const generatedId = this.productsService.insertProduct(
      prodTitle,
      desc,
      price,
    );
    return { id: generatedId };
  }

  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts();
  }
  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getProduct(prodId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') desc: string,
    @Body('price') price: number,
  ) {
    return this.productsService.updateProduct(prodId, prodTitle, desc, price);
  }
  @Delete(':id')
  deleteProduct(@Param('id') prodId: string) {
    return this.productsService.deleteProduct(prodId);
  }
}
