import { IProduct } from "../../../service/response";

const initializeProducts = (): IProduct[] => {
  return [
    {
      id: "1",
      name: "Product 1",
      description: "Description of Product 1",
      price: 50,
      creation_date: new Date("2021-01-01T00:00:00.000Z"),
    },
    {
      id: "2",
      name: "Product 2",
      description: "Description of Product 2",
      price: 75,
      creation_date: new Date("2024-01-01T00:00:00.000Z"),
    },
    {
      id: "3",
      name: "Product 3",
      description: "Description of Product 3",
      price: 75,
      creation_date: new Date("2024-01-01T00:00:00.000Z"),
    },
    {
      id: "4",
      name: "Product 4",
      description: "Description of Product 4",
      price: 75,
      creation_date: new Date("2024-01-01T00:00:00.000Z"),
    },
    {
      id: "5",
      name: "Product 5",
      description: "Description of Product 5",
      price: 75,
      creation_date: new Date("2024-01-01T00:00:00.000Z"),
    },
  ];
};

export const getProductsFromLocalStorage = (): IProduct[] => {
  try {
    let productsJSON = localStorage.getItem("products");
    if (productsJSON === null) {
      const initialProducts = initializeProducts();
      setProductsToLocalStorage(initialProducts);
      productsJSON = localStorage.getItem("products");
    }
    if (productsJSON === null) {
      return [];
    }
    return JSON.parse(productsJSON);
  } catch (error) {
    console.error("Error retrieving products from localStorage:", error);
    return [];
  }
};

export const setProductsToLocalStorage = (products: IProduct[]): void => {
  localStorage.setItem("products", JSON.stringify(products));
};
