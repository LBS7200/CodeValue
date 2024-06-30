import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {},
});

const Text: React.FC = () => {
  const classes = useStyles();

  return <div className={classes.container}></div>;
};

export default Text;
