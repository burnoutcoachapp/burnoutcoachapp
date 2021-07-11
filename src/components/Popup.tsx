import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

type Props = {
    onButtonPressed: () => void;
    text: string;
    buttonText: string;
};

const useStyles = makeStyles({
    popupContainer: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    popupContent: {
        position: 'absolute',
        padding: 25,
        margin: 'auto',
        background: 'white',
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginTop: 30,
    },
});

const Popup: React.FC<Props> = (props): JSX.Element => {
    const { onButtonPressed, text, buttonText } = props;
    const classes = useStyles();

    return (
        <Box className={classes.popupContainer}>
            <Box className={classes.popupContent}>
                <Typography variant="h6">{text}</Typography>
                <Button onClick={onButtonPressed} className={classes.button} variant="contained" color="primary">
                    {buttonText}
                </Button>
            </Box>
        </Box>
    );
};

export default Popup;

Popup.propTypes = {
    onButtonPressed: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
};
