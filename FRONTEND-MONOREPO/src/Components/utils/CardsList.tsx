import React from "react";
import { createUseStyles } from "react-jss";
import Product from "../model/product";
import CardList from "./Card/CardList";

interface CardsListProps {
  products: Product[];
  onDelete: (id: string) => void;
}

const useStyles = createUseStyles({
  productList: {
    display: "grid",
    gap: "20px",
  },
});

const CardsList: React.FC<CardsListProps> = ({ products, onDelete }) => {
  const classes = useStyles();

  const handleDelete = (id: string) => {
    onDelete(id);
  };

  return (
    <div className={classes.productList}>
      {products.map((product) => (
        <CardList
          key={product.id}
          product={product}
          onDelete={() => handleDelete(product.id)}
        />
      ))}
    </div>
  );
};

export default CardsList;
