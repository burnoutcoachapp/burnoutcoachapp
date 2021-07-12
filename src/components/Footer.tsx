import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import emilyFooter from '../images/emily-footer.png';

const useStyles = makeStyles({
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    display: 'block',
    width: '100vw',
    height: 'auto',
    maxHeight: '100%',
    maxWidth: 'auto',
  },
});

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <Container className={classes.footer}>
      <img src={emilyFooter} className={classes.image} />
    </Container>
  );
};

export default Footer;
