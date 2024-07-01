import { makeAutoObservable } from "mobx";
import Product from "../../../Components/model/product";
import {
  getProductsFromLocalStorage,
  setProductsToLocalStorage,
} from "../../DataStore/Product/product-data-store";

class ViewProductStateStore {
  products: Product[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.loadProducts();
  }

  loadProducts(): void {
    this.products = getProductsFromLocalStorage().map((product) =>
      Product.fromRaw(product)
    );
  }

  getProductById(id: string): Product | null {
    return this.products.find((product) => product.id === id) || null;
  }

  setProductById(id: string, updatedProductData: Partial<Product>): void {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      const updatedProduct = {
        ...this.products[index],
        ...updatedProductData,
      } as Product;
      const newProducts = [...this.products];
      newProducts[index] = updatedProduct;
      this.setProducts(newProducts);
    } else {
      console.error(`Product with id ${id} not found.`);
    }
  }

  setProducts(products: Product[]): void {
    this.products = products;
    const updatedProducts = products.map((product) => product.toRaw());
    setProductsToLocalStorage(updatedProducts);
  }

  addProduct(product: Product): void {
    this.products.push(product);
    this.setProducts(this.products);
  }

  filterProducts(filter: (product: Product) => boolean): Product[] {
    return this.products.filter(filter);
  }

  filterByName(nameSubstring: string): Product[] {
    return this.filterProducts((product) =>
      product.name.toLowerCase().includes(nameSubstring.toLowerCase())
    );
  }

  filterByDescription(): Product[] {
    return this.filterProducts((product) => product.description.length > 100);
  }

  filterProductsByDateRange(startDate: Date, endDate: Date): Product[] {
    return this.products.filter((product) => {
      const productDate = new Date(product.creationDate);
      return productDate >= startDate && productDate <= endDate;
    });
  }

  filterProductsByPriceRange(minPrice: number, maxPrice: number): Product[] {
    return this.products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
  }
}

export default ViewProductStateStore;
