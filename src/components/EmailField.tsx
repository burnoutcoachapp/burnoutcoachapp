import React, { useState } from 'react';
import { Card, FormControl, FormLabel, makeStyles, TextField, Typography } from '@material-ui/core';
import strings from '../strings';
import { isValidEmail } from '../utils';
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
    onEmailChange?: (email: string) => void;
    setIsError?: (error: boolean) => void;
};

const EmailField: React.FC<Props> = (props) => {
    const { onEmailChange, setIsError } = props;

    const classes = useStyles();

    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<boolean | undefined>(undefined);
    const onChangeEmailText = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setEmail(e.target.value);
        if (onEmailChange) onEmailChange(e.target.value);
        setEmailError(!isValidEmail(email));
        if (setIsError) setIsError(!isValidEmail(email));
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
                    onBlur={() => {
                        setEmailError(!isValidEmail(email));
                    }}
                />
            </FormControl>
        </Card>
    );
};

export default EmailField;

EmailField.propTypes = {
    onEmailChange: PropTypes.func,
    setIsError: PropTypes.func,
};
