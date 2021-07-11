import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import emilyFooter from '../images/emily-footer.png';
import { relative } from 'path';

const useStyles = makeStyles({
    footer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      position: 'fixed',
      bottom: 0,
      right: 0,
      display: 'block',
      width: '100%',
      height: 200,
      maxHeight: 300,
      maxWidth: 1500,
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