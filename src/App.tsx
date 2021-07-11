import React from 'react';
import { initialiseEmail } from './api';
import QuestionnaireScreen from './screens/QuestionnaireScreen';

initialiseEmail();

const App: React.FC = () => {
    return <QuestionnaireScreen />;
};

export default App;
