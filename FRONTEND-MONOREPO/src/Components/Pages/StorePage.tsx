import { v4 as uuid } from "uuid";

import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import Product, { DEFAULT_PRODUCT } from "../model/product";
import CardsList from "../utils/CardsList";
import ProductCard from "../utils/Card/ProductCard";
import ViewProductStateStore from "../../stores/StateStore/Product/product-state-store";
import Toolbar from "../utils/Toolbar";
import Navbar from "../utils/Navbar";

const PAGE_INDEX_START = 1;
const ITEM_PER_PAGE = 4;

const useStyles = createUseStyles({
  root: {
    fontFamily: "Comic Sans MS, Comic Sans, cursive",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
  leftPanel: {
    width: "70%",
    marginRight: "10px",
  },
  rightPanel: {
    width: "30%",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  paginationButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    marginLeft: "10px",
    "&:disabled": {
      backgroundColor: "#ccc",
      cursor: "not-allowed",
    },
  },
  pageInfo: {
    display: "flex",
    alignItems: "center",
    marginLeft: "10px",
    fontSize: "14px",
    color: "#666",
  },
});

const StorePage = () => {
  const classes = useStyles();
  const productStore = new ViewProductStateStore();
  const [products, setProducts] = useState<Product[]>(productStore.products);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );
  const [currentPage, setCurrentPage] = useState(PAGE_INDEX_START);

  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / ITEM_PER_PAGE);

  const handleAdd = () => {
    const newProduct = new Product(uuid(), "", "", 0, new Date());
    productStore.addProduct(newProduct);
    setSelectedProduct(newProduct);
  };

  const handleSearch = (query: string) => {
    setProducts(productStore.filterByName(query));
  };

  const handleSort = (option: string) => {
    console.log("Sort option:", option);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const startIndex = (currentPage - 1) * ITEM_PER_PAGE;
  const endIndex = startIndex + ITEM_PER_PAGE;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.container}>
        <div className={classes.leftPanel}>
          <Toolbar
            onAdd={handleAdd}
            onSearch={handleSearch}
            onSort={handleSort}
          />

          <CardsList
            products={currentProducts}
            setSelectedProduct={setSelectedProduct}
          />
          <div className={classes.pagination}>
            <button
              className={classes.paginationButton}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              {"<<"}
            </button>
            <div className={classes.pageInfo}>
              Page {currentPage} of {totalPages}
            </div>
            <button
              className={classes.paginationButton}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              {">>"}
            </button>
          </div>
        </div>
        {selectedProduct && productStore.getProductById(selectedProduct.id) && (
          <div className={classes.rightPanel}>
            <ProductCard product={selectedProduct} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StorePage;
