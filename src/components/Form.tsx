import React, { useCallback, useState } from 'react';
import { Container, Typography, makeStyles, Button, Box } from '@material-ui/core';
import strings from '../strings';
import EmailField from './EmailField';
import NameField from './NameField';
import QuestionGroup from './QuestionGroup';
import { AnswerGroup, categories, QuestionCategory } from '../types';
import { PolarArea } from 'react-chartjs-2';
import Popup from './Popup';
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

type Answers = Record<QuestionCategory, AnswerGroup>;

const Form = (): JSX.Element => {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [answers, setAnswers] = useState<Partial<Answers>>();
    const [showPopup, setShowPopup] = useState(false);
    const [emailError, setEmailError] = useState(false);

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

    const renderChart = useCallback((): JSX.Element => {
        console.log('are all answers answered: ' + areRequiredAnswersAnswered());
        if (!areRequiredAnswersAnswered()) return <></>;
        const answerValues = Object.values(answers ?? {});

        const labels = answerValues.map((x) => {
            return strings[x.label].title;
        });

        const data = {
            labels,
            datasets: [
                {
                    label: 'Rating',
                    data: answerValues.map((x) => x.rating ?? 0),
                    backgroundColor: [
                        'rgba(255, 99, 164, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)',
                        'rgba(190, 99, 255, 0.5)',
                        'rgba(99, 255, 146, 0.5)',
                        'rgba(99, 216, 255, 0.5)',
                        'rgba(255, 99, 99, 0.5)',
                    ],
                    borderWidth: 1,
                },
            ],
        };

        return (
            <Box style={{ width: '50vw' }}>
                <PolarArea
                    type="polarArea"
                    data={data}
                    options={{
                        scale: {
                            min: 0,
                            max: 10,
                        },
                    }}
                />
            </Box>
        );
    }, [areRequiredAnswersAnswered]);

    const onSubmitPressed = useCallback(() => {
        if (areRequiredAnswersAnswered()) {
            // submit
            console.log('All good');
        } else {
            // show error
            console.log('Not all good');
            setShowPopup(true);
        }
    }, [areRequiredAnswersAnswered]);

    return (
        <Container className={classes.container}>
            <Typography style={{ paddingBottom: 20 }} align="center" variant="h6">
                {strings.formTitle}
            </Typography>
            {renderChart()}
            <EmailField
                setIsError={(err) => {
                    setEmailError(err);
                }}
                onEmailChange={(email) => {
                    setEmail(email);
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
