import React from 'react';
import ReactDOM from 'react-dom';
import { ReplicantProvider } from '../../ReplicantProvider';
import { TeamsProvider } from '../../TeamsProvider';
import { TimekeeperSheet } from '../components/TimekeeperSheet';
import { DashboardThemeProvider } from '../DashboardThemeProvider';

const App = () => {
  return (
    <DashboardThemeProvider>
      <ReplicantProvider>
        <TeamsProvider>
          <TimekeeperSheet editable />
        </TeamsProvider>
      </ReplicantProvider>
    </DashboardThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));