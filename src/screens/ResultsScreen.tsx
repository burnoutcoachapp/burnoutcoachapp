import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography, } from '@material-ui/core';
import { Header } from '../components';
import { Answers } from '../types';
import strings from '../strings';
import { PolarArea } from 'react-chartjs-2';
import { useLocation } from 'react-router-dom';

type Props = {
    data?: unknown;
};

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
});

type AnswersState = {
    answers: Answers;
};

const ResultsScreen: React.FC<Props> = () => {
    const classes = useStyles();
    const { state } = useLocation<AnswersState>();
    console.log(JSON.stringify(state, null, 4));

    const renderChart = useCallback((answers: Answers): JSX.Element => {
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
            <Box style={{ width: '50vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
    }, []);

    return (
        <Box className={classes.container}>
            <Header />
            <Box
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                }}
            >
                {state && state.answers && renderChart(state.answers)}
            </Box>
            <Typography style={{ paddingBottom: 20, }} align="center" variant="h5">
                {strings.pietext}
            </Typography>
            {/* Should probably show some missing info section here and link to the main quiz */}
        </Box>
    );
};

export default ResultsScreen;

ResultsScreen.propTypes = {
    data: PropTypes.any,
};
