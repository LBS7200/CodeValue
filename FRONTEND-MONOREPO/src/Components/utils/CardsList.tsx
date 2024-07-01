import React from "react";
import { createUseStyles } from "react-jss";
import Product from "../model/product";
import CardList from "./Card/CardList";
import ViewProductStateStore from "../../stores/StateStore/Product/product-state-store";

interface CardsListProps {
  products: Product[];
  setProducts: (products: Product[]) => void;
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
  setProducts,
  setSelectedProduct,
}) => {
  const classes = useStyles();
  const productStore = new ViewProductStateStore();

  const deleteProduct = (id: string) => {
    productStore.deleteProduct(id);
    setProducts(productStore.products);
  };

  return (
    <div className={classes.productList}>
      {products.map((product) => (
        <CardList
          key={product.id}
          product={product}
          onDeleted={deleteProduct}
          setSelectedProduct={setSelectedProduct}
        />
      ))}
    </div>
  );
};

export default CardsList;
