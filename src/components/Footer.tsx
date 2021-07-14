import React from 'react';
import { Button, Container, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import emilyFooter from '../images/emily-footer.png';
import strings from '../strings';

const useStyles = makeStyles({
    footer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        flexDirection: 'column',
    },
    image: {
        display: 'block',
        width: '100vw',
        height: 'auto',
        maxHeight: '100%',
        maxWidth: 'auto',
        zIndex: 0,
    },
    smButtonContainer: {
        position: 'absolute',
        bottom: 5,
        width: '100%',
        zIndex: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bigButtonContainer: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        zIndex: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bigButton: {
        backgroundColor: '#f78f28',
        whiteSpace: 'nowrap',
        color: '#303030',
        fontSize: 14,
    },
    smButton: {
        backgroundColor: '#f78f28',
        whiteSpace: 'nowrap',
        color: '#303030',
        fontSize: 8,
    },
});

const Footer: React.FC = () => {
    const classes = useStyles();
    const theme = useTheme();
    const bigScreen = useMediaQuery(theme.breakpoints.up('sm'));

    const onBookSessionPressed = () => {
        window.location.href = 'https://emilyclairecoaching.activehosted.com/f/1';
    };

    return (
        <Container className={classes.footer}>
            {`Small Screen: ${bigScreen}`}
            <img src={emilyFooter} className={classes.image} />
            <Container className={bigScreen ? classes.bigButtonContainer : classes.smButtonContainer}>
                <Button
                    className={bigScreen ? classes.bigButton : classes.smButton}
                    onClick={onBookSessionPressed}
                    variant="contained"
                >
                    {strings.bookSession}
                </Button>
            </Container>
        </Container>
    );
};

export default Footer;
