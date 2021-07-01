import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { Header, Introduction, Form } from "../components";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
});

const QuestionnaireScreen: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Header />
      <Introduction />
      <Form />
    </Box>
  );
};

export default QuestionnaireScreen;
