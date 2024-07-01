import React from "react";
import { createUseStyles } from "react-jss";
import Navbar from "../utils/Navbar";
import Toolbar from "../utils/Toolbar";
import ViewProductStateStore from "../../stores/StateStore/Product/product-state-store";
import CardsList from "../utils/CardsList";

const useStyles = createUseStyles({
  body: {
    fontFamily: "Comic Sans MS, Comic Sans, cursive",
  },
});

const StorePage = () => {
  const classes = useStyles();
  const productStore = new ViewProductStateStore();

  const handleAdd = () => {
    console.log("Add button clicked");
  };

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  const handleSort = (option: string) => {
    console.log("Sort option:", option);
  };

  return (
    <div className={classes.body}>
      <Navbar />
      <Toolbar onAdd={handleAdd} onSearch={handleSearch} onSort={handleSort} />
      <CardsList products={productStore.products} onDelete={function (id: string): void {
        throw new Error("Function not implemented.");
      } } />
    </div>
  );
};

export default StorePage;
