import React from "react";
import { createUseStyles } from "react-jss";
import Product from "../model/product";
import CardList from "./Card/CardList";

interface CardsListProps {
  products: Product[];
  setSelectedProduct?: (product: Product | undefined) => void;
}

const useStyles = createUseStyles({
  productList: {
    display: "grid",
    gap: "20px",
  },
});

const CardsList: React.FC<CardsListProps> = ({
  products,
  setSelectedProduct,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.productList}>
      {products.map((product) => (
        <CardList
          key={product.id}
          product={product}
          setSelectedProduct={setSelectedProduct}
        />
      ))}
    </div>
  );
};

export default CardsList;
