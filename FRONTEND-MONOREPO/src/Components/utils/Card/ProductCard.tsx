import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import Product from "../../model/product";
import ViewProductStateStore from "../../../stores/StateStore/Product/product-state-store";
import { isEmptyString } from "../../../utils/validator";

interface ProductCardProps {
  product: Product;
  setProducts: (products: Product[]) => void;
}

const useStyles = createUseStyles({
  productCard: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    position: "relative",
    backgroundColor: "#fff",
    maxWidth: "400px",
    height: "440px",
  },
  productTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  productImage: {
    width: "100%",
    height: "220px",
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  productField: {
    marginBottom: "10px",
    width: "95%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
  },
  productButtonContainer: {
    position: "absolute",
    bottom: "10px",
    right: "10px",
  },
  productSaveButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#45a049",
    },
    "&:disabled": {
      backgroundColor: "#ccc",
      cursor: "not-allowed",
    },
  },
});

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  setProducts,
}) => {
  const classes = useStyles();
  const productStore = new ViewProductStateStore();
  const [name, setProductName] = useState(product.name);
  const [description, setProductDescription] = useState(product.description);
  const [price, setProductPrice] = useState(product.price);
  const [isDirty, setIsDirty] = useState(false);

  const setIsProductCardDirty = () => {
    if (!isEmptyString(name) && !isEmptyString(description) && price > 0) {
      setIsDirty(true);
    }
  };

  const setName = (nameValue: string) => {
    setProductName(nameValue);
    setIsProductCardDirty();
  };

  const setDescription = (descriptionValue: string) => {
    setProductDescription(descriptionValue);
    setIsProductCardDirty();
  };

  const setPrice = (priceValue: number) => {
    setProductPrice(priceValue);
    setIsProductCardDirty();
  };

  const handleSave = () => {
    product.setName(name);
    product.setDescription(description);
    product.setPrice(price);
    productStore.setProductById(product.id, product);
    setProducts(productStore.products);
    setIsDirty(false);
  };

  return (
    <div className={classes.productCard}>
      <div className={classes.productTitle}>
        {product ? `${product.name} Details` : "Product Details"}
      </div>
      <div className={classes.productImage}></div>
      <input
        type="text"
        name="name"
        value={name || ""}
        onChange={(e) => setName(e.target.value)}
        className={classes.productField}
        placeholder="Product Name"
      />
      <input
        type="text"
        name="description"
        value={description || ""}
        onChange={(e) => setDescription(e.target.value)}
        className={classes.productField}
        placeholder="Product Description"
      />
      <input
        type="number"
        name="price"
        value={price || ""}
        onChange={(e) => setPrice(parseFloat(e.target.value))}
        className={classes.productField}
        placeholder="Product Price"
      />
      <div className={classes.productButtonContainer}>
        <button
          className={classes.productSaveButton}
          onClick={handleSave}
          disabled={!isDirty}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
