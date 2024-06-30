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
  navLinks: {
    display: "flex",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  navLinkItem: {
    marginLeft: "15px",
  },
  navLink: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
    "&:hover": {
      color: "lightblue",
    },
  },
});

const Navbar = () => {
  const classes = useStyles();

  return (
    <nav className={classes.navbar}>
      <div className={classes.logo}>Logo</div>
      <ul className={classes.navLinks}>
        <li className={classes.navLinkItem}>
          <a href="/" className={classes.navLink}>
            Home
          </a>
        </li>
        <li className={classes.navLinkItem}>
          <a href="/about" className={classes.navLink}>
            About
          </a>
        </li>
        <li className={classes.navLinkItem}>
          <a href="/services" className={classes.navLink}>
            Services
          </a>
        </li>
        <li className={classes.navLinkItem}>
          <a href="/contact" className={classes.navLink}>
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
