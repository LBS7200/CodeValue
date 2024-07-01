import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import Product from "../../model/product";

interface ProductCardProps {
  product: Product | undefined;
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
  field: {
    marginBottom: "10px",
    width: "95%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
  },
  buttonContainer: {
    position: "absolute",
    bottom: "10px",
    right: "10px",
  },
  saveButton: {
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
  },
});

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const classes = useStyles();
  const [editedProduct, setEditedProduct] = useState({ ...product });
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProduct({
      ...editedProduct,
      [name]: value,
    });
    setIsDirty(true);
  };

  const handleSave = () => {
    // onSave(editedProduct);
    setIsDirty(false);
  };

  return (
    <div className={classes.productCard}>
      <div className={classes.productTitle}>
        {editedProduct ? `${editedProduct.name} Details` : "Product Details"}
      </div>
      <div className={classes.productImage}></div>
      <input
        type="text"
        name="name"
        value={editedProduct?.name || ""}
        onChange={handleChange}
        className={classes.field}
        placeholder="Product Name"
      />
      <input
        type="text"
        name="description"
        value={editedProduct?.description || ""}
        onChange={handleChange}
        className={classes.field}
        placeholder="Product Description"
      />
      <input
        type="number"
        name="price"
        value={editedProduct?.price || ""}
        onChange={handleChange}
        className={classes.field}
        placeholder="Product Price"
      />
      <div className={classes.buttonContainer}>
        <button
          className={classes.saveButton}
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
