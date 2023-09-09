import React from 'react';
import ReactDOM from 'react-dom';
import { RankProgress } from '../../common/RankProgress';
import { ReplicantProvider } from '../../ReplicantProvider';
import { TeamsProvider } from '../../TeamsProvider';

const App = () => {
  return (
    <ReplicantProvider>
      <TeamsProvider>
        <RankProgress all />
      </TeamsProvider>
    </ReplicantProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));