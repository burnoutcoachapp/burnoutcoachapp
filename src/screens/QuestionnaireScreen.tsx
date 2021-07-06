import React, { useEffect } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { Header, Introduction, Form } from '../components';
import strings from '../strings';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
});

const QuestionnaireScreen: React.FC = () => {
    const classes = useStyles();

    useEffect(() => {
        document.title = strings.appTitle;
    }, []);

    return (
        <Box className={classes.root}>
            <Header />
            <Introduction />
            <Form />
        </Box>
    );
};

export default QuestionnaireScreen;
