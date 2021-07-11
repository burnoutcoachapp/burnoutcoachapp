import React from 'react';
import { QuestionnaireScreen, ResultsScreen } from './screens';
import { Switch, Route } from 'react-router-dom';

const App: React.FC = () => {
    return (
        <div>
            <Switch>
                <Route path="/results">
                    <ResultsScreen />
                </Route>
                <Route path="/">
                    <QuestionnaireScreen />
                </Route>
            </Switch>
        </div>
    );
};

export default App;
