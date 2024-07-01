// Navbar.js
import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333",
    color: "#fff",
    padding: "10px 20px",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    textDecoration: "none",
    color: "#fff",
  },
});

const Navbar = () => {
  const classes = useStyles();

  return (
    <nav className={classes.navbar}>
      <div className={classes.logo}>My Store</div>
    </nav>
  );
};

export default Navbar;
