import React, { useState } from 'react';
import {
  Container,
  Typography,
  makeStyles,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  TextField,
} from '@material-ui/core';
import strings from '../strings';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  card: {
    padding: 40,
    marginBottom: 20,
    width: '70vw',
  },
});

const loveRatingValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Form = (): JSX.Element => {
  const classes = useStyles();

  const [loveRating, setLoveRating] = useState<number | undefined>(undefined);
  const [email, setEmail] = useState<string>('');

  const onChangeEmailText = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setEmail(e.target.value);
  };

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
      {renderDebugText('Love Rating', (loveRating ?? 'undefined').toString())}
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
            onChange={(e) => {
              const value = e.target.value;
              setLoveRating(parseInt(value));
            }}
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
      <Card className={classes.card}>
        <FormControl required component="fieldset">
          <FormLabel style={{ paddingBottom: 20 }} component="label">
            {strings.email}
          </FormLabel>
          <TextField
            placeholder={strings.emailPlaceholder}
            value={email}
            onChange={onChangeEmailText}
          ></TextField>
        </FormControl>
      </Card>
    </Container>
  );
};

export default Form;
