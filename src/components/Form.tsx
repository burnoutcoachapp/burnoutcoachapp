import React, { useState } from 'react';
import { Container, Typography, makeStyles, Button, Box } from '@material-ui/core';
import strings from '../strings';
import EmailField from './EmailField';
import NameField from './NameField';
import QuestionGroup from './QuestionGroup';
import { AnswerGroup, categories, QuestionCategory } from '../types';

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

    return (
        <Container className={classes.container}>
            <Typography align="center" variant="h6">
                {strings.formTitle}
            </Typography>

            {renderDebugText('Debug Stuff')}
            {renderDebugText('Email', email || 'undefined')}
            {renderDebugText('Name', name || 'undefined'.toString())}
            {renderDebugText('Answers', JSON.stringify(answers ?? 'undefined', null, 4))}
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
