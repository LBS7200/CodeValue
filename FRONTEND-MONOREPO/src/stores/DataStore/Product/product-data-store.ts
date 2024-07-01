import Product from "../../../Components/model/product";

export const getProducts = () => {
  try {
    const productsJSON = localStorage.getItem("products");
    if (!productsJSON) {
      return [];
    }
    return JSON.parse(productsJSON);
  } catch (error) {
    console.error("Error retrieving products from localStorage:", error);
    return [];
  }
};

export const setProducts = (products: Product[]) => {
  localStorage.setItem("products", JSON.stringify(products));
};

