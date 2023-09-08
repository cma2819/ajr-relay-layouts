import { Grid, Paper, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { ReplicantProvider } from '../../ReplicantProvider';
import { TeamsProvider } from '../../TeamsProvider';
import { AudioControl } from '../components/AudioControl';
import { LatestResults } from '../components/LatestResults';
import { ProgressChart } from '../components/ProgressChart';
import { SwitchViewControl } from '../components/SwitchViewControl';
import { TimerControl } from '../components/TimerControl';
import { DashboardThemeProvider } from '../DashboardThemeProvider';

const ProgressContainer = styled.div`
  width: 640px;
  height: 480px;
`

const App = () => {
  return (
    <DashboardThemeProvider>
      <ReplicantProvider>
        <TeamsProvider>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Stack spacing={2}>
                <Paper sx={{ padding: '8px 16px' }}>
                  <Typography variant='h6'>情報一覧</Typography>
                </Paper>
                <LatestResults />
                <ProgressContainer>
                  <ProgressChart />
                </ProgressContainer>
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack spacing={2}>
                <Paper sx={{ padding: '8px 16px' }}>
                  <Typography variant='h6'>レイアウト操作</Typography>
                </Paper>
                <AudioControl />
                <SwitchViewControl />
                <TimerControl />
              </Stack>
            </Grid>
          </Grid>
        </TeamsProvider>
      </ReplicantProvider>
    </DashboardThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));