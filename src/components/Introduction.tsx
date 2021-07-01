import { Box, Container, Typography, makeStyles } from '@material-ui/core';
import React from 'react';
import strings from '../strings';
import Video from './Video';

const useStyles = makeStyles({
  introduction: {
    paddingTop: 40,
    flexDirection: 'column',
  },
  title: {},
  videoSection: {
    display: 'flex',
    paddingTop: 40,
    flexDirection: 'row',
  },
  propaganda: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});

const Introduction: React.FC = () => {
  const classes = useStyles();

  return (
    <Container className={classes.introduction}>
      <Box className={classes.title}>
        <Typography variant="h4" align="center">
          {strings.welcome}
        </Typography>
      </Box>
      <Box className={classes.videoSection}>
        <Box>
          <Video />
          <Typography style={{ paddingTop: 8 }} variant="body2" align="center">
            {strings.watchFirst}
          </Typography>
        </Box>
        <Container className={classes.propaganda}>
          <Typography variant="body1" align="center">
            {strings.propagandaPart1}
          </Typography>
          <Typography style={{ paddingTop: 20 }} variant="body1" align="center">
            {strings.propagandaPart2}
          </Typography>
        </Container>
      </Box>
    </Container>
  );
};

export default Introduction;
