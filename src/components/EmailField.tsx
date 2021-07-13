import React from 'react';
import { Card, FormControl, FormLabel, makeStyles, TextField, Typography } from '@material-ui/core';
import strings from '../strings';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    card: {
        padding: 40,
        marginBottom: 20,
        width: '70vw',
    },
    emailSubLabel: {
        paddingBottom: 20,
    },
});

type Props = {
    email: string;
    setEmail: (email: string) => void;
    emailError?: boolean;
    onBlur?: () => void;
};

const EmailField: React.FC<Props> = (props) => {
    const { email, setEmail, emailError, onBlur } = props;

    const classes = useStyles();

    const onChangeEmailText = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    return (
        <Card className={classes.card}>
            <FormControl required component="fieldset">
                <FormLabel style={{ paddingBottom: 20 }} component="label">
                    {strings.email}
                </FormLabel>
                <Typography variant="body2" className={classes.emailSubLabel}>
                    {strings.emailReason}
                </Typography>
                <TextField
                    error={emailError ?? false}
                    placeholder={strings.emailPlaceholder}
                    value={email}
                    onChange={onChangeEmailText}
                    onBlur={onBlur}
                />
            </FormControl>
        </Card>
    );
};

export default EmailField;

EmailField.propTypes = {
    email: PropTypes.string.isRequired,
    setEmail: PropTypes.func.isRequired,
    emailError: PropTypes.bool,
    onBlur: PropTypes.func,
};
