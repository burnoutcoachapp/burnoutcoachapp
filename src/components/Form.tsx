import React, { useState } from 'react';
import {
  Container,
  Typography,
  makeStyles,
} from '@material-ui/core';
import strings from '../strings';
import EmailField from './EmailField';
import NameField from './NameField';
import QuestionGroup from './QuestionGroup';
import { categories } from '../types';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});


const Form = (): JSX.Element => {
  const classes = useStyles();

  const [loveRating, setLoveRating] = useState<number | undefined>(undefined);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const renderDebugText = (label: string, text?: string): JSX.Element => {
    return (
      <Typography style={{ color: 'red' }} align="center" variant="h6">
        {`${label}${text === undefined ? '' : `: ${text}`}`}
      </Typography>
    );
  };

  return (
    <Container className={classes.container}>
      <Typography align="center" variant="h6">
        {strings.formTitle}
      </Typography>
      {renderDebugText('Debug Stuff')}
      {renderDebugText('Email', email || 'undefined')}
      {renderDebugText('Name', name || 'undefined'.toString())}
      {renderDebugText('Love Rating', (loveRating ?? 'undefined').toString())}
      <EmailField onEmailChange={(email) => {
        setEmail(email);
      }} />
      <NameField onNameChange={(name) => {
        setName(name);
      }} />
      {categories.map((label) => {
        return <QuestionGroup key={label} label={label} />
      })}
      {/* <QuestionGroup label="love" />
      <QuestionGroup label="home" /> */}
    </Container>
  );
};

export default Form;
