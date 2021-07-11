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
        flexDirection: 'column',
    },
    propaganda: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    videoBox: {
        position: 'relative',
        paddingBottom: '56.25%',
    },
    propagandaSection: {
        paddingTop: 16,
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
                <Box className={classes.videoBox}>
                    <Video />
                </Box>
                <Typography style={{ paddingTop: 16 }} variant="body2" align="center">
                    {strings.watchFirst}
                </Typography>
            </Box>
            <Box className={classes.propagandaSection}>
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
