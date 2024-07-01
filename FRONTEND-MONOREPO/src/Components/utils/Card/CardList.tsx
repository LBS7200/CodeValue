import React from "react";
import Product from "../../model/product";
import { createUseStyles } from "react-jss";

interface CardListProps {
  product: Product;
  onDelete: () => void;
}

const useStyles = createUseStyles({
  productCard: {
    display: "flex",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
    marginBottom: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.02)",
    },
  },
  productImage: {
    width: "100px",
    height: "100px",
    backgroundColor: "#f0f0f0",
    marginRight: "20px",
    borderRadius: "8px",
  },
  productDetails: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  productName: {
    fontSize: "18px",
    marginBottom: "8px",
  },
  productDescription: {
    marginBottom: "8px",
  },
  productPrice: {
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    alignSelf: "flex-end",
    marginTop: "auto",
    "&:hover": {
      backgroundColor: "#d32f2f",
    },
  },
});

const CardList: React.FC<CardListProps> = ({ product, onDelete }) => {
  const classes = useStyles();

  const handleDeleteClick = () => {
    onDelete();
  };

  return (
    <div className={classes.productCard}>
      <div className={classes.productImage}></div>
      <div className={classes.productDetails}>
        <h3 className={classes.productName}>{product.name}</h3>
        <p className={classes.productDescription}>{product.description}</p>
        <p className={classes.productPrice}>Price: ${product.price}</p>
        <button className={classes.deleteButton} onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default CardList;
