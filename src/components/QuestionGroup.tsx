import React, { useState } from 'react';
import PropTypes from 'prop-types'
import RatingQuestion from './RatingQuestion';
import strings from '../strings';
import FormFieldQuestion from './FormFieldQuestion';
import { QuestionCategory, categories } from '../types';

type Props = {
    label: QuestionCategory;
}

const QuestionGroup: React.FC<Props> = (props) => {
    const { label } = props;

    const [rating, setRating] = useState<number | undefined>(undefined);
    const [goingWell, setGoingWell] = useState<string | undefined>(undefined);
    const [improve, setImprove] = useState<string | undefined>(undefined);
    const [level10, setLevel10] = useState<string | undefined>(undefined);

    return (
        <>
            <RatingQuestion
                label={label}
                title={`${strings[label]['emoji']} ${strings[label]['title']}`}
                onRatingChange={(rating) => {
                    setRating(rating)
                }}
            />
            <FormFieldQuestion
                title={`${strings[label]['title']}: ${strings.goingWell}`}
                onValueChange={(value) => {
                    setGoingWell(value);
                }}
            />
            <FormFieldQuestion
                title={`${strings[label]['title']}: ${strings.improve}`}
                onValueChange={(value) => {
                    setImprove(value);
                }}
            />
            <FormFieldQuestion
                title={`${strings[label]['title']}: ${strings.level10}`}
                onValueChange={(value) => {
                    setLevel10(value);
                }}
            />
        </>
    )
}

export default QuestionGroup;

QuestionGroup.propTypes = {
    label: PropTypes.oneOf(categories).isRequired,
}