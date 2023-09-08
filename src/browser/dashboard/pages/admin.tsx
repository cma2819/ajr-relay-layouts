import React from 'react';
import ReactDOM from 'react-dom';
import { ReplicantProvider } from '../../ReplicantProvider';
import { AdminControl } from '../components/AdminControl';
import { DashboardThemeProvider } from '../DashboardThemeProvider';

const App = () => {
  return (
    <DashboardThemeProvider>
      <ReplicantProvider>
        <AdminControl />
      </ReplicantProvider>
    </DashboardThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));