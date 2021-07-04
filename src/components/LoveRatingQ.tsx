import { Card, FormControl, FormControlLabel, FormLabel, makeStyles, Radio, RadioGroup } from '@material-ui/core';
import React, { useState } from 'react';
import strings from '../strings';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    card: {
        padding: 40,
        marginBottom: 20,
        width: '70vw',
    },
});

const loveRatingValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

type Props = {
    onLoveRatingChange?: (rating: number) => void;
}

const LoveRatingQ: React.FC<Props> = (props) => {
    const classes = useStyles();
    const { onLoveRatingChange } = props;

    const [loveRating, setLoveRating] = useState<number | undefined>(undefined);


    const onChangeLoveRating = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLoveRating(parseInt(value));
        if (onLoveRatingChange) onLoveRatingChange(parseInt(value))
    }

    return (
        <Card className={classes.card}>
            <FormControl required component="fieldset">
                <FormLabel style={{ paddingBottom: 20 }} component="label">
                    {strings.loveRomanceTitle}
                </FormLabel>
                <RadioGroup
                    row
                    aria-label="loveRating"
                    name="loveRating"
                    value={loveRating ?? 0}
                    onChange={onChangeLoveRating}
                >
                    {loveRatingValues.map((value) => {
                        return (
                            <FormControlLabel
                                key={`loveRatingRadio-${value}`}
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

export default LoveRatingQ;

LoveRatingQ.propTypes = {
    onLoveRatingChange: PropTypes.func
}
