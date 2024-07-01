import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgb(159, 197, 248)",
    color: "#fff",
    padding: "10px 20px",
  },
  logo: {
    fontSize: "24px",
    textDecoration: "none",
    color: "black",
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
