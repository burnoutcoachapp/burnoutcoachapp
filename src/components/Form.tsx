import React, { useCallback, useState } from 'react';
import { Container, Typography, makeStyles, Button, Box } from '@material-ui/core';
import strings from '../strings';
import EmailField from './EmailField';
import NameField from './NameField';
import QuestionGroup from './QuestionGroup';
import { AnswerGroup, Answers, categories } from '../types';
import Popup from './Popup';
import { useHistory } from 'react-router-dom';
import { isValidEmail } from '../utils';
const useStyles = makeStyles({
    container: {
        display: 'flex',
        paddingTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    submitButton: {
        alignSelf: 'flex-start',
        marginTop: 20,
        marginBottom: 50,
    },
});

const Form = (): JSX.Element => {
    const classes = useStyles();
    const history = useHistory();
    const [name, setName] = useState('');
    const [answers, setAnswers] = useState<Partial<Answers>>();
    const [showPopup, setShowPopup] = useState(false);

    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<boolean | undefined>(undefined);

    const onAnswerChange = (answer: AnswerGroup) => {
        setAnswers({
            ...answers,
            [answer.label]: answer,
        });
        console.log(JSON.stringify(answers));
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.log('submit');
        event.preventDefault();
    };

    // This is not a good way to check if the answers are required
    const areRequiredAnswersAnswered = useCallback((): boolean => {
        if (answers === undefined) return false;
        // Check length of array with answers that have ratings
        if (email === '' || name === '' || emailError === true) return false;

        const answerValues = Object.values(answers);
        const answersWithRatings = answerValues.filter((x) => x.rating !== undefined);
        return answersWithRatings.length === categories.length;
    }, [answers, email, name]);

    const onSubmitPressed = useCallback(() => {
        if (areRequiredAnswersAnswered()) {
            // Submit
            history.push('/results', { answers });
        } else {
            setShowPopup(true);
        }
    }, [areRequiredAnswersAnswered]);

    const validateEmail = (): void => {
        setEmailError(!isValidEmail(email));
    };

    return (
        <Container className={classes.container}>
            <Typography style={{ paddingBottom: 20 }} align="center" variant="h6">
                {strings.formTitle}
            </Typography>
            <EmailField
                email={email}
                setEmail={(e) => {
                    setEmail(e);
                }}
                emailError={emailError}
                onBlur={() => {
                    validateEmail();
                }}
            />
            <NameField
                onNameChange={(name) => {
                    setName(name);
                }}
            />
            <form onSubmit={onSubmit}>
                {categories.map((label) => {
                    return <QuestionGroup onAnswerChange={onAnswerChange} key={label} label={label} />;
                })}
            </form>
            <Box>
                <Button onClick={onSubmitPressed} className={classes.submitButton} variant="contained" color="primary">
                    {strings.submit}
                </Button>
            </Box>
            {showPopup && (
                <Popup
                    onButtonPressed={() => {
                        setShowPopup(false);
                    }}
                    text={strings.ratingRequired}
                    buttonText={strings.confirm}
                />
            )}
        </Container>
    );
};

export default Form;
