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

  setProductById(id: string, updatedProductData: Product): void {
    const updatedProducts = this.products.map((product) =>
      product.id === id ? updatedProductData : product
    );
    this.setProducts(updatedProducts);
  }

  setProducts(products: Product[]): void {
    this.products = products;
    console.log(products);
    const updatedProducts = products.map((product) => product.toRaw());
    setProductsToLocalStorage(updatedProducts);
  }

  addProduct(product: Product): void {
    this.products.push(product);
    this.setProducts(this.products);
  }

  deleteProduct(id: string): void {
    const filteredProducts = this.products.filter(
      (product) => product.id !== id
    );
    this.setProducts(filteredProducts);
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
