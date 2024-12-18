import { Get, Injectable, NotFoundException, Post } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  products: Product[] = [];

  insertProduct(title: string, desc: string, price: number) {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }

  getAllProducts() {
    return [...this.products];
  }
  getProduct(prodId: string) {
    const product = this.findProduct(prodId)[0];
    return { ...product };
  }

  updateProduct(
    prodId: string,
    prodTitle: string,
    desc: string,
    price: number,
  ) {
    const [product, index] = this.findProduct(prodId);
    return (this.products[index] = {
      ...product,
      title: prodTitle,
      description: desc,
      price: price,
    });
  }

  deleteProduct(prodId: string) {
    const productIndex = this.findProduct(prodId)[1];
    return this.products.slice(productIndex, 1);
  }
  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((product) => {
      return product.id === id;
    });
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return [product, productIndex];
  }
}
