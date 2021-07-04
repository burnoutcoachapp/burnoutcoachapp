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
    nameSubLabel: {
        paddingBottom: 20,
    },
});

type Props = {
    onNameChange?: (name: string) => void;
}

const NameField: React.FC<Props> = (props) => {
    const { onNameChange } = props;

    const classes = useStyles();

    const [name, setName] = useState<string>('');
    const [nameError, setNameError] = useState<boolean | undefined>(undefined);
    const onChangeNameText = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const newName = e.target.value;

        setName(newName);
        if (onNameChange) onNameChange(newName);

        if (newName === '') {
            setNameError(true)
        } else {
            setNameError(false)
        }
    };

    return (
        <Card className={classes.card}>
            <FormControl required component="fieldset">
                <FormLabel style={{ paddingBottom: 20 }} component="label">
                    {strings.name}
                </FormLabel>
                <TextField
                    error={nameError ?? false}
                    placeholder={strings.namePlaceholder}
                    value={name}
                    onChange={onChangeNameText}
                />
            </FormControl>
        </Card>
    )
}

export default NameField;

NameField.propTypes = {
    onNameChange: PropTypes.func.isRequired
}
