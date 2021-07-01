import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import emilyHeader from '../images/emily-header.png';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    display: 'block',
    width: '100vw',
    height: 'auto',
    maxHeight: 300,
    maxWidth: 1500,
  },
});

const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <Container className={classes.header}>
      <img src={emilyHeader} className={classes.image} />
    </Container>
  );
};

export default Header;
