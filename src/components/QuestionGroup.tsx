import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RatingQuestion from './RatingQuestion';
import strings from '../strings';
import FormFieldQuestion from './FormFieldQuestion';
import { QuestionCategory, categories, AnswerGroup } from '../types';

type Props = {
    label: QuestionCategory;
    onAnswerChange: (answer: AnswerGroup) => void;
};

const QuestionGroup: React.FC<Props> = (props) => {
    const { label, onAnswerChange } = props;

    const [rating, setRating] = useState<number | undefined>(undefined);
    const [goingWell, setGoingWell] = useState<string | undefined>(undefined);
    const [improve, setImprove] = useState<string | undefined>(undefined);
    const [level10, setLevel10] = useState<string | undefined>(undefined);

    const answerChange = (answer?: Partial<AnswerGroup>) => {
        onAnswerChange({
            label,
            rating,
            goingWell,
            improve,
            level10,
            ...answer,
        });
    };

    return (
        <>
            <RatingQuestion
                label={label}
                title={`${strings[label]['emoji']} ${strings[label]['title']}`}
                onRatingChange={(r) => {
                    setRating(r);
                    answerChange({ rating: r });
                }}
            />
            <FormFieldQuestion
                title={`${strings[label]['title']}: ${strings.goingWell}`}
                onValueChange={(value) => {
                    setGoingWell(value);
                    answerChange({ goingWell: value });
                }}
            />
            <FormFieldQuestion
                title={`${strings[label]['title']}: ${strings.improve}`}
                onValueChange={(value) => {
                    setImprove(value);
                    answerChange({ improve: value });
                }}
            />
            <FormFieldQuestion
                title={`${strings[label]['title']}: ${strings.level10}`}
                onValueChange={(value) => {
                    setLevel10(value);
                    answerChange({ level10: value });
                }}
            />
        </>
    );
};

export default QuestionGroup;

QuestionGroup.propTypes = {
    label: PropTypes.oneOf(categories).isRequired,
    onAnswerChange: PropTypes.func.isRequired,
};
