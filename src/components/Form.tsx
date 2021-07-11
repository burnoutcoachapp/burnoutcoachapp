import React, { useCallback, useState } from 'react';
import { Container, Typography, makeStyles, Button, Box } from '@material-ui/core';
import strings from '../strings';
import EmailField from './EmailField';
import NameField from './NameField';
import QuestionGroup from './QuestionGroup';
import { AnswerGroup, categories, QuestionCategory } from '../types';
import { PolarArea, Chart } from 'react-chartjs-2';
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
    submitSection: {
        width: '70vw',
    },
});

type Answers = Record<QuestionCategory, AnswerGroup>;

const Form = (): JSX.Element => {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [answers, setAnswers] = useState<Partial<Answers>>();
    const [debugText, setDebugText] = useState<string>('');
    const renderDebugText = (label: string, text?: string): JSX.Element => {
        return (
            <Typography style={{ color: 'red' }} align="center" variant="h6">
                {`${label}${text === undefined ? '' : `: ${text}`}`}
            </Typography>
        );
    };

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

    const areAllAnswersAnswered = useCallback((): boolean => {
        if (answers === undefined) return false;
        // Check length of array with answers that have ratings
        const answerValues = Object.values(answers);
        const answersWithRatings = answerValues.filter((x) => x.rating !== undefined);
        console.log('answersWithRatings length ' + answersWithRatings.length);
        console.log('categories length ' + categories.length);

        return answersWithRatings.length === categories.length;
    }, [answers]);

    const renderChart = useCallback((): JSX.Element => {
        console.log('are all answers answered: ' + areAllAnswersAnswered());
        if (!areAllAnswersAnswered()) return <></>;
        const answerValues = Object.values(answers ?? {});

        const labels = answerValues.map((x) => {
            return strings[x.label].title;
        });

        console.log(labels);
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

        // let data;
        // const datasets = Object.values(answers).map({});
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
    }, [areAllAnswersAnswered]);

    return (
        <Container className={classes.container}>
            <Typography align="center" variant="h6">
                {strings.formTitle}
            </Typography>
            {renderChart()}
            {renderDebugText('Debug Stuff')}
            {renderDebugText('Email', email || 'undefined')}
            {renderDebugText('Name', name || 'undefined'.toString())}
            {renderDebugText('Answers', JSON.stringify(answers ?? 'undefined', null, 4))}
            {renderDebugText('Debug', debugText)}
            <EmailField
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
            <Box className={classes.submitSection}>
                <Button className={classes.submitButton} variant="contained" color="primary">
                    {strings.submit}
                </Button>
            </Box>
        </Container>
    );
};

export default Form;
