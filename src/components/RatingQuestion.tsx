import { Card, FormControl, FormControlLabel, FormLabel, makeStyles, Radio, RadioGroup } from '@material-ui/core';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    card: {
        padding: 40,
        marginBottom: 20,
        width: '70vw',
    },
});

const defaultRatingValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

type Props = {
    // Title displayed on the form label
    title: string;
    // Label describing the value of this 
    // Not shown in the UI
    label: string;
    onRatingChange?: (rating: number) => void;
}

const RatingQuestion: React.FC<Props> = (props) => {
    const classes = useStyles();
    const { title, label, onRatingChange } = props;

    const [rating, setRating] = useState<number | undefined>(undefined);


    const onChangeLoveRating = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setRating(parseInt(value));
        if (onRatingChange) onRatingChange(parseInt(value))
    }

    return (
        <Card className={classes.card}>
            <FormControl required component="fieldset">
                <FormLabel style={{ paddingBottom: 20 }} component="label">
                    {title}
                </FormLabel>
                <RadioGroup
                    row
                    aria-label={`${label}Rating`}
                    name={`${label}Rating`}
                    value={rating ?? 0}
                    onChange={onChangeLoveRating}
                >
                    {defaultRatingValues.map((value) => {
                        return (
                            <FormControlLabel
                                key={`${label}RatingRadio-${value}`}
                                control={<Radio />}
                                value={value}
                                label={value}
                                labelPlacement="top"
                            />
                        );
                    })}
                </RadioGroup>
            </FormControl>
        </Card>
    )
}

export default RatingQuestion;

RatingQuestion.propTypes = {
    title: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onRatingChange: PropTypes.func
}
