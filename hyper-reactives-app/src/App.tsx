import React from 'react';
import { Grommet } from 'grommet';
import UserRegistration from './containers/UserRegistration/UserRegistration';
import UserLogin from './containers/UserLogin/UserLogin';
import TutorialDataGrid from './components/AdminLandingPage/AdminLandingPage';


const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
    formField:
      { requiredIndicator: true }
  },
};
function App() {
  return (
    <Grommet theme={theme} full>
      <TutorialDataGrid />
    </Grommet>
  );
}

export default App;
