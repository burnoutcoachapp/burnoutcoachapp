import React, { useState } from 'react'
import { Card, FormControl, FormLabel, makeStyles, TextField } from '@material-ui/core';
import strings from '../strings';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    card: {
        padding: 40,
        marginBottom: 20,
        width: '70vw',
    },
});

type Props = {
    title: string;
    fieldPlaceholder?: string;
    onValueChange?: (value: string) => void;
    required?: boolean;
}

const FormFieldQuestion: React.FC<Props> = (props) => {
    const { title, fieldPlaceholder, required, onValueChange } = props;

    const classes = useStyles();

    const [value, setValue] = useState<string>('');
    const [valueError, setValueError] = useState<boolean | undefined>(undefined);
    const onChangeValueText = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const newValue = e.target.value;

        setValue(newValue);
        if (onValueChange) onValueChange(newValue);

        if (newValue === '') {
            setValueError(true)
        } else {
            setValueError(false)
        }
    };

    return (
        <Card className={classes.card}>
            <FormControl required={required} component="fieldset">
                <FormLabel style={{ paddingBottom: 20 }} component="label">
                    {title}
                </FormLabel>
                <TextField
                    error={valueError ?? false}
                    placeholder={fieldPlaceholder}
                    value={value}
                    onChange={onChangeValueText}
                />
            </FormControl>
        </Card>
    )
}

export default FormFieldQuestion;

FormFieldQuestion.propTypes = {
    title: PropTypes.string.isRequired,
    fieldPlaceholder: PropTypes.string,
    onValueChange: PropTypes.func,
    required: PropTypes.bool,
}
