import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const CustomLayout: React.FC = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.children}
    </div>
  );
}

  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: "#FAFAFA",
    },
  }
));

export default CustomLayout;