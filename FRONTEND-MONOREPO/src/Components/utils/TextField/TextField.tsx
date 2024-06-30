import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {},
});

const TextField: React.FC = () => {
  const classes = useStyles();

  return <div className={classes.container}></div>;
};

export default TextField;
